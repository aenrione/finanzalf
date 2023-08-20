import * as NavigationService from 'src/navigation/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const storeUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.warn(e);
  }
};

export const loginUser = ({ name }) => {
  return (dispatch) => {
    if (name) {
      // dispatch({
      //   type: 'LOAD_SPINNER',
      // });
      const user = { name: name }
      storeUser(user);
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: user,
      });
      NavigationService.navigate('MainNavigation');
      // dispatch({
      //   type: 'STOP_SPINNER',
      // });

    } else {
      storeUser(null);
      dispatch({
        type: 'REMOVE_SESSION',
        payload: {},
      });
      NavigationService.navigate('SignIn');

    }
  };
};

export const setLoading = (loading = true) => {
  return async (dispatch) => {
    if (loading) {
      // Do some async operation if needed
      dispatch({
        type: 'LOAD_SPINNER',
      });
      // NavigationService.navigate('Loading');
    } else {
      // Do some async operation if needed
      dispatch({
        type: 'STOP_SPINNER',
      });
      // NavigationService.navigate('Loading');
    }
  };
};

export const logoutUser = (name) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER',
    });

    storeUser(null);
    dispatch({
      type: 'REMOVE_SESSION',
      payload: {},
    });
    NavigationService.navigate('SignIn');
    // showMessage({
    //   message: `Bye: ${name}`,
    //   type: 'success',
    // });
    dispatch({
      type: 'STOP_SPINNER',
    });
  };
};
