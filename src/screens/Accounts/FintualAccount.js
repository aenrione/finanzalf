import React from 'react';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

export function FintualAccount({ account }) {
  return (
    <Card>
      <Card.Title>Fintual</Card.Title>
      <Divider />
      <CustomAmountItem text={"Balance"} value={account.balance} />
      <Divider />
      <CustomAmountItem text={"Returns"} value={account.investments_return} />
    </Card>
  );
}



