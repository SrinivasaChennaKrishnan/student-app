import React from "react";
import { Container, Button, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { getStudentData, logIn } from "../actions/logInActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      message: ""
    };
  }
  componentDidMount() {}

  handleChange = (input, type) => {
    let inputValue = input.target.value;
    switch (type) {
      case "username": {
        this.setState({ username: inputValue });
        break;
      }
      case "password": {
        this.setState({ password: inputValue });
        break;
      }
      default: {
        //do nothing
      }
    }
  };

  logIn = () => {
    let loginObj = {};
    loginObj.username = this.state.username;
    loginObj.password = this.state.password;
    let { username, password } = loginObj;
    this.props.logIn(loginObj);
    let inputBox = document.getElementById("password").classList;
    if (
      (username === "admin" && password === "password") ||
      (username !== "admin" && username.length > 0 && password.length > 0)
    ) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ message: "Invalid Credentials !" });
      inputBox.add("input-red");
    }
  };
  closeMessage = () => {
    let inputBox = document.getElementById("password").classList;
    inputBox.remove("input-red");
    this.setState({
      message: ""
    });
  };
  render() {
    let userName = this.state.username;
    let passWord = this.state.password;
    if (this.state.isLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <Container className="home-container">
        <div className="login">
          {this.state.message !== "" && (
            <section className="error-message">
              {this.state.message}{" "}
              <span>
                <img
                  alt="close"
                  className="icon-close"
                  onClick={this.closeMessage}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtxfU96sEkIlztdlExKGNBC_VzPajxKElxhWbLbZc1oyF1P0rKqQ"
                />
              </span>
            </section>
          )}
          <section id="login-form">
            <div className="form-title">
              <span className="slist-font-blue">S</span>
              <span className="slist-font-grey">List</span>
            </div>
            <form>
              <Input
                type="text"
                className="form-inputs"
                id="username"
                label="USERNAME"
                placeholder="USERNAME"
                value={userName}
                onChange={item => this.handleChange(item, "username")}
              />
              <Input
                type="password"
                className="form-inputs"
                id="password"
                placeholder="PASSWORD"
                value={passWord}
                onChange={input => this.handleChange(input, "password")}
              />
              <Input
                type="button"
                value="Sign In"
                onClick={() => this.logIn()}
                className="form-input-button"
              >
                Sign In
              </Input>
            </form>
          </section>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getStudentData: getStudentData,
  logIn: logIn
};
const mapStateToProps = state => {
  const { userObject } = state;
  return {
    studData: state.data,
    user: (userObject || {}).username,
    stateData: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
