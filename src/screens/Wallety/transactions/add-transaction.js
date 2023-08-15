import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Switch,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';

import { Colors, Typography } from 'src/styles';
import { insertTransaction, updateTransaction } from 'src/dbHelpers/transactionHelper';

import BackHeader from 'src/components/Headers/BackHeader';
import Button from 'src/components/Button';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const mapStateToProps = function(state) {
  return {
    accounts: state.auth_reducer.accounts,
    categories: state.auth_reducer.categories,
  };
};

const AddTransaction = ({ navigation, route, ...props }) => {
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [income, setIncome] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [editable, setEdit] = useState(true);
  const dispatch = useDispatch();
  const { categories, accounts } = props
  const { t } = useTranslation();

  const findById = (array, id) => {
    return array.find((obj) => obj.id === id);
  };

  const getPickerAccounts = () => {
    if (route.params?.item) {
      return accounts
    }
    return accounts.filter((acc) => acc.subtype == 'local')

  }

  const parseAmount = (amount) => {
    let calc_amount = isNaN(parseFloat(amount)) ? 0 : parseFloat(amount)
    if (calc_amount > 0 && !income) {
      calc_amount = -1 * calc_amount
    } else if (calc_amount < 0 && income) {
      calc_amount = Math.abs(calc_amount)
    }
    return calc_amount
  }


  useEffect(() => {
    const trans = route.params?.item
    if (trans) {
      setEdit(!!trans.editable)
      setCategory(findById(categories, trans.category_id));
      setAccount(findById(accounts, trans.account_id));
      setDesc(trans.description);
      const parsedDate = new Date(trans.transaction_date); // Attempt to parse the date
      setDate(isNaN(parsedDate) ? new Date() : parsedDate); // If parsing fails, set the default date
      setAmount((trans.amount).toString());
      setIncome(trans.type == 'income' ? false : true);
    }
    else {
      setCategory(categories[0]); // Set the first category as a default category
      setAccount(accounts.filter((acc) => acc.subtype == 'local')[0])
    }
  }, []);

  // Toggle Income / Expense Switch
  const toggleIncomeSwitch = () => setIncome(previousState => !previousState);

  // Change Date
  const onChangeDate = (_event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  }
  const isValid = () => {
    if (category && account && desc != '' && amount != '') {
      return true
    }
    return false
  }

  // Insert Transaction
  const __insert = () => {
    insertTransaction({
      category_id: category.id,
      account_id: account.id,
      transaction_date: date.toISOString(),
      description: desc,
      amount: parseAmount(amount),
      type: income ? 'expense' : 'income'
    });
  }

  // Update Transaction
  const __update = () => {
    if (editable) {
      updateTransaction({
        id: route.params?.item.id,
        category_id: category.id,
        account_id: account.id,
        transaction_date: date.toISOString(),
        amount: parseAmount(amount),
        description: desc,
        type: income ? 'expense' : 'income',
      });
    } else {
      updateTransaction({
        id: route.params?.item.id,
        category_id: category.id,
      });
    }
  };

  // Save Transaction
  const __save = async () => {
    if (route.params?.item) {
      __update();
    }
    else {
      __insert();
    }
    await dispatch(getAllInfo())
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title={route.params?.item ? t('new_transaction.edit') : t('new_transaction.new')} />

      {/* Body */}
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.category')}
            {route.params?.item && (
              <Text style={[Typography.TAGLINE, { color: Colors.SUCCESS }]}> (editable)
              </Text>)}
          </Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, _itemIndex) => setCategory(itemValue)}
            style={styles.input}
            dropdownIconColor={Colors.GRAY_DARK}
            itemStyle={[Typography.BODY, { color: Colors.GRAY_DARK }]}>
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category.name} value={category} />
            ))}
          </Picker>
        </View>
        {/* Account */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.account')}</Text>
          <Picker
            selectedValue={account}
            onValueChange={(itemValue, _itemIndex) => setAccount(itemValue)}
            style={styles.input}
            enabled={editable}
            dropdownIconColor={Colors.GRAY_DARK}
            itemStyle={[Typography.BODY, { color: Colors.GRAY_DARK }]}>
            {getPickerAccounts().map((acc, index) => (
              <Picker.Item key={index} label={acc.name} value={acc} />
            ))}
          </Picker>
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.desc')}</Text>
          <TextInput
            value={desc}
            placeholder={t('new_transaction.desc_placeholder')}
            editable={editable}
            onChangeText={(text) => setDesc(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]} />
        </View>

        {/* Transaction type */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.type')}</Text>
          <View style={styles.rowContainer}>
            <Text style={[Typography.BODY, !income ? { color: Colors.PRIMARY } : { color: Colors.GRAY_DARK }]}>{t('new_transaction.income')}</Text>
            <Switch
              disabled={!editable}
              trackColor={{ false: Colors.WHITE, true: Colors.WHITE }}
              thumbColor={income ? Colors.PRIMARY : Colors.PRIMARY}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIncomeSwitch}
              value={income}
            />
            <Text style={[Typography.BODY, income ? { color: Colors.PRIMARY } : { color: Colors.GRAY_DARK }]}>{t('new_transaction.expense')}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.date')}</Text>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            disabled={!editable}
            style={[styles.input, { paddingTop: 15, paddingBottom: 15 }]}>
            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            display='calendar'
            onChange={onChangeDate}
          />
        )}

        {/* Amount */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_transaction.amount')}</Text>
          <TextInput
            value={amount}
            placeholder={t('new_transaction.amount_placeholder')}
            keyboardType='numeric'
            editable={editable}
            onChangeText={(text) => setAmount(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]} />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button
          title={t('save')}
          disabled={!isValid()}
          onPress={() => __save()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.LIGHT_BLACK
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
});

export default connect(mapStateToProps)(AddTransaction);

