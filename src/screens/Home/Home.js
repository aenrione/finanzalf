import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import CustomButton from "../../components/CustomButton"
import Summary from "./Summary"
import Transactions from "./Transactions"
import store from '../../store'
import axios from 'axios'


export default function HomeScreen() {
  const [info, setInfo] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const state = store.getState()
  const email = state.user.email
  const user = state.user
  const getInfo = function(){
    axios
      .get('/api/v1/user',
      {
        params: {
          email: email
        }
    }).then((response) => {
      setInfo(response.data.data.attributes);
    });
    axios
      .get('/api/v1/transactions',
      {
        params: {
          email: email
        }
    }).then((response) => {
      setTransactions(response.data.data);
    });

  }

  React.useEffect(() => {
    getInfo()
  }, []);
  return (
    <ScrollView style={{ flex: 1}}>
      <CustomButton text="Update" onPress={getInfo} />
      <Summary user={user} attributes={info}/>
      <Transactions transactions={transactions}/>
    </ScrollView>
  );
}
