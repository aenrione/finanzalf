import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import { Card, Icon } from 'react-native-elements';


export default function HomeScreen() {
  return (
    <View style={{ flex: 1}}>
      <Card>
        <Card.Title>Summary</Card.Title>
        <Card.Divider />
          <Text>Balance</Text>
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
