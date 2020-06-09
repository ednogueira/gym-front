import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AuthService from "../services/auth.service";
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import {withRouter} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  typography: {
    flexGrow: 1,
    marginLeft: 50
    
    },

  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: "auto",
    marginLeft: -12
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


// export default function MiniDrawer() {
const MenuBar = props => {  
  const { history} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    const home = () => history.push('/');

    const itemsList = [
      {
        text: "Clientes",
        icon: <PersonIcon />,
        onClick: () => history.push('/clientes')
      },
      {
        text: "Instrutores",
        icon: <SchoolIcon />,
        onClick: () => history.push("/")
      },
      {
        text: "Aulas",
        icon: <FitnessCenterIcon />,
        onClick: () => history.push("/")
      }
    ];


  const [menu, setMenu] = useState();
  const [showRecepcionistaBoard, setShowRecepcionistaBoard] = useState(false);
  const [showGerenteBoard, setShowGerenteBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const logOut = useCallback(
      () => {
          AuthService.logout();
      },
      [],
  );

    useEffect(() => 
        {
        const user = AuthService.getCurrentUser();
            if (user) 
                {
                    setCurrentUser(user);
                    setShowRecepcionistaBoard(user.roles.includes("ROLE_RECEPCIONISTA"));
                    setShowGerenteBoard(user.roles.includes("ROLE_GERENTE"));
                }
        },[]);

  return (
    
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.typography} variant="h5" noWrap >
            D3X - GYM
          </Typography>
          {currentUser ? (
            <div margin-right="auto">
                <Button color="inherit" href="/profile">
                    {currentUser.username}
                </Button>
                <Button className="toolbarButtons" color="inherit" href="/login" onClick={logOut}>
                    LogOut
                </Button>
                </div>
            ) : (
                <div margin-left="auto">
                <Button className="toolbarButtons" color="inherit" href="/login">
                    Login
                </Button>
                <Button className="toolbarButtons" color="inherit" href="/register">
                    Sign Up
                </Button>
                </div>
            )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {['Home'].map((text, index) => (
            <ListItem button key={text} onClick={home}>
                <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {(showRecepcionistaBoard || showGerenteBoard) && (
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
                      <ListItem button key={text} onClick={onClick}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                      </ListItem>
            );
          })}
        </List>
        )}
        <Divider />
        {showGerenteBoard && (
        <List>
          {['Relatórios','Avaliação Física', 'Administração'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>
                    {index === 0 && <AssessmentIcon />}
                    {index === 1 && <FavoriteIcon />}
                    {index === 2 && <BuildIcon />}
                </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        </Typography>
      </main>
    </div>
  );
}
export default withRouter(MenuBar);