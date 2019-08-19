import { LOGGED_IN, LOGGED_OUT, LOGIN_ERROR } from "../statusTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_STUDENT_DATA":
      return { ...state, loading: true };
    case "DATA_RECEIVED":
      return { ...state, data: action.json, loading: false };
    case "SEARCH_STUDENT":
      return { ...state };
    case "FILTERED_DATA":
      return { ...state, loading: false, filteredData: action.studentList };
    case "LOGIN_REQUEST":
      return { ...state, userObject: action.userObject };
    case "LOGIN_FAILED":
      return { ...state, message: action.message, status: LOGIN_ERROR };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userObject: action.userObject,
        status: LOGGED_IN,
        loading: false
      };
    case "LOGOUT":
      return { ...state, status: LOGGED_OUT };
    case "LOGIN_ERROR":
      return { ...state, status: LOGIN_ERROR };
    default:
      return state;
  }
};
export default reducer;
