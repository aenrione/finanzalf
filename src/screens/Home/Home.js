import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { getInfo } from '../../api/GetUserInfoAction';
import store from '../../store'
import axios from 'axios'


export default function HomeScreen() {
  const [info, setInfo] = React.useState(null);

  const state = store.getState()
  const email = state.user.email
  const uid = state.uid
  const client = state.client
  const accessToken = state["access-token"]

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/user',
      {
        params: {
          email: email
        },
        headers: {
        'access-token': accessToken,
        'client': client,
        'uid': uid
      }
    }).then((response) => {
      setInfo(response.data.data);
    });
  }, []);
  if (!info) return null;
  return (
    <View style={{ flex: 1}}>
        <Text style={styles.title}>{info.attributes.name}</Text>
        <Text style={{textAlign: 'center'}}>{info.attributes.email}</Text>
      <Card>
        <Card.Title>Summary</Card.Title>
        <Card.Divider />
          <Text>Balance {info.attributes.amount}</Text>
          <Text>Income</Text>
          <Text>Expense</Text>
      </Card>
      <ScrollView style={{ flex: 1}}>
        <Card>
          <Card.Title>Transactions</Card.Title>
          <Card.Divider />
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  }
});