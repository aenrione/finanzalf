import axios from 'axios';
import store from '../store'
import { showMessage } from "react-native-flash-message";

const setAxiosDefaults = function() {
  const baseUrl = process.env.API_URL || 'http://localhost:3000'
  axios.defaults.baseURL = baseUrl
  console.log(baseUrl)
  axios.interceptors.request.use(function(config) {
    const state = store.getState().auth_reducer
    const accessToken = state["access-token"]
    const uid = state.uid
    const client = state.client
    config.headers['access-token'] = accessToken;
    config.headers['uid'] = uid;
    config.headers['client'] = client;

    return config;
  });
  axios.interceptors.response.use(
    res => res,
    err => {
      if (err.response.data) {
        if (err.response.data.errors) {
          if (err.response.status === 400) {
            var msg = JSON.stringify(err.response.data.errors)
          } else {
            var msg = (err.response.data.errors.full_messages || err.response.data.errors)
          }
          showMessage({
            message: `Error: ${msg}`,
            type: "danger",
          });
        } else {
          showMessage({
            message: `${err.response.data.message}: ${err.response.data.detail}`,
            type: "danger",
          });
        }
      }
      return Promise.reject(err.response);
    }
  )
}

export { setAxiosDefaults };
