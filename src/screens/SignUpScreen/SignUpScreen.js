import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { registerUser } from 'src/actions/LoginAction';
import store from 'src/store';
import Text from '@/Text';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUpPressed = () => {
    store.dispatch(registerUser({ name, email, password, confirmPassword }));
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title} text={'Create an account'} />
        <CustomInput placeholder="Name" value={name} setValue={setName} />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          secureTextEntry
          value={password}
          setValue={setPassword}
        />
        <CustomInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <CustomButton text="Register" onPress={onSignUpPressed} />

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

        <CustomButton
          text="Already have an account? Sign in!"
          onPress={onSignInPressed}
          type="tertiary"
        />
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
    marginBottom: 10,
  },
});
