/*global fetch:false*/
import axios from 'axios'
import * as NavigationService from '../navigation/navigationService';

  export const loginUser = ({ email, password }) => {
    console.log("LOGIN USER")
    return (dispatch) => {
      dispatch({
        type: 'LOAD_SPINNER'
      });

      axios
      .post('/api/v1/auth/sign_in', { email, password })
      .then((response) => {
          if (response.status === 401) {
            console.log('AUTHENTICATION ERROR!!');
            dispatch({
              type: 'LOGIN_FAILED'
            });
          } else {
            let data = response.data
            data.client = response.headers.client
            data.uid = response.headers.uid
            data['access-token'] = response.headers['access-token']
            console.log('SUCCESS!!');
            dispatch({
              type: 'LOGIN_USER_SUCCESS',
              payload: data
            });
              axios
              .get('/api/v1/user/capabilities')
              .then((response) => {
                  if (response.status !== 401) {
                   console.log(response.data);
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
    console.log("REGISTER USER")
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
            console.log('AUTHENTICATION ERROR!!');
            dispatch({
              type: 'LOGIN_FAILED'
            });
          } else {
            let data = response.data
            data.client = response.headers.client
            data.uid = response.headers.uid
            data['access-token'] = response.headers['access-token']
            console.log('SUCCESS!!');
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
  export const setLoading = ({ loading=true }) => {
    console.log("Set Loading", loading)
    return (dispatch) => {
      if (loading){
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

  export const getCapabilities = () => {
    console.log("GET CAPABILITIES")
    return (dispatch) => {

      axios
      .get('/api/v1/user/capabilities')
      .then((response) => {
            console.log(response.data)
          }
      );
  }
};
