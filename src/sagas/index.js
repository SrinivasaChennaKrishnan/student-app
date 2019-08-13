import { put, take, takeEvery, all, fork } from "redux-saga/effects";

function* loginToHome() {
  try {
    const loginObject = yield take("LOGIN_REQUEST");
    const { username, password } = loginObject.userObject;
    if (
      (username === "admin" && password === "password") ||
      (username !== "admin" && username.length > 0 && password.length > 0)
    ) {
      yield put({ type: "LOGIN_SUCCESS", userObject: loginObject.userObject });
    } else {
      yield put({ type: "LOGIN_FAILED", message: "Invalid Credentials..!" });
    }
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  }
}

function handleData(obj, n) {
  return Object.keys(obj)
    .sort()
    .slice(0, n)
    .reduce(function(data, current) {
      data[current] = obj[current];
      return data;
    }, []);
}
function* fetchStudentData() {
  const json = yield fetch(
    "https://www.json-generator.com/api/json/get/bVWFSHlGqa?indent=2"
  ).then(response => response.json());
  const getData = yield take("GET_STUDENT_DATA");
  let studentData = handleData(json, getData.payload);
  yield put({ type: "DATA_RECEIVED", json: studentData });
}

const actionWatcher = takeEvery("GET_STUDENT_DATA", fetchStudentData);
const logInActionWatcher = takeEvery("LOGIN_REQUEST", loginToHome);

export function* rootSaga() {
  yield all([actionWatcher, logInActionWatcher]);
}
