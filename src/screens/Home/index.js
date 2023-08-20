import React, { } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import QuickActions from 'src/utils/quickActions';
import BalanceCard from 'src/components/Cards/BalanceCard';
import HomeHeader from 'src/components/Headers/HomeHeader';
import TransactionCard from 'src/components/Cards/TransactionCard';
import BlockHeader from 'src/components/Headers/BlockHeader';
import PieCard from 'src/components/Cards/PieCard';
import PieChart from 'src/components/Cards/PieCard/MultiplePieCard';
import AccountCarousel from 'src/components/Cards/AccountsCarouselCards';
import Carousel from 'src/components/Button/Carousel';
import Button from 'src/components/Button';
import { useTranslation } from 'react-i18next';
import { deleteTransaction } from 'src/dbHelpers/transactionHelper';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';

const mapStateToProps = function(state) {
  return {
    balances: state.auth_reducer.balances,
    accounts: state.auth_reducer.accounts,
    transactions: state.auth_reducer.transactions,
    categoryChartData: state.auth_reducer.categoryChartData,
    accountChartData: state.auth_reducer.accountChartData,
    totalIncomes: state.auth_reducer.totalIncomes,
    totalExpenses: state.auth_reducer.totalExpenses,
    accountTotals: state.auth_reducer.accountTotals,
  };
};

const findByCode = (array, code) => {
  return array.find((obj) => obj.code === code);
};


const Home = (props) => {
  const {
    navigation,
    accounts,
    transactions,
    categoryChartData,
    accountChartData,
    balances,
    accountTotals
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Delete Item
  const __delete = (id) => {
    deleteTransaction(id);
    dispatch(getAllInfo())
  }

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddTransaction.name, { item: item });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader />

      {/* Body */}
      <View style={styles.bodyContainer}>
        <SwipeableFlatList
          data={transactions.slice(0, 4)}
          maxSwipeDistance={140}
          shouldBounceOnMount={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_item, index) => index.toString()}
          renderQuickActions={({ item }) => QuickActions(item, __update, __delete, item.editable ? true : false)}
          ListHeaderComponent={() => {
            return (
              <View>
                <View style={{ paddingLeft: 20, paddingTop: 10 }}>


                  {/* // Balance */}
                  {accounts.length > 0 && (
                    <View>
                      <BlockHeader
                        noMargin
                        title={t('balances')}
                      />
                      <BalanceCard accountTotals={accountTotals} transactionTotals={balances} />
                    </View>)}
                  {/* Accounts */}
                  {accounts.length == 0 && (
                    <Button title={t('get_started')}
                      style={{ marginBottom: 20, backgroundColor: Colors.PRIMARY_LIGHT }}
                      onPress={() => navigation.navigate(routes.AddAccount.name)}
                    />)}
                  <View style={{ marginBottom: 20 }}>
                    <BlockHeader
                      title={t('navigation.Accounts')}
                      noMargin
                      onPress={() => navigation.navigate(routes.Accounts.name)}
                    />
                  </View>
                  {accounts.length > 0 ?
                    <AccountCarousel accounts={accounts} offset={20} />
                    :
                    <View style={styles.emptyContainer}>
                      <Text style={[Typography.TAGLINE, { color: Colors.WHITE, textAlign: 'center' }]}>{t('account_view.empty_one')}</Text>
                    </View>
                  }
                </View>
                <View style={{ paddingLeft: 20 }}>
                  <BlockHeader
                    title={t('transactions')}
                    onPress={() => navigation.navigate(routes.Transactions)} />
                </View>
              </View>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text style={[Typography.TAGLINE, { color: Colors.WHITE, textAlign: 'center' }]}>{t('transaction_view.empty_all')}</Text>
              </View>
            )
          }}
          renderItem={({ item, index }) => {
            return <TransactionCard key={index} transaction={item} />
          }}
          ListFooterComponent={() => {
            return (
              // Statistics
              <View style={{ paddingLeft: 20, marginBottom: 20 }}>
                {balances.length > 0 && (
                  <View>
                    <BlockHeader title={t('saved')} />
                    <Carousel data={balances}
                      style={{ marginTop: 10 }}
                      renderCard={(item, index) => {
                        return (<PieCard key={index} incomes={item.totalIncome} expenses={item.totalExpense} currency={item.code} width={350} />)
                      }}
                    />
                  </View>
                )}

                {Object.keys(categoryChartData).length > 0 && (
                  <View>
                    <BlockHeader title={t('categories_distribution')}
                      onPress={() => navigation.navigate(routes.Categories.name)} />
                    <Carousel data={Object.keys(categoryChartData)}
                      style={{ marginTop: 10 }}
                      renderCard={(item, index) => {
                        return (<PieChart key={index} data={categoryChartData[item]} currency={item} width={350} amount={findByCode(accountTotals, item).totalAmount} />)
                      }}
                    />
                  </View>

                )}
                {Object.keys(accountChartData).length > 0 && (
                  <View>
                    <BlockHeader title={t('account_distribution')}
                      onPress={() => navigation.navigate(routes.Accounts.name)} />
                    <Carousel data={Object.keys(accountChartData)}
                      style={{ marginTop: 10 }}
                      renderCard={(item, index) => {
                        return (<PieChart key={index} data={accountChartData[item]} currency={item} width={360} amount={findByCode(accountTotals, item).totalAmount} />)
                      }}
                    />
                  </View>
                )}
              </View>
            )
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 0,
    backgroundColor: Colors.BLACK
  },
  emptyContainer: {
    padding: 20
  },
  bannerText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  bannerContainer: {
    paddingLeft: 20,
    // paddingHorizontal: 30,
    marginLeft: 20,
    // width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_DARKER,
  }

});

export default connect(mapStateToProps)(Home);

