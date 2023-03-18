import React, { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import CustomCard from '@/CustomCard';
import NewCategoryForm from './NewCategoryForm';
import Collapsible from 'react-native-collapsible';
import CustomButton from '@/CustomButton';
import CategoryItem from './CategoryItem';
import axios from 'axios';
import CustomIndicator from '@/CustomIndicator';
import { useQuery } from 'react-query';

export default function HomeScreen() {
  const sort_by = 'created_at';
  const sort_desc = true;
  const limit = 30;

  const getCategories = async function () {
    const response = await axios.get('/api/v1/categories', {
      params: {
        sort_by: sort_by,
        sort_desc: sort_desc,
        limit: limit,
        // page: 1
      },
    });
    return response.data;
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const { data: categories, status, refetch } = useQuery('categories', getCategories);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  return (
    <View>
      {status === 'success' ? (
        <FlatList
          data={categories.transaction_categories}
          ListHeaderComponent={<Header refetch={refetch} />}
          /* ListFooterComponent={<Footer onLoadMore={refetch} loading={loading} />} */
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

const Footer = function ({ onLoadMore, loading }) {
  return (
    <View>
      {!loading ? (
        <CustomButton text="Load More" onPress={onLoadMore} type="tertiary" />
      ) : (
        <CustomIndicator />
      )}
    </View>
  );
};
