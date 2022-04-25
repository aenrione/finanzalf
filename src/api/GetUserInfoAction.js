/*global fetch:false*/
import axios from 'axios'
import * as NavigationService from '../navigation/navigationService';


export const getInfo = ({ email, setInfo }) => {
  return (dispatch) => {
    axios
      .get('http://localhost:3000/api/v1/user', { email })
      .then((response) => {
        console.log(response)
        if (response.status === 401) {
          console.log('AUTHENTICATION ERROR!!');
        } else {
          console.log(response.data)
        }
      }
      );
  }
};
