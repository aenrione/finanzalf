import React from 'react';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

export function FintualAccount() {
  return (
    <Card>
      <Card.Title>Fintual</Card.Title>
      <Divider />
      <CustomAmountItem text={"Balance"} value={"$0"} />
    </Card>
  );
}



