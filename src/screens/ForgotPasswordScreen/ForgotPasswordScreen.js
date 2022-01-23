import React, {useState} from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput"
import CustomButton from "../../components/CustomButton/CustomButton"


export default function ForgotPasswordScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = () => {
    console.warn("Sign Up")
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password pressed")
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

  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput placeholder="Username" value={username} setValue={setUsername} />
        <CustomInput placeholder="Password" secureTextEntry value={password} setValue={setPassword} />
        <CustomButton text="Register" onPress={onSignUpPressed} />
        <CustomButton text="Back to Sign in" onPress={onSignInPressed} type="tertiary"/>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});