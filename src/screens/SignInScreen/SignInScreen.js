import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from 'assets/images/wallet.png';
import CustomInput from '@/CustomInput/CustomInput';
import CustomButton from '@/CustomButton';
import { Picker } from '@react-native-picker/picker';
import { loginUser, setLoading } from 'src/actions/LoginAction';
import { getAllInfo } from 'src/actions/ObjectActions';
import store from 'src/store';
import { useDispatch } from 'react-redux';
import { updateAccounts } from 'src/utils/fintoc';
import { useTranslation } from 'react-i18next';
import i18n from 'src/translations/i18n';

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
];
const getUser = async function() {
  try {
    let userData = await AsyncStorage.getItem('user');
    let data = JSON.parse(userData);
    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const mapStateToProps = function(state) {
  return {
    spinner: state.auth_reducer.spinner,
    url: state.auth_reducer.baseUrl,
  };
};

export function SignInScreen({ navigation, ...props }) {
  const { height } = useWindowDimensions();
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es');  // Default to English
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSignInPressed = async function() {
    await AsyncStorage.setItem('language', selectedLanguage);  // Save selected language
    await store.dispatch(loginUser({ name, language: selectedLanguage }));
  };

  const changeLanguage = async function(lang) {
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUser().then(async (response) => {
      let userData = response;
      if (userData !== null) {
        let name = userData.name;
        store.dispatch(loginUser({ name }));
        await updateAccounts();
        store.dispatch(getAllInfo())
      }
      dispatch(setLoading(false));
    });
    AsyncStorage.getItem('language').then(storedLanguage => {
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        setSelectedLanguage(storedLanguage);
      }
    });
  }, [navigation, props.url]);

  return (
    <ScrollView>
      <View>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <CustomInput placeholder={t('signin_view.name')} value={name} setValue={setName} />
          <CustomButton text={t('signin_view.signin')} onPress={onSignInPressed} disabled={!name} />
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => changeLanguage(itemValue)}
          >
            {LANGUAGES.map((lang, index) => (
              <Picker.Item key={index} label={lang.label} value={lang.value} />
            ))}
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
  },
  logo: {
    flex: 1,
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: 30,
  },
  pickerContainer: {
    padding: 20,
    marginTop: 30,

  }
});

export default connect(mapStateToProps)(SignInScreen);
