import * as types from "./actionTypes";

export function loggedIn() {
  return { type: types.LOGIN_SUCCESS };
}
