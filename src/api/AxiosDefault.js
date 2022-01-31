import axios from 'axios';
import store from '../store'
import { BASE_URL } from "@env"

const setAxiosDefaults = function(){
  console.log(BASE_URL)
  const baseUrl = BASE_URL || 'http://localhost:3000'
  axios.defaults.baseURL = baseUrl
  axios.interceptors.request.use(function (config) {
    console.warn(baseUrl)
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
