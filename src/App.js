import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Container from '@material-ui/core/Container';



import NavBar from "./components/navbar.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
//import Home from "./components/home.component";
import Profile from "./components/profile.component";

//import BoardUser from "./components/board-user.component";
//import BoardModerator from "./components/board-moderator.component";
//import BoardAdmin from "./components/board-admin.component";

class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <NavBar />
          <Container>
            <Switch>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;