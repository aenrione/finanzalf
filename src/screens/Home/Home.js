import React from 'react';
import { View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Summary from "./Summary"
import Transactions from "./Transactions"
import { useQuery } from "react-query";
import store from '../../store'
import axios from 'axios'


export default function HomeScreen() {
  const state = store.getState().auth_reducer
  const email = state.user.email


  const getInfo = async function() {
    const { data: response } = await axios
      .get('/api/v1/user',
        {
          params: {
            email: email
          }
        })
    return response.user

  }
  const { data: userInfo, status, refetch } = useQuery("user-data", getInfo);

  return (
    <View style={{ flex: 1 }}>
      {status === 'loading' && <ActivityIndicator />}
      {status === 'success' &&
        <Transactions refetch={refetch} header={<Summary user={userInfo} refetch={refetch} />} />
      }
    </View>
  );
}
