import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@/Text';
import CustomButton from '../../components/CustomButton';
import SetQuotaForm from './SetQuotaForm';

import store from 'src/store';

export default function HomeScreen() {
  const state = store.getState();
  const user = state.auth_reducer.user;
  const currentUrl = state.auth_reducer.baseUrl;

  return (
    <View>
      <View>
        <Text style={styles.title} text={user.name} />
        <Text style={{ textAlign: 'center' }} text={user.email} />
        <SetQuotaForm user_quota={user.quota} />
      </View>
      <CustomButton text="Server URL" type="tertiary" />
      <CustomButton text={currentUrl} bgColor="#e3e3e3" fgColor="#363636" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  listSection: {
    fontSize: 14,
    padding: 10,
  },
});
