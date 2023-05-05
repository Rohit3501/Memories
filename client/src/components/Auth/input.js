import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// IF WE WANT SOME INPUT TO TAKE ONLY HALF THE WIDTH THEN WE NEED A SPECIAL PROP,SO THAT WE WILL COME TO KNOW WHEN IT SHOULD TAKE LESS WIDTH, WHICH WILL SAY HALF AND IF IT IS TRUE THEN WE WILL KEEP SM=6 ELSE SM=12

const input = ({
  name,
  handleChange,
  label,
  type,
  half,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        // TO SHOW PASSWORD WHILE TYPING
        InputProps={
          name === "password" ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "Password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }:null
        }
      />
    </Grid>
  );
};

export default input;
