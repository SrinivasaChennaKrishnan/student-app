import { put, take, takeEvery, all } from "redux-saga/effects";

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

function* fetchStudentData() {
  const json = yield fetch(
    "https://www.json-generator.com/api/json/get/bVWFSHlGqa?indent=2"
  ).then(response => response.json());
  yield put({ type: "DATA_RECEIVED", json: json });
}

function* getList() {
  const studentList = yield take("SEARCH_STUDENT");
  const searchValue = studentList.searchTerm;
  // const filteredData = studentList.studentList.filter(val =>
  //   val.includes(searchValue)
  // );
  // yield put({ type: "FILTERED_DATA", studentList: filteredData });
  console.log("got filtered list in saga...", searchValue);
}

const searchWatcher = takeEvery("SEARCH_STUDENT", getList);
const actionWatcher = takeEvery("GET_STUDENT_DATA", fetchStudentData);
const logInActionWatcher = takeEvery("LOGIN_REQUEST", loginToHome);

export function* rootSaga() {
  yield all([searchWatcher, actionWatcher, logInActionWatcher]);
}
