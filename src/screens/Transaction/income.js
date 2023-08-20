import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';
import { connect } from 'react-redux';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import QuickActions from 'src/utils/quickActions';
import TransactionCard from 'src/components/Cards/TransactionCard';
import { useTranslation } from 'react-i18next';
import { deleteTransaction } from 'src/dbHelpers/transactionHelper';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';

const mapStateToProps = function(state) {
  return {
    incomes: state.auth_reducer.incomes,
  };
};

const Income = ({ navigation, ...props }) => {
  const { t } = useTranslation();
  const { incomes } = props;
  const TransactionCardMemo = React.memo(TransactionCard);
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
  const renderItem = useCallback(({ item }) => {
    return <TransactionCardMemo transaction={item} />
  }, []);

  const renderQuickActions = useCallback(({ item }) => {
    return QuickActions(item, __update, __delete, item.editable ? true : false);
  }, [__update, __delete]);

  return (
    <View style={styles.container}>
      {incomes.length == 0 ?
        <View style={styles.emptyContainer}>
          <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>{t('transaction_view.empty_income')}</Text>
        </View>
        :
        <SwipeableFlatList
          data={incomes}
          maxSwipeDistance={140}
          shouldBounceOnMount={true}
          keyExtractor={(item) => item.id.toString()}
          renderQuickActions={renderQuickActions}
          renderItem={renderItem}
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

export default connect(mapStateToProps)(Income);
