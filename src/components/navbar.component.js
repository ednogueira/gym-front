import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AuthService from "../services/auth.service";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {

        const style = { flexGrow: 1 }
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={style}>
                            D3X - GYM
                            </Typography>
                        {currentUser ? (
                            <div id="1">
                                <Button color="inherit" href="/profile">
                                    {currentUser.username}
                                </Button>
                                <Button color="inherit" href="/login" onClick={this.logOut}>
                                    LogOut
                                </Button>
                            </div>
                        ) : (
                                <div>
                                <Button color="inherit" href="/login">
                                        Login
                                </Button>
                                    <Button color="inherit" href="/register">
                                        Sign Up
                                </Button>
                                </div>
                            )}
                    </Toolbar>
                </AppBar>
            </div >
        )
    }
}


export default NavBar;