/*global fetch:false*/
import axios from 'axios'


export const emailChanged = (email) => {
    return {
      type: 'EMAIL_CHANGED',
      payload: email
    };
  };
 
  export const passwordChanged = (password) => {
    return {
      type: 'PASSWORD_CHANGED',
      payload: password
    };
  };
  
  export const loginUser = ({ email, password }) => {
    console.log("LOGIN USER")
    return (dispatch) => {
      dispatch({
        type: 'LOAD_SPINNER'
      });

      axios
      .post('http://localhost:3001/api/v1/auth/sign_in', { email, password })
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
            }
          }
      );
  }
};