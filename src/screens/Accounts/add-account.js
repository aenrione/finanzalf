import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';

import { Colors, Typography } from 'src/styles';
import { insertAccount, updateAccount } from 'src/dbHelpers/accountHelper';
import { getLink, getOptions, generateFintocUrl, linkInfo, createAccounts } from 'src/utils/fintoc';

import { accounts } from 'src/utils/accounts';
import { currencies } from 'src/utils/currency';
import BackHeader from 'src/components/Headers/BackHeader';
import Button from 'src/components/Button';
import { useTranslation } from 'react-i18next';

const findCurrencyByName = (name) => {
  return currencies.find((currency) => currency.name === name);
};
const findAccountType = (name) => {
  return accounts.find((currency) => currency.name === name);
};


const AddAccount = ({ navigation, route }) => {
  const [type, setType] = useState(accounts[0]);
  const [accName, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fintocOptions, setFintocOptions] = useState();
  const [currency, setCurrency] = useState(currencies[0]);
  const [editable, setEdit] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isValid = () => {
    if (accName == '') return false
    return true
  };

  const resetFintocOptions = () => {
    setFintocOptions(null);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const onSuccess = async (uri) => {

    // Extract the query string from the URI
    const queryString = uri.split('?')[1];
    const params = {};

    // Parse the query string to get the parameters
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });

    const exchangeToken = params["exchange_token"];

    const link = await getLink(exchangeToken)
    const accounts = await linkInfo(link)
    await createAccounts(accounts, type)
    navigation.goBack();
    closeModal();
  };
  const onEvent = (event) => {
    if (event.nativeEvent.data === 'fintocwidget://exit') onExit()
    else if (event.nativeEvent.data.includes("fintocwidget://succeeded")) onSuccess(event.nativeEvent.data)
  };

  const onExit = () => {
    closeModal()
    resetFintocOptions(); // Reset fintocOptions to null when the modal is closed
    setType(accounts[0]); // Set the first type as a default type
  };

  const setAccount = async (acc_type) => {
    if (acc_type.fintoc) {
      await getOptions(setFintocOptions, fintocOptions)
      setShowModal(true)
    }
    setType(acc_type)

  }

  useEffect(() => {
    if (route.params?.item) {
      const acc = route.params.item
      setEdit(!!acc.editable)
      setType(findAccountType(acc.type));
      setName(acc.name)
      setAmount((acc.amount).toString());
      setCurrency(findCurrencyByName(acc.currency_name))
    }
    else {
      setType(accounts[0]);
    }
  }, []);

  // Insert Account
  const __insert = () => {
    insertAccount({
      type: type.name,
      name: accName,
      amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
      code: currency.code,
      icon: type.icon,
      editable: type.editable,
      subtype: type.subtype,
      currency_name: currency.name,
      currency_symbol: currency.symbol,
    });
  }

  // Update Account
  const __update = () => {
    updateAccount({
      id: route.params.item.id,
      name: accName,
      amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
      code: currency.code,
    });
  }

  // Save Account
  const __save = () => {
    if (route.params?.item) {
      __update();
    }
    else {
      __insert();
    }
    dispatch(getAllInfo())
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title={route.params?.item ? t('new_account.edit_account') : t('new_account.new_account')} />

      {/* Body */}
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        {/* Account Type */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_account.account_type')}
          </Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, _itemIndex) => setAccount(itemValue)}
            style={styles.input}
            enabled={editable && !route.params?.item}
            dropdownIconColor={Colors.GRAY_DARK}
            itemStyle={[Typography.BODY, { color: Colors.GRAY_DARK }]}>
            {accounts.map((type, index) => (
              <Picker.Item key={index} label={t(`new_account.types.${type.subtype}`)} value={type} />
            ))}
          </Picker>
        </View>
        {/* Account Name */}
        {(editable || route.params?.item) && (
          <View style={styles.inputContainer}>
            <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_account.account_name')}
              {route.params?.item && (
                <Text style={[Typography.TAGLINE, { color: Colors.SUCCESS }]}>{t('new_account.editable')}
                </Text>
              )}
            </Text>
            <TextInput
              value={accName}
              placeholder={t('new_account.name_placeholder')}//'Exp: Credit account'
              onChangeText={(text) => setName(text)}
              placeholderTextColor={Colors.GRAY_MEDIUM}
              style={[styles.input, Typography.BODY]} />
          </View>)}


        {/* Amount */}
        {/* {type.editable && ( */}
        {/*   <View style={styles.inputContainer}> */}
        {/*     <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Amount</Text> */}
        {/*     <TextInput */}
        {/*       value={amount} */}
        {/*       placeholder='Exp: 20' */}
        {/*       keyboardType='numeric' */}
        {/*       onChangeText={(text) => setAmount(text)} */}
        {/*       placeholderTextColor={Colors.GRAY_MEDIUM} */}
        {/*       style={[styles.input, Typography.BODY]} /> */}
        {/*   </View>)} */}

        {/* Currency */}
        {type.editable && (
          <View style={styles.inputContainer}>
            <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('new_account.currency')}</Text>
            <Picker
              selectedValue={currency}
              onValueChange={(itemValue) => setCurrency(itemValue)}
              style={styles.input}
              dropdownIconColor={Colors.GRAY_DARK}
              itemStyle={[Typography.BODY, { color: Colors.GRAY_DARK }]}>
              {currencies.map((curr, index) => (
                <Picker.Item key={index} label={`${curr.name} (${curr.symbol})`} value={curr} />
              ))}
            </Picker>
          </View>)}
        <Modal visible={showModal} animationType="slide" onRequestClose={onExit}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {fintocOptions ? (
                <View style={styles.wrapper}>
                  <WebView
                    source={{ uri: generateFintocUrl(fintocOptions) }}
                    onMessage={onEvent}
                  />
                </View>
              ) : null}
            </ScrollView>
          </View>
        </Modal>
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
  webContainer: {
    height: 1000,
    margin: 0,
    padding: 0,
    backgroundColor: Colors.LIGHT_BLACK
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.LIGHT_BLACK, // Use the desired background color for the modal
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
});

export default AddAccount;


