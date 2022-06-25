import React, { useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import CustomButton from "../../components/CustomButton"
import store from '../../store'
import { useQuery, useMutation } from "react-query";
import axios from 'axios'
import { showMessage } from "react-native-flash-message";


export default function Transaction() {
  const currentTransaction = store.getState().object_reducer.selected_transaction

  const getInfo = async function() {
    const { data: response } = await axios
      .get(`/api/v1/transactions/${currentTransaction}`)
    return response.transaction
  }
  const { data: info, status, refetch } = useQuery("transaction-show", getInfo);

  return (
    <ScrollView style={[styles.listSection, { flex: 1 }]}>
      {status === "loading" ?
        <ActivityIndicator size="large" color="#0000ff" /> :
        <View>
          <Text style={styles.title}>Transaction</Text>
          <Divider />
          <Section text={"Amount"} value={info.amount} />
          <Divider />
          <Section styles={[styles.title]} text={"Description"} value={info.description} number={false} />
          <Divider />
          <Section text={"Currency"} value={info.currency} number={false} />
          <Divider />
          <Section text={"Holder_name"} value={info.holder_name || "Your Transaction"} number={false} />
          <Divider />
          <Section text={"Holder Institution"} value={info.holder_institution} number={false} />
          <Divider />
          <Section text={"Holder_id"} value={info.holder_id || "Your Transaction"} number={false} />
          <Divider />
          <Section text={"Transaction Date"} value={info.transaction_date} number={false} />
          <Divider />
          <Section text={"Category"} value={info.category || "No category"} number={false} />
          <Divider />
          <CategoryForm transaction_id={currentTransaction} refetchTransaction={refetch} />
        </View>

      }
    </ScrollView>
  );
};
export function Section({ text, value }) {
  return (
    <View style={[styles.textSection, { flex: 1 }]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export function CategoryForm({ transaction_id, refetchTransaction }) {
  const [selectedCategory, setCategory] = useState();

  const getCategories = async function() {
    const { data: response } = await axios
      .get(`/api/v1/categories`)
    return response.transaction_categories
  }

  const submitForm = async function() {
    const { data: response } = await axios
      .post(`/api/v1/transactions/${transaction_id}/add_category/${selectedCategory}`)
    return response.data

  };
  const mutation = useMutation(submitForm, {
    onSuccess: (data) => {
      refetchTransaction()
      showMessage({
        message: "Exito!",
        type: "success",
      });
    }
  });

  const { data: categories, status } = useQuery("transaction-categories", getCategories, {
    onSuccess: (data) => {
      setCategory(data[0].id)
    }
  })

  const onSubmit = function() {
    mutation.mutate();
  }
  return (
    <View style={styles.form}>
      {status === "loading" ?
        <ActivityIndicator size="large" color="#0000ff" /> :
        <View>
          <Text style={styles.title}>Set Category</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            {categories.map(r =>
              <Picker.Item label={r.name} value={r.id} key={r.id} />
            )}
          </Picker>
          <CustomButton text={"Submit"} onPress={onSubmit} />
        </View >}
    </View >
  );
};

const styles = StyleSheet.create({
  listSection: {
    fontSize: 14,
    padding: 20,
    margin: 20,
    backgroundColor: "white",
  },
  textSection: {
    flexDirection: "row",
    fontSize: 14,
    padding: 20,
    marginBottom: 10,
    justifyContent: "space-between",
    height: 20,
  },
  text: {
    width: "50%",
    height: 20,

  },
  value: {
    fontWeight: "bold",
    width: "50%",
    height: 20,

  },
  form: {
    padding: 20,
    borderColor: "black",
    borderWidth: 2
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
});
