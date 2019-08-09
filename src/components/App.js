import React from "react";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Main props={this.props} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
