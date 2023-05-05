import express from 'express';

import { signin,signup} from '../controllers/user.js';
 
const router=express.Router();
//it will reach by going to http:// localhost:5000/posts;
 
//to send all information from login form to backend and then do some operation on backend
router.post('/signin',signin);
router.post('/signup',signup);
//signIn and signUp are not defined here so we need to import them from user.js of controllers and hence go to controller create user.js and implement these two there


 
export default router;
