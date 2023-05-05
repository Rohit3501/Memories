import express from 'express';

import {  getPost,getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
//we are gonna add this middleware to some specific actions
//for examole all the users no matter they are logged in or not they can see all posts
//but a user can only create a post if he/she is logged in
const router=express.Router();
//it will reach by going to http:// localhost:5000/posts;
 //as we are already in posts so instead of posts/search 
 //simply /search
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/',auth, createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
//likePost is going to be managed in backed so that a user can like at max once so go to like controller
//if user is not creator then delete option should not be there
//so deletePost and updatePost are going to be managed in frontEnd
//patch is used for updating existing documents.
//for editing we need id and for update function updatePost.
//so go and create updatePost in controllers/post and import here

export default router;
//here we will use middleware 
//for example whwn someone like a post then first
//it will go to middleware to confirm user
