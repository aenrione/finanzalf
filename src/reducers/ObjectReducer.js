const INITIAL_STATE = {
  selected_transaction: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_TRANSACTION':
      return { ...state, selected_transaction: action.payload };
    default:
      return state;
  }
};

