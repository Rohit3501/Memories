import jwt  from 'jsonwebtoken';

//middleware: very similar to get function but something extra that is next
//which means do something and move to the next thing..
const secret='test';
const auth=async(req,res,next)=>{
    //we want to see if the user is really who he shows to be
    //this can be done by using jsonWebTokens
try
{
    const token=req.headers.authorization.split(" ")[1];
    //we are going to have two types of tokens that
    //one is from google auth and other our own(custom)
    const isCustomAuth=token.length<500;
    //if token length is >500 it means it is google auth token
    let decodeData;
    if(token&&isCustomAuth)
    {
        decodeData=jwt.verify(token,secret);
        
        //test is the secret key which we used while creating token
        //verify method will give us name and user Id
        //so now we know which user us liking the post or deleting post
        req.userId = decodeData?.id;
        //?.optional chaining(same as normal access but avoid error if value does not exist)

    }
    else
    {
        //if google auth 
        decodeData=jwt.decode(token);
        //we don't need secret key here
        req.userId=decodeData?.sub;
        //sub is googles name that differentialte each gooogle user

    }

    next();
    //so now it will be very clear that what middleware is for;
    //suppose a user hit like => first it will come to auth of middleware and if
    //everything here in try block is correct then  it will call next middle
    //next means now like controller will get executed;


}
catch(error){
    console.log(error);
}
};
export default auth;

//now question is where to use this middleware??
//answer is in the route

