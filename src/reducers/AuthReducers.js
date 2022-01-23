const INITIAL_STATE = {
    user: {},
    auth_token: '',
    uid: '',
    client: '',
    errorFlag: false,
    spinner: false
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'EMAIL_CHANGED':
        return { ...state, email: action.payload };
      case 'PASSWORD_CHANGED':
        return { ...state, password: action.payload };
      case 'LOGIN_FAILED':
        return { ...state, errorFlag: true, password: '', spinner: false };
      case 'LOGIN_USER_SUCCESS':
        return { ...state, ...action.payload, ...INITIAL_STATE,
          user: action.payload.data, auth_token: action.payload["access-token"],
          uid: action.payload.uid, client: action.payload.client };
      case 'LOAD_SPINNER':
        return { ...state, spinner: true };
      default:
        return state;
    }
  };