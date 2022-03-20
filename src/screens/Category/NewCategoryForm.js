import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import axios from 'axios'


export default function NewCategoryForm({}) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');

  const createCategory = () => {
    console.warn("Creating Category")
    axios
      .post('/api/v1/categories',
      {
          name: title,
          description: description
    }).then((response) => {
      console.log("SUCCESS")
    });
  };

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Create a category</Text>
        <CustomInput placeholder="Title"
          value={title} setValue={setTitle} />
        <CustomInput
          placeholder="Description"
          value={description} setValue={setDesc} />

        <CustomButton
        text="Submit"
        bgColor="green"
        onPress={createCategory} />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

