import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';
import { connect } from 'react-redux';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';
import { deleteTransaction } from 'src/dbHelpers/transactionHelper';

import QuickActions from 'src/utils/quickActions';
import TransactionCard from 'src/components/Cards/TransactionCard';

const mapStateToProps = function(state) {
  return {
    transactions: state.auth_reducer.transactions,
  };
};

const All = ({ navigation, ...props }) => {
  const { transactions } = props;

  // Delete Item
  const __delete = (id) => {
    deleteTransaction(id);
  }

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddTransaction.name, { item: item });
  }

  return (
    <View style={styles.container}>
      {transactions.length == 0 ?
        <View style={styles.emptyContainer}>
          <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>You don't have any transactions !</Text>
        </View>
        :
        <SwipeableFlatList
          data={transactions}
          maxSwipeDistance={140}
          shouldBounceOnMount={true}
          keyExtractor={(_item, index) => index.toString()}
          renderQuickActions={({ item }) => QuickActions(item, __update, __delete, item.editable ? true : false)}
          renderItem={({ item, index }) => {
            return <TransactionCard key={index} transaction={item} />
          }}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: Colors.BLACK
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(mapStateToProps)(All);


