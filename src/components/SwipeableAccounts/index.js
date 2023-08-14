import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';
import { getAccounts, deleteAccount } from 'src/dbHelpers/accountHelper';

import QuickActions from 'src/utils/quickActions';
import AccountCard from 'src/components/Cards/AccountCard';
import BlockHeader from 'src/components/Headers/BlockHeader';

const List = ({ navigation }) => {
  const focused = useIsFocused();

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts(setAccounts);
  }, [focused]);

  // Delete Item
  const __delete = (id) => {
    deleteAccount(id);
    getAccounts(setAccounts);
  }

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddTransaction.name, { item: item });
  }

  return (
    <SwipeableFlatList
      data={accounts.slice(0, 3)}
      maxSwipeDistance={140}
      shouldBounceOnMount={true}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderQuickActions={({ index, item }) => QuickActions(item, __update, __delete)}
      ListHeaderComponent={() => {
        return (
          <View>
            <View style={{ paddingLeft: 20 }}>
              <BlockHeader
                title='Accounts'
                onPress={() => navigation.navigate(routes.accounts)} />
            </View>
          </View>
        )
      }}
      ListEmptyComponent={() => {
        return (
          <View style={styles.emptyContainer}>
            <Text style={[Typography.TAGLINE, { color: Colors.WHITE, textAlign: 'center' }]}>You don't have any accounts !</Text>
          </View>
        )
      }}
      renderItem={({ item, index }) => {
        return <AccountCard key={index} account={item} />
      }}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20
  },
});

export default List;


