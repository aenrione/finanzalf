import React, {useState} from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import axios from 'axios'


export default function NewBudaAccount({onLoading}) {
  const [api_secret, setSecret] = useState('');
  const [api_key, setKey] = useState('');

  const create = () => {
    onLoading(true)
    axios
      .post('/api/v1/buda_accounts',
      {
          api_key: api_key,
          encrypted_password: api_secret,
    }).then((response) => {
      console.log("SUCCESS")
    });
    onLoading(false)
  };

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Create Buda Account</Text>
        <CustomInput placeholder="Api key" secureTextEntry value={api_key} setValue={setKey} />
        <CustomInput placeholder="Api secret" secureTextEntry value={api_secret} setValue={setSecret} />
        <CustomButton text="Submit" onPress={create} />
        <CustomButton text="Help" type="tertiary"/>

      </View>
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
    marginBottom: 10
  }
});

