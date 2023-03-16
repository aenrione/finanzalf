import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Divider } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import CustomButton from "../../components/CustomButton"
import Text from '../../components/Text';
import store from '../../store'
import { useQuery, useMutation } from "react-query";
import axios from 'axios'
import { showMessage } from "react-native-flash-message";
import * as Progress from 'react-native-progress';
import CustomIndicator from "../../components/CustomIndicator"


export default function Transaction() {
  const currentTransaction = store.getState().object_reducer.selected_transaction
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onRefresh = async function() {
    setRefreshing(true);
    await refetch()
    setRefreshing(false)
  }

  const getInfo = async function() {
    setLoading(true);
    const { data: response } = await axios
      .get(`/api/v1/transactions/${currentTransaction}`)
    setLoading(false);
    return response.transaction
  }
  const { data: info, status, refetch } = useQuery("transaction-show", getInfo);

  return (
    <ScrollView style={[styles.listSection, { flex: 1 }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

    >
      {status !== "success" || loading ?
        <CustomIndicator size={150}/> :
        <View>
          <Text style={styles.title} text={'Transaction'} />
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
          <CategorySection text={"Category"} currentTransaction={currentTransaction} refetch={refetch} info={info} />
          <Divider />
        </View>

      }
    </ScrollView>
  );
};
export function Section({ text, value }) {
  return (
    <View style={[styles.textSection, { flex: 1 }]}>
      <Text style={styles.text} text={text} />
      <Text style={styles.value} text={value} />
    </View>
  );
};

export function CategorySection({ text, currentTransaction, refetch, info }) {
  return (
    <View>
      <View>
        <Text style={[styles.subtitle, {textAlign: "center"}]} text={text} />
        {/* <Text style={styles.text} text={info.category.name} /> */}
      </View>
      {/* <Divider /> */}
      {/* <Text style={styles.subtitle} text="Change Category" /> */}
      <CategoryForm1 transaction_id={currentTransaction} refetchTransaction={refetch} info={info} />
    </View>
  );
};

export function CategoryForm1({ transaction_id, refetchTransaction, info }) {
  const [selectedCategory, setCategory] = useState(info.category.id);
  const [loading, setLoading] = useState(false);
  console.log(selectedCategory)

  const getLoadingState = function(status) {
    return loading || status === "loading";
  }

  const getCategories = async function() {
    const { data: response } = await axios
      .get(`/api/v1/categories`)
    return response.transaction_categories
  }

  const submitForm = async function() {
    console.log(selectedCategory)
    if (!selectedCategory) { return }
    if (selectedCategory !== -1 && selectedCategory !== "-1") {
      console.log(`/api/v1/transactions/${transaction_id}/add_category/${selectedCategory}`)
      const { data: response } = await axios
        .post(`/api/v1/transactions/${transaction_id}/add_category/${selectedCategory}`)
      return response.data
    }
    console.log(`/api/v1/transactions/${transaction_id}/remove_category`)
    const { data: response } = await axios
      .post(`/api/v1/transactions/${transaction_id}/remove_category`)
    console.log(response)
    return response.data
  };

  const mutation = useMutation(submitForm, {
    onSuccess: () => {
      refetchTransaction()
      showMessage({
        message: "Exito!",
        type: "success",
      });
    }
    , onMutate: async () => {
      setLoading(true)
      // setCategory(itemValue)
    }
    , onSettled: () => {
      setLoading(false)
    }
  }
  );

  const { data: categories, status } = useQuery("transaction-categories", getCategories, {
    onSuccess: (data) => {
      setCategory(info.category.id)
    }
  })

  return (
    <View>
      {getLoadingState(status) ?
        <Progress.Circle indeterminate={true} size={30} /> :
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, _itemIndex) => setCategory(itemValue)}>
          <Picker.Item label="No Category" value="-1" />
          {categories.map(r =>
            <Picker.Item label={r.name} value={r.id} key={r.id} />
          )}
        </Picker>
      }
      <CustomButton text={"Update Category"} onPress={() => mutation.mutate()} />
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
    subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20
  },
  picker: {
    color: "#fff",
    backgroundColor: "#333",
  }

});
