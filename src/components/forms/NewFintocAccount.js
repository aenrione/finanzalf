import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
 
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import axios from 'axios'
import store from '../../store'
import { getCapabilities, setLoading } from '../../actions/LoginAction';


export default function NewFintocAccount({onSubmit, onLoading}) {
  const [link, setLink] = useState('');
  const [api_key, setKey] = useState('');

  const create = async function(){
    await onLoading()
    
    await axios
      .post('/api/v1/fintoc_accounts',
      {
          link: link,
          encrypted_password: api_key,
    }).then((response) => {
      console.log(response.data)
      store.dispatch(getCapabilities())
    }).finally(() => {
      onLoading()
      onSubmit()
    });
    await onLoading()
  };

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Create Fintoc Account</Text>
        <CustomInput placeholder="Link" secureTextEntry value={link} setValue={setLink} />
        <CustomInput placeholder="Api key" secureTextEntry value={api_key} setValue={setKey} />
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

