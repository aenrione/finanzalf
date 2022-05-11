import React from 'react';
import { RefreshControl, ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import CustomAmountItem from '../../components/CustomAmountItem';
import CustomButton from "../../components/CustomButton"
import { useInfiniteQuery } from "react-query"
import axios from 'axios'
import store from '../../store'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Transactions({ header }) {
  const sort_by = "transaction_date"
  const sort_desc = true
  const limit = 5
  const email = store.getState().user.email

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


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
      elem.data
    ))
    let arr = [].concat.apply([], all)
      .filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    return arr
  }


  return (
    <View>
      {status === 'success' ?
        <FlatList
          data={mapTransactionPages()}
          ListHeaderComponent={<Header header={header} status={status} />}
          renderItem={({ item: transaction }) => <TransactionSection transaction={transaction} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<Footer onLoadMore={fetchNextPage} loading={loading} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        : <ActivityIndicator />}
    </View>
  );
};
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
        text={transaction.attributes.description}
        value={transaction.attributes.amount}
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

