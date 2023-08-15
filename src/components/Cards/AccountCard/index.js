import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from 'src/styles';
import { formatCurrency } from 'src/utils/currency';
import { useTranslation } from 'react-i18next';

const AccountCard = (props) => {
  const account = props.account;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={account.icon} color={Colors.WHITE} size={15} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{account.name}</Text>
        {account.holder_name && (

          <Text style={[Typography.TAGLINE, { color: Colors.PRIMARY_LIGHT }]}>{account.holder_name}</Text>
        )}
        <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t(`account_view.types.${account.subtype}`)}</Text>
        {/* <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{account.refreshed_at}</Text> */}
      </View>

      <Text style={[Typography.H4, account.amount >= 0 ? { color: Colors.SUCCESS } : { color: Colors.ALERT }]}>
        {account.amount >= 0 ? '+' : '-'}{formatCurrency(account.amount, account.code)}
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

export default AccountCard;


