import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Entry from "./Entry";
import "../styles.css";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

class Main extends React.Component {
  render() {
    let mainProps = this.props;
    return (
      <main>
        <Switch>
          <Route exact path="/" render={props => <Entry props={mainProps} />} />
          <Route
            exact
            path="/home"
            render={props => <Home props={mainProps} />}
          />
          <Route
            props={mainProps}
            path="/login"
            render={props => <Login props={mainProps} />}
          />
          <Route
            exact
            path="/about"
            render={props => <About props={mainProps} />}
          />
        </Switch>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  studentData: state.data
});
export default connect(
  mapStateToProps,
  null
)(Main);
