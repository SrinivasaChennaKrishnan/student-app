import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "../styles.css";
import { connect } from "react-redux";

class Main extends React.Component {
  render() {
    console.log("props from mainjs......", this.props);
    let mainProps = this.props;
    return (
      <main>
        <Switch>
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
