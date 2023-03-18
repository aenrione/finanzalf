import React from 'react';
import CustomAmountItem from '@/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';
import CustomButton from '../../components/CustomButton';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

const deleteAccount = async (refetch) => {
  const { data: _response } = await axios.delete('/api/v1/fintual_account');
  await refetch();
  showMessage({
    message: 'Account Deleted',
    type: 'success',
  });
};

const createTwoButtonAlert = (refetch) =>
  Alert.alert('Delete Account', 'All data synced for this account will be destroyed', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'Delete', onPress: () => deleteAccount(refetch) },
  ]);

export function FintualAccount({ account, refetch }) {
  return (
    <Card>
      <Card.Title>Fintual</Card.Title>
      <Divider />
      <CustomAmountItem text={'Balance'} value={account.balance} />
      <Divider />
      <CustomAmountItem text={'Returns'} value={account.investments_return} />
      <CustomButton
        text="Delete Account"
        fgColor="red"
        type="tertiary"
        onPress={() => createTwoButtonAlert(refetch)}
      />
    </Card>
  );
}
