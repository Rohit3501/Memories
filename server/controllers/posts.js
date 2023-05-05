import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
//now getting access to actual posts 

const router=express.Router();

export const getPosts=async(req,res)=> {
    const {page}=req.query;
    try
    {
        //limit is the number of post we want per page
        //even page is a number in frontend but when we pass it to backend it become string

        const LIMIT=8;
        const startIndex=((Number(page)-1)*LIMIT);
        //to get the starting index on a particular page
        const total=await PostMessage.countDocuments({});
        //total number of posts we do have

        const posts = await PostMessage.find().sort({ _id:-1}).limit(LIMIT).skip(startIndex);
        //this sort is going to give us the posts in order of newest post to oldest post
        //also we dont want previous pages so we have to skip till startIndex and also only limited number of posts we want so SYNTAX
        res.status(200).json({data : posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
        //from backend we are not only passing the data but also pageNumber and numberOfPages so go to fontend and make use of them
    }
    catch(err){
        // console.log("not sending from backend to frontEnd.uck tou!");
        res.status(404).json({message:err.message});
    }
}
//controller to get posts by search
//we cannot use params for query 
//QUERY-->/posts?pag=1 -->page=1;
//PARAMS-->/posts/:id --> id=123;

export const getPostsBySearch=async(req,res) => {
    const {searchQuery,tags}=req.query;
    //   get what we passes as query
    try{
        const title=new RegExp(searchQuery,'i');
        //convert title to regular expression and ignore the case
        //now its time to get posts from database
        const posts=await PostMessage.find({ $or :[ {title},{tags:{$in:tags.split(',')}}]});
        //find me those posts which match one of two criteria 
        //either it matches title or [as tags is actually array of tag joined using comma',' so if any tag when spliited at , match ]
        //tag example: in frontend[good,bad,hi]="good,bad,hi"--> in backend again "good,bad,hi"=[good,bad,hi] and if any one match then get that post
        //$or --> either title or tags
        //finally when we have the posts send it to frontend as data
        res.json({data:posts});
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }
    //go to your action and check if you are receiving the data

}


//to get a single post for postDetail

export const getPost=async(req,res)=> {
    const {id}=req.params;
    try{
        const post=await PostMessage.findById(id);
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }
}


export const createPost=async(req,res)=>{
    
    const post=req.body;
    const newPostMessage=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
    //now creator is no longer going to be the name instead it is creater Id.
    //new Date().toISOString():: it will show when post is created;
    try{
        await newPostMessage.save();
        //201 :- successfull creation
        res.status(201).json(newPostMessage);
    }
    catch(err){
        //not created
        res.status(409).json({message:err.message});
    }
}
//when we are going to /posts/234
//this 234 is the id and is taken using req.params
export const updatePost = async(req,res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
    
}
//how do we know we are gonna receive this id as req.params??
//well in posts.js in router from  which we are calling this have id as _id and hence we need to rename as _id
//just to make sure that passed id is a mongoose id//


//to delete a post
export const deletePost=async(req,res)=>{
    //get id
    const {id} =req.params;
    //verify if post with that id exists
    //if not valid return a 404 error with a message.
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    //since post exist so delete that using query findByIdAndDelete.
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post Deleted successfully'});
}

export const likePost=async(req,res)=>{            
    const {id} =req.params;

    //when middleware is called before an action then req have userId which is very important
    //first we need to check if user is authenticated
    if(!req.userId)return res.json({message:'unauthenticated user !'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post=await PostMessage.findById(id);

    //now we need to verify if already liked
    const index=post.likes.findIndex((id)=>id===String(req.userId));
    //it will go to all id's present in likes and if it none of them will match with current userId it means not alredy liked so index=-1;
    if(index===-1)
    {
        //to like post
        post.likes.push(req.userId);
    }
    else
    {
        //to unlike post
        post.likes=post.likes.filter((id)=>id!==String(req.userId));
    }

    //now update the post

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
//one more thing we need to do is to add number of likes to the post which we can do in postMessage in models
    res.status(200).json(updatedPost);
    
    
}

export default router;