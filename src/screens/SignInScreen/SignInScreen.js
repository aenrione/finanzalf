import React, {useState} from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Logo from "../../../assets/images/react-logo.png"
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton"
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions/LoginAction';


export default function SignInScreen({navigation}) {
  const {height} = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    console.warn("Sign in Pressed")
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  };

  const onSignInFacebook = () => {
    console.warn("Facebook pressed")
  };

  const onSignInGoogle = () => {
    console.warn("Google pressed")
  };

  const onSignInApple = () => {
    console.warn("Apple pressed")
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, {height: height*0.3}]} resizeMode="contain"/>

        <CustomInput placeholder="Username" value={username} setValue={setUsername} />
        <CustomInput placeholder="Password" secureTextEntry value={password} setValue={setPassword} />
        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="tertiary"/>

        <CustomButton
          text="Sign in with Facebook"
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />

        <CustomButton
          text="Sign in with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />

        <CustomButton
          text="Sign in with Apple"
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
        />

        <CustomButton text="Don't have an account?" onPress={onSignUpPressed} type="tertiary"/>
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