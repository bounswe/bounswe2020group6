const initialState = {
  token: null,
};

const authReducer = (state, action) => {
  return {
    ...state,
    token: action.token,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return authReducer(state, action);
    default:
      return state;
  }
}
