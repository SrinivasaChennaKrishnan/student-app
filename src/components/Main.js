import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "../styles.css";

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route props={this.props} exact path="/home" component={Home} />
          <Route props={this.props} path="/login" component={Login} />
        </Switch>
      </main>
    );
  }
}

export default Main;
