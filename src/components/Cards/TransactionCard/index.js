import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';
import { formatCurrency, curStyle } from 'src/utils/currency';

import { Colors, Typography } from 'src/styles';

const TransactionCard = (props) => {
  const transaction = props.transaction;

  const getIcon = () => {
    if (transaction.icon) return transaction.icon
    // else if (transaction.acc_icon) return transaction.acc_icon
    else return 'question'
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={getIcon()} color={Colors.WHITE} size={15} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{transaction.description}</Text>
        {/* <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{transaction.category_name}</Text> */}
        <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{transaction.account_name}</Text>
        <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{new Date(transaction.transaction_date).toLocaleString()}</Text>
      </View>

      <Text style={[Typography.H4, curStyle(transaction.amount)]}>
        {formatCurrency(transaction.amount, transaction.code)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLACK
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  }
});

export default TransactionCard;

