import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Button, Image, ScrollView} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import CustomButton from "../../components/CustomButton"

const SummaryCard = function({attributes}){
  return (
    <Card>
      <Card.Title>Summary</Card.Title>
      <Card.Divider />
        <Text>Balance   {attributes.balances.total}</Text>
        <Text>Fintoc   {attributes.balances.fintoc}</Text>
        <Text>Buda   {attributes.balances.buda}</Text>
        <Text>Fintual   {attributes.balances.fintual}</Text>
        <Text>Income  {attributes.income}</Text>
        <Text>Expense  {attributes.expense}</Text>
        <Text>Investments  {attributes.investments_return}</Text>
    </Card>
  );  
}

export default function Summary({user, attributes}){
  return (
    <View>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={{textAlign: 'center'}}>{user.email}</Text>
      { attributes !== null ? <SummaryCard attributes={attributes}/> : <ActivityIndicator />}
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  }
});
