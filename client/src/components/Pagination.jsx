import React ,{ useEffect } from 'react';
import  {Pagination,PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

import {getPosts} from '../actions/posts';


import useStyles from './styles';
//pagination is a react cpmponent

const Paginate=({page})=>{ 
    const {numberOfPages} = useSelector((state)=>state.posts);
    //this code will return number of pages
    const classes=useStyles();
    const dispatch=useDispatch();

    //we will use useContext to update eveytime page changes
    useEffect(()=>{
        if(page)
        {
            dispatch(getPosts(page));
        }
    },[page,dispatch]);



    return (
        <Pagination
        classes={{ul: classes.ul}}
        count={numberOfPages}
        //count:-Number of pages
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem{...item} component={Link} to ={`/posts?page=${item.page}`}/>
        )}
                
    />
    );
        };

export default  Paginate;        
//we are going to import it inside home component and use it.
