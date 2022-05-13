import React from 'react';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

export function FintocAccount() {
  return (
    <Card>
      <Card.Title>Fintoc</Card.Title>
      <Divider />
      <CustomAmountItem text={"Balance"} value={"$0"} />
    </Card>
  );
}

