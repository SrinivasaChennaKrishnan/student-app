import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN_ERROR,
  LOGIN_CANCELLED
} from "../statusTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_STUDENT_DATA":
      return { ...state, loading: true };
    case "DATA_RECEIVED":
      return { ...state, data: action.json, loading: false };
    case "LOGIN_SUCCESS":
      return { ...state, status: LOGGED_IN };
    case "LOGOUT":
      return { ...state, status: LOGGED_OUT };
    case "LOGIN_ERROR":
      return { ...state, status: LOGIN_ERROR };
    case "LOGIN_CANCELLED":
      return { ...state, status: LOGIN_CANCELLED };
    default:
      return state;
  }
};
export default reducer;
