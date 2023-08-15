import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import QuickActions from 'src/utils/quickActions';
import AccountCard from 'src/components/Cards/AccountCard';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';
import { getAccounts, deleteAccount } from 'src/dbHelpers/accountHelper';
import { useTranslation } from 'react-i18next';


const Accounts = ({ navigation }) => {
  const focused = useIsFocused();

  const [accounts, setAccounts] = useState([]);
  const { t } = useTranslation();

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
    navigation.navigate(routes.AddAccount.name, { item: item });
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[Typography.H1, { color: Colors.WHITE, marginBottom: 10 }]}>{t('navigation.Accounts')}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => navigation.navigate(routes.AddAccount.name)}>
          <Icon name="plus" color={Colors.WHITE} size={15} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {accounts.length == 0 ?
            <View style={styles.emptyContainer}>
              <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>{t('account_view.empty_one')}</Text>
              <Text style={[Typography.H4, { color: Colors.GRAY_THIN, textAlign: 'center' }]}>{t('account_view.empty_two')}</Text>
            </View>
            :
            <SwipeableFlatList
              data={accounts}
              maxSwipeDistance={140}
              shouldBounceOnMount={true}
              keyExtractor={(item) => item.id.toString()}
              renderQuickActions={({ item }) => QuickActions(item, __update, __delete)}
              renderItem={({ item, index }) => {
                return <AccountCard currency={item.currency_symbol} key={index} account={item} />
              }}
            />
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Header
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK
  },
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

export default Accounts;


