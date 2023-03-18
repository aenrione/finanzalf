import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from 'assets/images/wallet.png';
import CustomInput from '@/CustomInput/CustomInput';
import CustomButton from '@/CustomButton';
import { loginUser, loginRememberedUser, changeUrl } from 'src/actions/LoginAction';
import store from 'src/store';
// import CustomIndicator from '@/CustomIndicator';

const getToken = async function () {
  try {
    let userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);
    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getUrl = async function () {
  try {
    let data = await AsyncStorage.getItem('baseUrl');
    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getValue = function () {
  const state = store.getState().auth_reducer;
  if (state.baseUrl !== '' && state.baseUrl !== 'https://') {
    return state.baseUrl;
  }
  return 'https://';
};
const mapStateToProps = function (state) {
  return {
    spinner: state.auth_reducer.spinner,
    url: state.auth_reducer.baseUrl,
  };
};

export function SignInScreen({ navigation, ...props }) {
  const state = store.getState().auth_reducer;
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUrl, setUrl] = useState(getValue());
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    getToken().then((response) => {
      let userData = response;
      if (userData !== null) {
        store.dispatch(loginRememberedUser({ userData }));
      }
    });
    getUrl().then((response) => {
      let url = response;
      if (url !== null && url !== '') {
        setUrl(response);
        setButtonStatus(true);
        if (props.url !== url) {
          store.dispatch(changeUrl({ url }));
        }
      }
    });
    const unsubscribe = navigation.addListener('focus', () => {
      let temp_url = getValue();
      setUrl(temp_url);
      if (temp_url === 'https://') {
        setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
    });
    return unsubscribe;
  }, [navigation, props.url, state.baseUrl]);

  const onSignInPressed = async function () {
    await store.dispatch(loginUser({ email, password }));
  };

  const updateUrl = async () => {
    // store.dispatch(changeUrl({ url: currentUrl }))
    navigation.navigate('SignSettings');
  };

  // const onForgotPasswordPressed = () => {
  //   navigation.navigate('ForgotPassword')
  // };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Password"
            secureTextEntry
            value={password}
            setValue={setPassword}
          />
          <CustomButton text="Sign In" onPress={onSignInPressed} disabled={!buttonStatus} />
          {!buttonStatus && (
            <CustomButton text="Server URL can't be empty" fgColor={'#DD4D44'} type="tertiary" />
          )}

          <CustomButton text="Don't have an account?" onPress={onSignUpPressed} type="tertiary" />
        </View>
        <CustomButton text="Server URL" type="tertiary" />
        <CustomButton text={currentUrl} bgColor="#e3e3e3" fgColor="#363636" onPress={updateUrl} />
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
});

export default connect(mapStateToProps)(SignInScreen);
