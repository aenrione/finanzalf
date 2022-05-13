import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, Modal, View, Pressable, StyleSheet, Button } from 'react-native';
import CustomCard from '../../components/CustomCard'
import NewCategoryForm from './NewCategoryForm'
import Collapsible from 'react-native-collapsible';
import CustomButton from "../../components/CustomButton"
import axios from 'axios'
import { useInfiniteQuery } from "react-query"


export default function HomeScreen() {
  const sort_by = "created_at"
  const sort_desc = true
  const limit = 5

  const getCategories = async function() {
    const response = await axios
      .get('/api/v1/categories',
        {
          params: {
            sort_by: sort_by,
            sort_desc: sort_desc,
            limit: limit,
            page: 1
          }
        })
    return response.data

  }

  const [refreshing, setRefreshing] = React.useState(false);

  const { data: categories, status, fetchNextPage, isFetchingNextPage: loading } = useInfiniteQuery("categories", getCategories, {
    getNextPageParam: (lastPage) => {
      const { current_page: page, total_pages: totalPages } = lastPage.meta;

      return (page < totalPages) ? page + 1 : page;
    },
  });
  const mapCategories = function() {
    let all = categories.pages.map(elem => (
      elem.data
    ))
    let arr = [].concat.apply([], all)
      .filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    return arr
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNextPage()
    setRefreshing(false)
  }, []);
  return (
    <View>
      {status === 'success' ?
        <FlatList
          data={mapCategories()}
          ListHeaderComponent={<Header refetch={fetchNextPage} />}
          ListFooterComponent={<Footer onLoadMore={fetchNextPage} loading={loading} />}
          renderItem={({ item: category }) =>
            <CustomCard
              title={category.attributes.name}
              description={category.attributes.description}
              lastIcon={false}
            />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={(item) => item.id}
        />
        : <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const Header = function({ refetch }) {
  const [modalVisible, setModalVisible] = useState(false);
  const onRefetch = function() {
    refetch()
    setModalVisible(!modalVisible)
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomCard
        title="Add a category"
        description="Create a category for your transactions"
        onPress={() => setModalVisible(!modalVisible)}
      />
      <Collapsible collapsed={!modalVisible}>
        <NewCategoryForm refetch={onRefetch} />
      </Collapsible>
    </View>
  );
}

const Footer = function({ onLoadMore, loading }) {
  return (
    <View>
      {!loading ?
        <CustomButton text="Load More" onPress={onLoadMore} type="tertiary" />
        : <ActivityIndicator size="large" color="#0000ff" />
      }
    </View>
  );
}
