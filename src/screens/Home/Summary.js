import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

const SummaryCard = function({ attributes }) {
  return (
    <Card>
      <Card.Title>Summary</Card.Title>
      <Divider />
      <CustomAmountItem text={"Net Worth"} value={attributes.balances.total} />
      <Divider />
      <CustomAmountItem text={"Fintoc"} value={attributes.balances.fintoc} />
      <Divider />
      <CustomAmountItem text={"Buda"} value={attributes.balances.buda} />
      <Divider />
      <CustomAmountItem text={"Fintual"} value={attributes.balances.fintual} />
      <Divider />
      <CustomAmountItem text={"Income"} value={attributes.income} />
      <Divider />
      <CustomAmountItem text={"Expense"} value={attributes.expense} />
      <Divider />
      <CustomAmountItem text={"Investments"} value={attributes.investments_return} />
    </Card>
  );
}

export default function Summary({ user, attributes }) {
  return (
    <View>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={{ textAlign: 'center' }}>{user.email}</Text>
      {attributes !== null ? <SummaryCard attributes={attributes} /> : <ActivityIndicator />}
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  listSection: {
    fontSize: 14,
    padding: 10
  }
});
