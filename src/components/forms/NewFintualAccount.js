import React, {useState} from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import axios from 'axios'


export default function NewFintualAccount({onLoading}) {
  const [email, setEmail] = useState('');
  const [passowrd, setPassword] = useState('');

  const create = () => {
    onLoading(true)
    axios
      .post('/api/v1/fintual_accounts',
      {
          email: email,
          encrypted_password: passowrd,
    }).then((response) => {
      console.log("SUCCESS")
    });
    onLoading(false)
  };

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Create Fintual Account</Text>
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" secureTextEntry value={passowrd} setValue={setPassword} />
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

