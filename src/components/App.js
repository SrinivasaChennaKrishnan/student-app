import React from "react";
import Header from "./Header";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_REQUEST, LOGOUT } from "../actions/actionTypes";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Main props={this.props} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.login.token,
    status: state.login.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: () =>
      dispatch({ type: LOGIN_REQUEST, user: "Admin", password: "password" }),
    logout: () => dispatch({ type: LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
