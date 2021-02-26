import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import { Button } from 'react-bootstrap';

import { checkDM, checkComment, checkFollow} from "./../api/DashboardFunction";

import { useHistory } from "react-router";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  menu: {
    color: '#fff',
    marginRight: '15px',
    '&:hover': {
      color: '#42f59b'
    }
  },
  faq: {
    color: '#fff',
    marginRight: '20px',
    marginTop: '4px',
    '&:hover': {
      color: '#42f59b'
    }
  }
}));

const Navbar = ({handleDrawerOpen, hasHamburger, open, hanldeModalState}) => {
    const classes = useStyles();
    const token = localStorage.usertoken;
    const history = useHistory();
    

    function login (){
      window.location.href = "/login";
    }

    function logout () {
      console.log("logout")
      //call api to update login status
      const token = localStorage.usertoken;
      console.log("tt", token)
      localStorage.clear();
      window.location.href = "/login";
    }

    function commentReply() {
        console.log("comment reply")
        history.push({pathname: '/comment-inbox'});
    }

    function dmReply() {
        history.push({pathname: '/dm-inbox'});
    }

    function handleCheckDM () {
        console.log("check dm clicked")
        checkDM().then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
    }

    function handleCheckFollow () {
        console.log("check follow clicked")
        checkFollow().then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
    }

    function handleCheckComment () {
        checkComment().then((res) => {
            if (res.code == "failed") {
                alert(res.message)
            }
        })
    }

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{backgroundColor: "darkgreen"}}>
            <Toolbar className={classes.toolbar}>
            {hasHamburger && <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>}
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {/* Dashboard */}
            </Typography>
          
            {localStorage.usertoken ? 
              <div>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ commentReply }>
                  Comment
                </Typography>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ dmReply }>
                  DM
                </Typography>
                <Button className={`${classes.menu} float-left`} variant="primary" onClick = {handleCheckDM}>Check Coming DM</Button>
                <Button className={`${classes.menu} float-left`} variant="primary" onClick = {handleCheckComment}>Check Comment Reply</Button>
                <Button className={`${classes.menu} float-left`} variant="primary" onClick = {handleCheckFollow}>Check Follow Back</Button>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-right`} color="inherit" onClick={ logout }>
                  Logout
                </Typography>
              </div> :
              <div>
                {/* <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ () => { window.location.href = "/register"} }>
                  Signup
                </Typography> */}
                  <Typography component="h1" variant="h6" className={`${classes.menu} float-right`} color="inherit" onClick={ login }>
                  Login
                </Typography>
              </div>
          }
           </Toolbar>
      </AppBar>
    )
}

export default Navbar
