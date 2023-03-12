import React from 'react';
import { RefreshControl, View, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import CustomAmountItem from '../../components/CustomAmountItem';
import CustomButton from "../../components/CustomButton"
import { useInfiniteQuery } from "react-query"
import axios from 'axios'
import store from '../../store'
import { changeTransaction } from '../../actions/ObjectActions';


const changeTransactionId = (id) => {
  store.dispatch(changeTransaction({ transaction_id: id }))
}

export default function Transactions({ header, refetch }) {
  const sort_by = "transaction_date"
  const sort_desc = true
  const limit = 5
  const email = store.getState().auth_reducer.user.email

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async function() {
    setRefreshing(true);
    await refetch()
    setRefreshing(false)
  }

  const getTransactions = async function({ pageParam = 1 }) {
    const response = await axios
      .get('/api/v1/transactions',
        {
          params: {
            email: email,
            sort_by: sort_by,
            sort_desc: sort_desc,
            limit: limit,
            page: pageParam
          }
        })
    return response.data

  }
  const { data: transactions, status, fetchNextPage, isFetchingNextPage: loading } = useInfiniteQuery("transactions", getTransactions, {
    getNextPageParam: (lastPage) => {
      const { current_page: page, total_pages: totalPages } = lastPage.meta;

      return (page < totalPages) ? page + 1 : undefined;
    },
  });

  const mapTransactionPages = function() {
    let all = transactions.pages.map(elem => (
      elem.transactions
    ))
    let arr = [].concat.apply([], all)
      .filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    return arr
  }

  if (status === "error") {
    return <Error header={header} />
  }

  return (
    <View>
      {status === 'success' &&
        <FlatList
          data={mapTransactionPages()}
          ListHeaderComponent={<Header header={header} status={status} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item: transaction }) => <TransactionSection transaction={transaction} />}
          ListFooterComponent={<Footer onLoadMore={fetchNextPage} loading={loading} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
    }
    </View>
  );
};
const Error = function({ header }) {

  return (
    <View>
      <Header header={header} />
      <Card>
        <Card.Title>Add a Fintoc Account in "Accounts" to view this section</Card.Title>
        <ActivityIndicator size="large" color="#0000ff" />
      </Card>
    </View>
  );
}

const Header = function({ header }) {

  return (
    <View>
      {header}
      <Card>
        <Card.Title>Transactions</Card.Title>
      </Card>
    </View>
  );
}


const Footer = function({ onLoadMore, loading }) {
  return (
    <View>
      {!loading ?
        <CustomButton text="Load More" onPress={onLoadMore} type="tertiary" />
        : <ActivityIndicator />
      }
    </View>
  );
}

const TransactionSection = function({ transaction }) {
  return (
    <View style={styles.item}>
      <CustomAmountItem
        text={transaction.description}
        value={transaction.amount}
        onPress={() => changeTransactionId(transaction.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'rgb(225, 232, 238)',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginHorizontal: 16,
  },
});

