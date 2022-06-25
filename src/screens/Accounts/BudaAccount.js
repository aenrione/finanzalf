import React from 'react';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

export function BudaAccount({ account }) {
  return (
    <Card>
      <Card.Title>Buda</Card.Title>
      <Divider />
      <CustomAmountItem text={"Balance"} value={account.balance} />
      <Divider />
      <CustomAmountItem text={"Returns"} value={account.investments_return} />
    </Card>
  );
}


