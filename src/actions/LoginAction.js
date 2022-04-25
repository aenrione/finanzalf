/*global fetch:false*/
import axios from 'axios'
import * as NavigationService from '../navigation/navigationService';

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER'
    });

    axios
      .post('/api/v1/auth/sign_in', { email, password })
      .then((response) => {
        if (response.status === 401) {
          dispatch({
            type: 'LOGIN_FAILED'
          });
        } else {
          let data = response.data
          data.client = response.headers.client
          data.uid = response.headers.uid
          data['access-token'] = response.headers['access-token']
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data
          });
          axios
            .get('/api/v1/user/capabilities')
            .then((response) => {
              if (response.status !== 401) {
                dispatch({
                  type: 'CHANGE_CAPABILITIES',
                  payload: response.data
                });
              }
            }
            );
          NavigationService.navigate("MainNavigation")
        }
      }
      );
  }
};

export const registerUser = ({ name, email, password, confirmPassword }) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER'
    });


    axios
      .post('/api/v1/auth', {
        email: email,
        name: name,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then((response) => {
        if (response.status === 401) {
          dispatch({
            type: 'LOGIN_FAILED'
          });
        } else {
          let data = response.data
          data.client = response.headers.client
          data.uid = response.headers.uid
          data['access-token'] = response.headers['access-token']
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data
          });
          NavigationService.navigate("MainNavigation")
        }
      }
      );
  }
};
export const setLoading = ({ loading = true }) => {
  return (dispatch) => {
    if (loading) {
      dispatch({
        type: 'LOAD_SPINNER'
      });
    } else {
      dispatch({
        type: 'STOP_SPINNER'
      });

    }
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER'
    });

    axios
      .delete('/api/v1/auth/sign_out')
      .then((response) => {
        if (response.status === 401) {
          dispatch({
            type: 'LOGOUT_FAILED'
          });
        } else {
          let data = {}
          data.uid = ''
          data.client = ''
          data['access-token'] = ''
          dispatch({
            type: 'LOGOUT_USER_SUCCESS',
            payload: data
          });
          NavigationService.navigate("SignIn")
        }
      }
      );
  }
};

export const getCapabilities = () => {
  return (dispatch) => {

    axios
      .get('/api/v1/user/capabilities')
      .then((response) => {
        dispatch({
          type: 'CHANGE_CAPABILITIES',
          payload: response.data
        });
      }
      );
  }
};
