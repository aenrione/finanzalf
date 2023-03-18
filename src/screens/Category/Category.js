import React, { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import CustomCard from '@/CustomCard';
import NewCategoryForm from './NewCategoryForm';
import Collapsible from 'react-native-collapsible';
import CategoryItem from './CategoryItem';
import axios from 'axios';
import CustomIndicator from '@/CustomIndicator';
import { useInfiniteQuery } from 'react-query';
import store from 'src/store';

export default function HomeScreen() {
  const sort_by = 'created_at';
  const sort_desc = true;
  const limit = 10;
  const queryClient = store.getState().object_reducer.queryClient;

  const getCategories = async function ({ pageParam = 1 }) {
    const response = await axios.get('/api/v1/categories', {
      params: {
        sort_by: sort_by,
        sort_desc: sort_desc,
        limit: limit,
        page: pageParam,
      },
    });
    return response.data;
  };

  const mapCategoryPages = function () {
    let all = categories.pages.map((elem) => elem.transaction_categories);
    let arr = [].concat
      .apply([], all)
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
    return arr;
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data: categories,
    status,
    fetchNextPage,
    isFetchingNextPage: loading,
    hasNextPage,
  } = useInfiniteQuery('categories', getCategories, {
    getNextPageParam: (lastPage) => {
      const { current_page: page, total_pages: totalPages } = lastPage.meta;

      return page < totalPages ? page + 1 : false;
    },
  });

  const onRefresh = async function () {
    setRefreshing(true);
    await queryClient.resetQueries({ queryKey: ['categories'], exact: true });
    setRefreshing(false);
  };
  return (
    <View>
      {status === 'success' ? (
        <FlatList
          data={mapCategoryPages()}
          onEndReached={fetchNextPage}
          ListHeaderComponent={<Header refetch={fetchNextPage} />}
          ListFooterComponent={hasNextPage && <Footer loading={loading} />}
          renderItem={({ item: category }) => (
            <CategoryItem category={category} refetch={onRefresh} />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <CustomIndicator size={150} />
      )}
    </View>
  );
}

const Header = function ({ refetch }) {
  const [modalVisible, setModalVisible] = useState(false);
  const onRefetch = function () {
    refetch();
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <CustomCard
        title="Add a category"
        description="Create a category for your transactions"
        pressed={modalVisible}
        onPress={() => setModalVisible(!modalVisible)}
      />
      <Collapsible collapsed={!modalVisible}>
        <NewCategoryForm refetch={onRefetch} />
      </Collapsible>
    </View>
  );
};

const Footer = function ({ loading }) {
  return <View>{loading && <CustomIndicator size={20} marginTop={5} />}</View>;
};
