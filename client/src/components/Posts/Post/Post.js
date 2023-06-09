import React from 'react';
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOffAltOutlinedIcon  from '@material-ui/icons/ThumbUpAlt';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts';
import useStyle from './styles';
import {useNavigate}  from 'react-router-dom';


const Post=({ post, setCurrentId })=> {
    const dispatch = useDispatch();
    const classes = useStyle();
    const user=JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();


    //the logic for like is now complex
    //because one may like its own or others or may dislike 
    //so message for all will be diffrent
 const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length >= 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltOutlinedIcon  fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }    
    return <><ThumbUpOffAltOutlinedIcon  fontSize="small" />&nbsp;Like</>;
  };


  const openPost=()=>{
    navigate(`/posts/${post._id}`);
  }

  return (
      <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>        
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            
            <div className={classes.overlay}>
                <Typography vairiant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{ color: 'white' }}
                    size="small"
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography vairiant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
                <Typography className={classes.title} gutterBottom vairiant="h5" component="h2" >{post.title}</Typography>
            <CardContent>
                <Typography vairiant="body2" 
                color="textSecondary" component="p">
                {post.message}</Typography>
            </CardContent>
            </ButtonBase>
            
            <CardActions className={classes.cardActions}>
            
                <Button size="small" color="primary"
                disabled={!user?.result}
                 onClick={() => dispatch(likePost(post._id)) }>
                    <Likes/>
                </Button>
                {/* if logged in user is the creator of post then only show delete button else not  */}
                {(user?.result?.googleId===post?.creator||user?.result?._id===post.creator)&&
                (
                    <Button size="small" color="primary" onClick={() =>  dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
                
            </CardActions>
            
        </Card>
        
    );
};
export default Post;
//&nbsp; is for space