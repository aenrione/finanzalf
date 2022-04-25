import React, { useState } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import CustomAmountItem from '../../components/CustomAmountItem';
import CustomButton from "../../components/CustomButton"
import { useInfiniteQuery } from "react-query"
import axios from 'axios'
import store from '../../store'


export default function Transactions() {
  const [sort_by, setSortBy] = useState("transaction_date");
  const [sort_desc, setSortDesc] = useState(true);
  const [limit, setLimit] = useState(5);
  const email = store.getState().user.email


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
    return [].concat.apply([], all)
  }


  return (
    <View>
      <Card>
        <Card.Title>Transactions</Card.Title>
        <Divider />
        {status === 'success' ? <TransactionsLoop transactions={mapTransactionPages()} onLoadMore={fetchNextPage}
          loading={loading} /> : <ActivityIndicator />}
      </Card>
    </View>
  );
};


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
    <View>
      <CustomAmountItem
        text={transaction.attributes.description}
        value={transaction.attributes.amount}
      />
      <Divider />
    </View>
  );
}

const TransactionsLoop = function({ transactions, onLoadMore, loading }) {
  return (
    <View>
      <FlatList
        data={transactions}
        renderItem={({ item: transaction }) => <TransactionSection transaction={transaction} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<Footer onLoadMore={onLoadMore} loading={loading} />}
      />
    </View>
  )
}

