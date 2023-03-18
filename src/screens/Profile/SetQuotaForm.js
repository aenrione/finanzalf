import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '@/Text';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useMutation } from 'react-query';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import * as NavigationService from 'src/navigation/navigationService';

export default function SetQuotaForm() {
  const [quota, setQuota] = useState('');

  const setQuotaRequest = async function () {
    const { data: response } = await axios.post('/api/v1/user/set_quota', {
      quota: quota,
    });
    return response.data;
  };
  const mutation = useMutation(setQuotaRequest);
  const { isSuccess, isError } = mutation;

  const onSubmit = async () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      NavigationService.navigate('Dashboard');
      showMessage({
        message: 'Success!',
        type: 'success',
      });
      mutation.reset();
    }
    if (isError) {
      setQuota(0);
      mutation.reset();
    }
  }, [isSuccess, isError, mutation]);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title} text={'Set Quota'} />
        <CustomInput placeholder="Quota" value={quota} setValue={setQuota} />

        <CustomButton text="Submit" bgColor="green" onPress={onSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
