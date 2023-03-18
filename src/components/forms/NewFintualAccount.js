import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CustomInput from '@/CustomInput/CustomInput';
import CustomButton from '@/CustomButton';
import { useMutation } from 'react-query';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export default function NewFintualAccount({ refresh }) {
  const [email, setEmail] = useState('');
  const [passowrd, setPassword] = useState('');

  const postEntity = async function () {
    const { data: response } = await axios.post('/api/v1/fintual_accounts', {
      email: email,
      encrypted_password: passowrd,
    });
    return response.data;
  };
  const mutation = useMutation(postEntity);
  const { isLoading, isSuccess } = mutation;

  const onSubmit = async () => {
    mutation.mutate();
  };

  if (isSuccess) {
    showMessage({
      message: 'Exito!',
      type: 'success',
    });
    refresh();
  }

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.root}>
          <Text style={styles.title}>Create Fintual Account</Text>
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Password"
            secureTextEntry
            value={passowrd}
            setValue={setPassword}
          />
          <CustomButton text="Submit" onPress={onSubmit} />
          <CustomButton text="Help" type="tertiary" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
