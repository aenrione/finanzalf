import React from 'react';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

export function FintocAccount({ account }) {
  return (
    <Card>
      <Card.Title>Fintoc</Card.Title>
      <Divider />
      <CustomAmountItem text={"Balance"} value={account.balance} />
      <Divider />
      <CustomAmountItem text={"Income"} value={account.income} />
      <Divider />
      <CustomAmountItem text={"Expense"} value={account.expense} />
    </Card>
  );
}

