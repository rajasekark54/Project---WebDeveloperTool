import React from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./component/header/Header";
// import WebTool from "./component/webtool/WebTool";
import Login from './container/Login'
import Figma from './container/figma/Figma'


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={Figma} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
