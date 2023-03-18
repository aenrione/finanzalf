const INITIAL_STATE = {
  user: {},
  auth_token: '',
  uid: '',
  client: '',
  errorFlag: false,
  spinner: false,
  userCapabilities: {},
  baseUrl: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_URL':
      return { ...state, baseUrl: action.payload };
    case 'CHANGE_CAPABILITIES':
      return { ...state, userCapabilities: action.payload };
    case 'LOGIN_FAILED':
      return { ...state, errorFlag: true, spinner: false };
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        ...action.payload,
        user: action.payload.data,
        auth_token: action.payload['access-token'],
        uid: action.payload.uid,
        client: action.payload.client,
      };
    case 'REMOVE_SESSION':
      return {
        ...state,
        ...action.payload,
        user: null,
        auth_token: null,
        uid: null,
        client: null,
      };
    case 'LOAD_SPINNER':
      return { ...state, spinner: true };
    case 'STOP_SPINNER':
      return { ...state, spinner: false };
    default:
      return state;
  }
};
