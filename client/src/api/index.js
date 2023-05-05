import axios from 'axios';
//axios are used to create http requests that are present externally.
//to connect our frontend with backend services
//as our node is running on localhost:5000
const API=axios.create({baseURL:'http://localhost:5000'});
//we need one more thing without which middlware will not work
//this interceptor is like a checkPoint 
//every API call that has been made , is passes through this interceptor
//it checks if credentials are valid or not
//basically here we need to attach token to every request which is made
API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    return req;
 
});

//An HTTP GET request is used to request a specified resource from a server.
//as we created the action for fetchPostBySearch now we need to create API for that
export const fetchPost = (id) => API.get(`/posts/${id}`); 
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); 
//we will have to pass searchQuery as parameter ans as it is dynamic so syntax is like this:
//one more thing search can also be dome by tags so include that also
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); 
export const createPost = (newPost) => API.post('/posts',newPost);
//this fetchPost is going to make an axios   
export const likePost=(id)=> API.patch(`/posts/${id}/likePost`);
export const updatePost=(id, updatedPost) =>
API.patch(`/posts/${id}`, updatedPost);
export const deletePost=(id)=>API.delete(`/posts/${id}`);

//create route for signIn and signUp
//these all routers route to backEnd
export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);
 