import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet=async(req,res)=>{
    try {
        const{description, id}=req.body;
        if(!description || !id){
            return res.status(401).json({
                messsage:"Field are required",
                success:false
            });
        };
        const user=await User.findById(id).select("-password ");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user

        })
        return res.status(201).json({
            messsage:"Tweet created successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteTweet=async(req,res)=>
{
    try {
        const {id} =req.params; 
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
        messsage:"Tweet delete successfully",
        success:true
    })
    } catch (error) {
        console.log(error);
    }
}
export const likeorDislike= async(req,res)=>{
    try {
        const loggedInUserId=req.body.id;
        const tweetId=req.params.id;
        const tweet=await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            //dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                messsage:"User dislike your tweet."
            })
        }else{
            //like
            await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}});
        return res.status(200).json({
                messsage:"User like your tweet."
            })
        }
        
    } catch (error) {
        
    }
}
export const getAllTweets=async (req,res)=>{
    //loggedInUser ka tweet + follwing ka tweet
    try {
        const id =req.params.id;
        const loggedInUser=await User.findById(id);
        const loggedInUserTweets=await Tweet.find({userId:id});
        const followingUserTweet=await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return  Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet)
        })

    } catch (error) {
        console.log(error);
    }

}
export const getFollowingTweets=async(req,res)=>{
try {
        const id =req.params.id;
        const loggedInUser=await User.findById(id);
        const followingUserTweet=await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return  Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        })

    } catch (error) {
        console.log(error);
    }
}

