import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import jwt_decode from "jwt-decode";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import CommentIcon from '@material-ui/icons/Comment';
import MessageIcon from '@material-ui/icons/Message';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MenuIcon from '@material-ui/icons/Menu';
import { Button, DropdownButton,Dropdown } from 'react-bootstrap';

import { checkDM, checkComment, checkFollow, clearNotification, setBot} from "./../api/DashboardFunction";

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

const Navbar = ({handleDrawerOpen, hasHamburger, open, hanldeModalState, dmNotification, commentNotification, clearNotification, setBot}) => {
    const classes = useStyles();
    const token = localStorage.usertoken;
    const history = useHistory();
    const [title, setTitle] = useState("Bot List");
    

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
        clearNotification("comment")
        history.push({pathname: '/comment-inbox'});
    }

    function dmReply() {
        clearNotification("dm")
        history.push({pathname: '/dm-inbox'});
    }

    function goToReport() {
      history.push({pathname: '/report'})
    }

    function GoToHome() {
        window.location.href = "/";
    }

    function handleBot(botIndex) {
      console.log("bot selected:", botIndex)
      setTitle(`Bot ${botIndex}`)
      //here update the redux state
      setBot(botIndex)
    }

    const botDropDown = [];
    for (let i = 0; i < 10; i++) {
      botDropDown.push(<Dropdown.Item as="button" onClick={ () => handleBot(i+1) }>Bot{i+1}</Dropdown.Item>)
    }

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{backgroundColor: "darkgreen"}}>
            <Toolbar className={classes.toolbar}>
            {localStorage.usertoken ? 
              <div style={{width:"100%"}}>
                <DropdownButton className={`${classes.menu} float-left`} id="bot_list" title={title}>
                  <Dropdown.ItemText>Select The Bot!</Dropdown.ItemText>
                  {botDropDown}
                </DropdownButton>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ GoToHome }>
                  <HomeIcon fontSize="large"/>
                </Typography>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ commentReply }>
                {
                    commentNotification && 
                    <Badge color="error" badgeContent=" " variant="dot">
                        <CommentIcon fontSize="large"/>
                    </Badge>
                }
                {
                    !commentNotification && <CommentIcon fontSize="large"/>
                }
                
                </Typography>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ dmReply }>
                {
                    dmNotification && 
                    <Badge color="error" badgeContent=" " variant="dot">
                         <MessageIcon fontSize="large"/>
                    </Badge>
                }
                {
                    !dmNotification && <MessageIcon fontSize="large"/>
                }
                </Typography>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-left`} color="inherit" onClick={ goToReport }>
                  <AssessmentIcon fontSize="large"/>
                </Typography>
                <Typography component="h1" variant="h6" className={`${classes.menu} float-right`} color="inherit" onClick={ logout }>
                  <ExitToAppIcon fontSize="large"/>
                </Typography>
              </div> :
              <div style={{width:"100%"}}>
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


const mapStateToProps = state => ({
    dmNotification: state.dmNotification,
    commentNotification: state.commentNotification
});

const mapDispatchToProps = dispatch => bindActionCreators({
    clearNotification,
    setBot
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar)