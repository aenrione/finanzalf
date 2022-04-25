import React, { useState } from 'react';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View, ActivityIndicator, Button, Image } from 'react-native';
import store from '../../store'
import axios from 'axios'
import { useQuery } from "react-query";


export default function DetailsScreen() {
  const email = store.getState().user.email
  const getBalances = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/balance_to_chart',
        {
          params: {
            email: email,
          }
        })
    return response

  }
  const { data: balance, status } = useQuery("balances", getBalances);

  return (
    <View>
      <Text>Balances</Text>
      <Text>To be done</Text>
      <ActivityIndicator />
    </View>
  );
}
