import React, { Component } from "react";
import "./App.css";
import Container from '@material-ui/core/Container';
import MenuBar from "./components/menu-component";
import AppRouter from "./components/router-component";

//import BoardUser from "./components/board-user.component";
//import BoardModerator from "./components/board-moderator.component";
//import BoardAdmin from "./components/board-admin.component";

class App extends Component {

  render() {

    return (
      <div>
        <MenuBar/>
          <Container>
            <AppRouter />
          </Container>
      </div>
    );
  }
}

export default App;