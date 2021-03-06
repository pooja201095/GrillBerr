import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import {connect } from 'react-redux'
import {signOut } from '../../store/actions/authAction';
import SignedOutLinks from './SignedOutLinks';
import SigninLinks from './SigninLinks';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "black",
  },
  menuButton: {
    color:'burlywood',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    textTransform:'none',
    padding:'0px',
    fontSize:'30px',
    fontWeight:'600',
    color: "burlywood",
    fontFamily: "'Lobster', cursive",
    backgroundColor:'transparent'
},
link:{
    textDecoration: 'none',
}
}));

function NavBar(props) {
  const classes = useStyles();
  const {auth} = props;

  const links = !auth.uid ? 
  <SignedOutLinks/> :
 <SigninLinks {...props}/>

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="transparent" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
         <OutdoorGrillIcon fontSize="large"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>
                <Button color="inherit" className={classes.btn} >
                    GrillBer
    </Button>
            </Link>
          </Typography>
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)

