import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Button, Image, ScrollView} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import CustomButton from "../../components/CustomButton"

const TransactionsLoop = function({transactions}) {
  return(
    <View>
      {transactions.map(item => (
        <Text key={item.id} style={styles.transactions}>{item.attributes.description}: {item.attributes.amount}</Text>
      ))}
    </View>
  )
}

export default function Transactions({ transactions }){
  return (
    <Card>
      <Card.Title>Transactions</Card.Title>
      <Card.Divider />
      { transactions !== null ? <TransactionsLoop transactions={transactions}/> : <ActivityIndicator/> }
    </Card>
  );
};


const styles = StyleSheet.create({
  transactions: {
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    padding: 15
  }
});

