import axios from 'axios';
import store from '../store'
import { BASE_URL } from "@env"

const setAxiosDefaults = function(){
  const baseUrl = BASE_URL || 'http://localhost:3000'
  axios.defaults.baseURL = baseUrl
  axios.interceptors.request.use(function (config) {
      const state = store.getState()
      const accessToken = state["access-token"]
      const uid = state.uid
      const client = state.client
      config.headers['access-token'] =  accessToken;
      config.headers['uid'] =  uid;
      config.headers['client'] =  client;

      return config;
  });
}

export { setAxiosDefaults };
