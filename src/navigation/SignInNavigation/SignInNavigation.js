import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from '../MainNavigation';
import * as NavigationService from '../navigationService';

const Stack = createNativeStackNavigator();

import SignInScreen from 'src/screens/SignInScreen';
import SignUpScreen from 'src/screens/SignUpScreen';
import SettingScreen from 'src/screens/SignInScreen/SettingScreen';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen';

export default function SignInNavigation() {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignSettings"
          component={SettingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainNavigation"
          component={MainNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
