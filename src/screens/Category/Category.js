import React, {useState} from 'react';
import { FlatList, ScrollView, Text, Modal, View, Pressable, StyleSheet, Button } from 'react-native';
import CustomCard from '../../components/CustomCard'
import NewCategoryForm from './NewCategoryForm'
import Collapsible from 'react-native-collapsible';
import axios from 'axios'



export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sort_by, setSortBy] = useState("created_at");
  const [sort_desc, setSortDesc] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getCategories = function(){
    axios
      .get('/api/v1/categories',
      {
        params: {
          sort_by: sort_by,
          sort_desc: sort_desc,
          limit: limit,
          page: page
        }
    }).then((response) => {
      setCategories(response.data.data);
    });

  }

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <ScrollView style={{ flex: 1}}>
      <CustomCard 
        title="Add a category"
        description="Create a category for your transactions"
        onPress={() => setModalVisible(!modalVisible)}
      />
    <Collapsible collapsed={!modalVisible}>
      <NewCategoryForm/>
    </Collapsible>
      <FlatList
      data={categories}
      renderItem={({ item: transaction }) => <CustomCard
          title={transaction.attributes.name}
          description={transaction.attributes.description}
          arrow
        /> }
      keyExtractor={(item) => item.attributes.id}
      />
    </ScrollView>
  );
}

