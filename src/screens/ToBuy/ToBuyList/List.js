import React, { useEffect } from 'react';
import { View, StatusBar, FlatList, RefreshControl } from "react-native";
import styled from 'styled-components/native'
import { useMutation } from "react-query";
import axios from 'axios'

import Header from "./Header";
import AddInput from "./AddInput";
import TodoList from "./TodoList";
import CreateForm from "./CreateListForm";
import { showMessage } from "react-native-flash-message";


export default function List({ list, refetch }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async function() {
    setRefreshing(true);
    await refetch()
    setRefreshing(false)
  }
  const createItem = async function(item) {
    const { data: response } = await axios
      .post(`/api/v1/to_buy_lists/${list.id}/item`,
        {
          title: item.title,
          price_amount: item.price_amount
        })
    return response.data
  };
  const destroyItem = async function(item_id) {
    const { data: response } = await axios
      .delete(`/api/v1/to_buy_lists/${list.id}/item/${item_id}`)
    return response.data
  };
  const mutation = useMutation(createItem);
  const destroy_mutation = useMutation(destroyItem);

  const { isSuccess, isError } = mutation;
  const { isSuccess: isSuccessDestroy, isError: isErrorDestroy } = destroy_mutation;


  const submitHandler = (item) => {
    mutation.mutate(item)
  };
  const deleteItem = (key) => {
    destroy_mutation.mutate(key)
  };
  useEffect(() => {
    if (isSuccess) {
      refetch()
      showMessage({
        message: "Exito!",
        type: "success",
      });
      mutation.reset()
    }
    if (isError) {
      mutation.reset()
    }
    if (isSuccessDestroy) {
      refetch()
      showMessage({
        message: "Deleted!",
        type: "success",
      });
      destroy_mutation.reset()
    }
    if (isErrorDestroy) {
      destroy_mutation.reset()
    }
  });
  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content"
          backgroundColor="midnightblue" />
      </View>

      <View>
        {list ?
          <FlatList
            data={list.to_buy_items}
            ListHeaderComponent={() => <Header list={list} />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            ListFooterComponent={<AddInput submitHandler={submitHandler} />}
          />
          :
          <CreateForm refetch={refetch} />
        }

      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

