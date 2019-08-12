export const getStudentData = pageSize => {
  return { type: "GET_STUDENT_DATA", payload: pageSize };
};

export const logIn = loginObj => {
  return { type: "LOGIN_REQUEST", userObject: loginObj };
};

export const searchStudent = searchValue => {
  return { type: "SEARCH_STUDENT", searchTerm: searchValue };
};
