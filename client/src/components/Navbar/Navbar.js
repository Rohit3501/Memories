import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation} from "react-router-dom";
import * as actionType from '../../constants/actionTypes';
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";


const Navbar = () => {

  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));  
  const classes = useStyles();

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const location=useLocation();

  
  //to get something from local storage we use this JSON.parse(localStorage.getItem(nsme of item));  


  const logout=()=>{
    dispatch({type:actionType.LOGOUT});

    navigate("/auth");
    setUser(null);


  };


//  it's not automatically refreshing so in order to do that we are going to use useEffect 

// const token = user?.token;
// if(token)
// {
//   const decodeToken=decode(token);
//   if(decodeToken.exp*1000<new Date().getTime())logout();
// }  
 useEffect(()=>{
//   //later we will use JWT(JSON web tokens ) while manual signUp.. but now we are using google login 
// //this useEffect and location we needed  bcz that logout button and user profile was not updating itself even with navigate("/") home was coming but taskbar was not updating 
setUser(JSON.parse(localStorage.getItem('profile')));
 }, [location]);


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    {/* Link to so that if someOne click at image then also it renders to home page */}
      <Link to="/"  className={classes.brandContainer}>
        <img src={memoriesLogo} alt="icon" height="45px" / >      
        <img className={classes.image} src={memoriesText} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {/*  IF A USER IS LOGGED IN THEN SOME SET OF OPERATION WILL BE PERFORMED ELSE SOME OTHER SET OF OPERATIONS WILL BE PERFOEMRD */}
        {user?.result?(
          <div className={classes.profile}>
          {/* Avatar IS SIMPLY GOING TO SHOW A CIRCULAR IMAGE OF HOW A USER LOOKS LIKE OR THE FIRST LETTER OF USER NAME.. */}
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
        {user?.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
          ) : (
            <>
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          &nbsp;&nbsp;
          <Button component={Link} to="/" variant="contained" color="primary">Home</Button>
            </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
// []=dependency array