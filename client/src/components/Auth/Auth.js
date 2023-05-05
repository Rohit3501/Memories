import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Icon from "./icon";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signin, signup } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./input";
import { useDispatch } from "react-redux";



// for signIn or signUp to work we need state values  so that we can check or save state and accordingly signIn or signOut or Reject . .
// initially all empty

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const clientId =
    "315416875600-s1lb88mfpkpv90dqpisf6s6vktg0dfrk.apps.googleusercontent.com";
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);
  //earlier gapi was not required but now its required for google login otherwise popup_closed_by_user_login was coming
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form contain onSubmit which mean that on signIn or signUp this handleSubmit funtion will handle every thing..
  const handleSubmit = (e) => { 
    e.preventDefault();
    // console.log(formData);
    // browser has default behaviour of refreshing on submit(signUp/signIn) so to prevent that
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  //each one of our input field has function handleChange in order to handle the change
  //whenever form id filled we want to set into actual form data so setForData
  const handleChange = (e) => { 
    //we want all data as it is except for the one which  is changed just now!
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((isSignup)=>!isSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);


  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    //optional chaining operator
    // instead of saying this .. cannot get propertyObl of undefined it will say simply undefined because of using ?.
    const token = res?.tokenId;
    //token last almost for an hour.. if you do not do manual logout
    //finally after successfully google login now we took the token id and profile info
    //an dnow that we dispatching the payload so now we need to create reducer which will handle this properly
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      //with histoty.push() it will redirect us directly  NO it was used earlier now its deprecated
      //instead of history we have useNavigate now
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log("Google sign is unsuccessful");
    console.log(error);
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* this lockoutlinedicon which is for locked out, we imported from material/ui and it is wrapped in avatar to represent it into small circular shape*/}
        <Typography component="h1" variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                {/* <>is fragments used to return multiple elements in react</> */}
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          {/* A cookie policy is a list of all the cookies and trackers in use on your website, made available to visitors as part of your website's broader privacy policy or as a separate subpage. */}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account"
                  : "Don't have an account please sign in"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
