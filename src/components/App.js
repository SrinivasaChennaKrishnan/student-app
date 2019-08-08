import React from "react";
import Header from "./Header";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

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

export default App;
