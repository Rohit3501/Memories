import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

import ChipInput from "material-ui-chip-input";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
//useDispatch is a hook

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { getPostBySearch} from "../../actions/posts";

import Pagination from "../Pagination";

import useStyles from "./styles";

//useQuery is a normal function

function useQuery() {
  return new URLSearchParams(useLocation().search);
  //it simply allows us to use it as a hook
}

const Home = () => {
  //we call useStyle as  hook
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  //if a particular page is there or else thr firdt page
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  //for search functionality we have to create a hook to maintain state
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  //for search using tags ,initial empty array

  // //this is for update using ...
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);
  //we will no longer fetch post from home


  //search when search button is clicked
  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch--> to fetch search post
      //also we have to modify our database so that it gives only searched post.
      // to send nice message to database we can use redux;
      //dispatch is the verb we use with actions so to create dispatch first go to actions and create action for it.
      //we have created an action for this and also created an API end point for getPostBySearch 
      //so now we can dispatch it to actions
      dispatch(getPostBySearch({search,tags:tags.join(',')}))
      //after we hit search --> dispatch occur . So now its important to show them hence navigate to this page
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      //so at this page we will render all searched posts so that this ULR can be shared uniquely as well

      //as we cannot dispatch an array
      //we also need to create the API endPoint n backend side; 

    } 
    else {
      navigate("/");
    }
  };

  //to handle when enter button is pressed while  searching
  //keyCode for enter button is 13;
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
      //search post-->when enter key is pressed then also simply go to searchPost. Why to write same logic again?
    }
  };
  //add tag to array
  const handleAdd = (tag) => setTags([...tags, tag]);

  //remove the which is to be removed and keep all others
  const handleDelete = (tagToDelete) =>{
    setTags(tags.filter((tag) => tag !== tagToDelete));
    

  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
          //we dont have these classes so let's create them
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* in smaller devices take half the space in medium devices 3 spaces will be enough */}
          <Grid item xs={12} sm={6} md={3}>
            {/* Now its time to add search functionality */}
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                //onChange function so that as soon as a charater changes result should also be changed so we set value of search using set function
                onKeyDown={handleKeyPress}
                //because when we hit enter button after typing required content it should show result
              />
              {/* we also want to search using tags so for that */}
              {/* Chips allow users to enter information, make selections, filter content, or trigger actions. */}
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
              {/* variant =contained--> if not used then button look tranparent */}
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
           
            {(!searchQuery && !tags.length)&&(
            <Paper elevation={6} className={classes.pagination}>
              <Pagination page={page} />
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
