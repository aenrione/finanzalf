import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircularProgress from '@/CircularProgress';
import { useTranslation } from 'react-i18next';
import { formatCurrency, curStyle } from 'src/utils/currency';

import { Colors, Typography } from 'src/styles';

const PieCard = (props) => {
  const { incomes, expenses, width, currency } = props;
  const selWidth = width || Dimensions.get('window').width
  const amount = incomes + expenses

  const payoutPercent = incomes == 0 && expenses == 0 ? 0 : incomes == 0 ? 100 : Math.abs((expenses / incomes) * 100).toFixed(2);
  const savedPercent = incomes == 0 && expenses == 0 ? 0 : (100 - payoutPercent).toFixed(2);
  const { t } = useTranslation();

  return (
    <View >
      {currency && (
        <Text style={[Typography.H3, styles.currencyCode, {
          color: Colors.WHITE,
        }]}>{currency}
        </Text>)}
      {amount && (
        <Text style={[Typography.H3, curStyle(amount), styles.currencyCode]}>{formatCurrency(amount, currency)}</Text>
      )}
      <View style={[styles.container, { width: selWidth }]}>
        <View style={styles.pieContainer}>
          <CircularProgress percent={payoutPercent} />
        </View>
        <View style={styles.numbersContainer}>
          <View style={styles.rowContainer}>
            <Icon name="circle" size={15} color={Colors.PRIMARY} />
            <Text style={[Typography.BODY, { marginLeft: 5, color: Colors.GRAY_THIN }]}>{t('saved')} ({savedPercent}%)</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icon name="circle" size={15} color={Colors.GRAY_MEDIUM} />
            <Text style={[Typography.BODY, { marginLeft: 5, color: Colors.GRAY_THIN }]}>{t('transaction_view.expenses')} ({payoutPercent}%)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 16,
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_DARKER
  },
  pieContainer: {
    padding: 15
  },
  numbersContainer: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    justifyContent: 'center'
  },
  rowContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  currencyCode: {
    marginTop: 10,
    textAlign: 'center'
  },
});

export default PieCard;

