import { END_LOADING,FETCH_POST,START_LOADING,FETCH_BY_SEARCH,FETCH_ALL,CREATE,DELETE,UPDATE,LIKE} from '../constants/actionTypes';


//reducer is a function that accept a state and a action 
//and based on action type 
//state(here posts )must be initialized

    // if(action.type ==='CREATE')
    // return something
    //since there are multiple if statements so we use switch instead of if

//eslint-disable-next-line import/no-anonymous-default-export
export default(state={isLoading:true,posts:[]},action) => {
//now that our getPost is not simply data so modify 
    switch (action.type) {
        case START_LOADING:
            return {...state , isLoading: true};
        case END_LOADING:
            return {...state , isLoading: false};
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload};
        case FETCH_POST:
            return {...state,post:action.payload};
        case CREATE:
                return {...state,posts:[...state,action.payload]};
        case UPDATE:
            return{ ...state,posts: state.posts.map((post)=>post._id===action.payload._id? action.payload:post)};
        case LIKE:                     
            return{...state, posts: state.posts.map((post)=>post._id===action.payload._id? action.payload:post)};            
        case DELETE:
            return {...state, posts:state.posts.filter((post)=>post._id!==action.payload)};
        default:
            return state;
    }
}

//in case of delete return all except that with deleted id