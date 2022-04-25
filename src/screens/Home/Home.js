import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import CustomButton from "../../components/CustomButton"
import Summary from "./Summary"
import Transactions from "./Transactions"
import { useQuery } from "react-query";
import store from '../../store'
import axios from 'axios'


export default function HomeScreen() {
  const state = store.getState()
  const capabilities = state.userCapabilities
  const email = state.user.email
  const user = state.user


  const getInfo = async function() {
    const { data: response } = await axios
      .get('/api/v1/user',
        {
          params: {
            email: email
          }
        })
    return response.data.attributes

  }
  const { data: userInfo, status, refetch } = useQuery("user-data", getInfo);

  return (
    <ScrollView style={{ flex: 1 }}>
      <CustomButton text="Update" onPress={refetch} />
      {status === 'loading' && <ActivityIndicator />}
      {status === 'success' &&
        <Summary user={user} attributes={userInfo} />
      }
      {capabilities.hasFintocAccount && <Transactions />}
    </ScrollView>
  );
}
