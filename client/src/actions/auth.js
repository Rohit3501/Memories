import {AUTH} from '../constants/actionTypes';
import * as api from "../api/index.js";


// in signIn=(WE GET WHAT WE HAVE PASSED) from AUTH
//signIn and signOut are actions
export const signin=(formData,navigate)=>async(dispatch)=>
{
    
    try
    {        
        //log in the user 
        //as we created router so now its time to write this        
        const {data} = await api.signIn(formData);                
        dispatch({type:AUTH,data});
        navigate('/');


    }
    catch(error)
    {
        console.log("AUTH error in client");
        console.log(error);
    }
};

export const signup=(formData,navigate)=>async(dispatch)=>
{

    try
    {
        //signUp up the user         
        const {data}=await api.signUp(formData);
        // console.log(formData);
        dispatch({type:AUTH ,data});

        navigate('/');
    }
    catch(error)
    {
        console.log(error);
    }
}; 
//Now it's time to move to the backend to implement these..{user model,controller,routes}
//first go to server->index.js app.use(.././././.)
//then go to router and add route there..


// if action creators are assynchronous,then we have to use redux-thunk i.e we have a functions that return a async function with  a dispatch
