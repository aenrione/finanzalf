import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import CustomButton from "../../components/CustomButton"
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
  const getInfo = function(){
    axios
      .get('http://localhost:3000/api/v1/user',
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

  }

  React.useEffect(() => {
    getInfo()
  }, []);
  if (!info) return null;
  return (
    <View style={{ flex: 1}}>
        <Text style={styles.title}>{info.attributes.name}</Text>
        <Text style={{textAlign: 'center'}}>{info.attributes.email}</Text>
        <CustomButton text="Update" onPress={getInfo} />
      <Card>
        <Card.Title>Summary</Card.Title>
        <Card.Divider />
          <Text>Balance   {info.attributes.balances.total}</Text>
          <Text>Fintoc   {info.attributes.balances.fintoc}</Text>
          <Text>Buda   {info.attributes.balances.buda}</Text>
          <Text>Fintual   {info.attributes.balances.fintual}</Text>
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
