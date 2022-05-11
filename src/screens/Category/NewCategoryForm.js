import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import { useMutation } from "react-query";
import axios from 'axios'
import { showMessage } from "react-native-flash-message";


export default function NewCategoryForm({ refetch }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');


  const createCategory = async function() {
    const { data: response } = await axios
      .post('/api/v1/categories',
        {
          name: title,
          description: description
        })
    return response.data
  };
  const mutation = useMutation(createCategory);
  const { error, isSuccess, isError } = mutation;

  const onSubmit = async () => {
    mutation.mutate();
  };

  useEffect(() => {
    // Update the document title using the browser API
    if (isSuccess) {
      setTitle('')
      setDesc('')
      refetch()
      mutation.reset()
    }
    if (isError) {
      setTitle('')
      setDesc('')
      showMessage({
        message: error.response.data.message,
        type: "danger",
      }); console.log("ERROR", error.response.data.errors)
      mutation.reset()
    }
  });

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
          onPress={onSubmit} />

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

