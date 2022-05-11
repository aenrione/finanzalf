import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../../assets/images/wallet.png"
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import { loginUser, loginRememberedUser } from '../../actions/LoginAction';
import store from '../../store'


const getToken = async function() {
  try {
    let userData = await AsyncStorage.getItem("userData");
    let data = JSON.parse(userData);
    return data
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

export default function SignInScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getToken().then(response => {
      let userData = response
      if (userData !== null) {
        store.dispatch(loginRememberedUser({ userData }))
      }
    })
  });


  const onSignInPressed = async () => {
    store.dispatch(loginUser({ email, password })
    )
  };

  // const onForgotPasswordPressed = () => {
  //   navigation.navigate('ForgotPassword')
  // };

  // const onSignInFacebook = () => {
  //   console.warn("Facebook pressed")
  // };

  // const onSignInGoogle = () => {
  //   console.warn("Google pressed")
  // };

  // const onSignInApple = () => {
  //   console.warn("Apple pressed")
  // };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" secureTextEntry value={password} setValue={setPassword} />
        <CustomButton text="Sign In" onPress={onSignInPressed} />
        {/* <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="tertiary" /> */}

        {/* <CustomButton */}
        {/*   text="Sign in with Facebook" */}
        {/*   onPress={onSignInFacebook} */}
        {/*   bgColor="#E7EAF4" */}
        {/*   fgColor="#4765A9" */}
        {/* /> */}

        {/* <CustomButton */}
        {/*   text="Sign in with Google" */}
        {/*   onPress={onSignInGoogle} */}
        {/*   bgColor="#FAE9EA" */}
        {/*   fgColor="#DD4D44" */}
        {/* /> */}

        {/* <CustomButton */}
        {/*   text="Sign in with Apple" */}
        {/*   onPress={onSignInApple} */}
        {/*   bgColor="#e3e3e3" */}
        {/*   fgColor="#363636" */}
        {/* /> */}

        <CustomButton text="Don't have an account?" onPress={onSignUpPressed} type="tertiary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 30
  },
  logo: {
    flex: 1,
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: 30
  }
});
