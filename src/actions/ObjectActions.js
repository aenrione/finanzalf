/*global fetch:false*/
import * as NavigationService from '../navigation/navigationService';

export const changeTransaction = ({ transaction_id }) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_TRANSACTION',
      payload: transaction_id
    });

    NavigationService.navigate("Transaction")
  }
};

