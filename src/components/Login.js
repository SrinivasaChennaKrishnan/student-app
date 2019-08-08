import React from "react";
import { getStudentData } from "../actions/logInActions";
import { connect } from "react-redux";
class Login extends React.Component {
  render() {
    console.log("got data in login component....?", this.props);
    return (
      <div className="login">
        <section className="error-message"> Generic messages here </section>
        <section id="login-form">
          <div className="form-title">
            <span className="slist-font-blue">S</span>
            <span className="slist-font-grey">List</span>
          </div>
          <input
            type="text"
            className="form-inputs"
            id="username"
            label="USERNAME"
            placeholder="USERNAME"
          />
          <input
            type="password"
            className="form-inputs"
            id="password"
            placeholder="PASSWORD"
          />
          <button
            onClick={this.props.getStudentData}
            className="form-input-button"
          >
            Sign In
          </button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getStudentData: getStudentData
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
