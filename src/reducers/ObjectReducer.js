const INITIAL_STATE = {
  selected_transaction: null,
  queryClient: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_TRANSACTION':
      return { ...state, selected_transaction: action.payload };
    case 'SET_QUERY_CLIENT':
      return { ...state, queryClient: action.payload };
    default:
      return state;
  }
};
