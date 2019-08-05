import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <section className="error-message"> Generic messages here </section>
        <section id="login-form">
          <form>
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
              onClick={this.props.login}
              type="submit"
              className="form-input-button"
            >
              Sign In
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Login;
