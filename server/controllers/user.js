import bcrypt from "bcryptjs";
//bcrypt is used to hash password to have confidentiality with user password
import jwt from "jsonwebtoken";
//this is a safe way to store user in browser for some time(hour--weeks)..
//here we have to use user model which we have not created so go to models and create them....

import User from "../models/user.js";

//NOW QUESTION IS HOW TO WRITE LOGIC FOR SIGNiN AND SIGNuP
const secret='test';
export const signin = async (req, res) => {
  // for signIn we need email and password
  // whenever we have a post request we get all data from req.body
  //if we are signIn we first have to find the existing user.. who is trying to login and for that we will get email and password using req.body
  const { email, password } = req.body;
  try {
    //find corresponding user from User database..
    const existingUser = await User.findOne({ email });    
    if (!existingUser)
    {

      return res.status(404).json({ message: "user does not exist" });
    }
    //since we are storing password in decrypted form so while fetching or comparing we must decrypt it..        
    // hash(1926): "$2a$12$fbGcU4XpZziprZiZcqylHeG88s4V9Ibi5DND9qX5/UJOFfSmxivF2"        
    const isPasswordCorrect =  bcrypt.compareSync(      
      password,existingUser.password.toString()
    );  
    console.log(isPasswordCorrect);
    //if password is not correct
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //else
    // in sign we have to provide all information that we want to store in jwt
    //this test here is secret key that nobody else should know!!!
    //here we are simply saying test
    //last section is for options here we are only using expiresIn..
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    //500 means an undefined server error
    res.status(500).json({ message: "something went wrong !" });
  }
};

//this is all about signIn controller

//signUp is important in order to add user to database..
export const signup = async (req, res) => {
    
  const {  email, password, firstName, lastName,confirmPassword } = req.body;

  try {
    
    //it's important to check if the user already have an account which means that user already exist..
    const existingUser = await User.findOne({ email });        

    //but this we have a problem if user exist
    if (existingUser)
      return res.status(400).json({ message: "user already exist" });
    //now if user does not already exist then important is to check if PASSWORD IS SAME AS CONFIRM PASSWORD OR NOT..
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });
    //now if password === confirmPassword then we need to signUp this user that is need to save these credentials in our User database..
    //BUT BEFORE THAT WE NEED TO HASH THE USER PASSWORD USING BCRYPT
    // SO HOW TO HASH??
    const hashPassword = await bcrypt.hash(password, 12);
    
    
    
    //it takes two parameters first is the password and second is the level of difficulty(SALT) people usually keep 12 so I..
    //now it's time to create user
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    //now we also need to create token for this newly created user ..
    const token = jwt.sign({ email: result.email, id: result._id },secret,{
      expiresIn: "1h",
    });    
    res.status(200).json({ result, token });
  } catch (error) {
    
    res.status(500).json({ message: "something went wrong !" });
    console.log("error");
    
  }
};
//so by now we have implemented both signIn and sgnUp so it's time to implement all functions which a logged in user can perform like he/she can like any post  once and many more... they can delete a post created by them they can add a post.. and so on and backend should be able to say that ok you are authorized to do that

// all this can be done using middleware so we will create a middleware
