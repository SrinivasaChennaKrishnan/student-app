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

function search(studObj, searchTerm) {
  let matches = [],
    i,
    key;

  for (i = studObj.length; i--; )
    for (key in studObj[i])
      if (
        studObj[i].hasOwnProperty(key) &&
        studObj[i][key].indexOf(searchTerm) > -1
      )
        matches.push(studObj[i]);
  return matches;
}

function* getList() {
  const studentObj = yield take("SEARCH_STUDENT");
  const searchValue = studentObj.searchTerm;
  const studentList = studentObj.studentList;
  const filteredData = search(studentList, searchValue);
  yield put({ type: "FILTERED_DATA", studentList: filteredData });
}

const searchWatcher = takeEvery("SEARCH_STUDENT", getList);
const actionWatcher = takeEvery("GET_STUDENT_DATA", fetchStudentData);
const logInActionWatcher = takeEvery("LOGIN_REQUEST", loginToHome);

export function* rootSaga() {
  yield all([searchWatcher, actionWatcher, logInActionWatcher]);
}
