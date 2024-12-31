import Follow from "../models/follow-model.js";
import User from "../models/user-model.js";

const follow = async(req,res) => {
    try{
        const authorized_user_id = req.user._id
        const {follower_id, following_id, following_type} = req.body

        console.log("Authorized user id",authorized_user_id); //
        console.log("Follower's user id",follower_id); //
        console.log("Type of authorized user id",typeof(authorized_user_id)); //
        console.log("Type of follower id",typeof(follower_id)); //

        if(authorized_user_id != follower_id){
            return res.status(500).json({message: 'You are not allowed to use this'})
        }

        const alreadyFollowed = await Follow.findOne({follower_id, following_id})

        if(alreadyFollowed){
            return res.status(400).json({message: `Already following`})
        }

        if(following_type === 'User'){
            await User.findByIdAndUpdate(follower_id, {$inc:{following_count:1}}) // finds the user with follower_id and updates his followingcount by 1
            await User.findByIdAndUpdate(following_id, {$inc:{follower_count:1}}) // finds the user with following_id and updates his followercount by 1
        }
        else if(following_type === 'Company'){
            await User.findByIdAndUpdate(follower_id, {$inc:{following_id:1}})
            await Company.findByIdAndUpdate(following_id, {$inc:{follower_id:1}})
        }
        else{
            return res.status(400).json({message: 'Type is neither User nor Company'})
        }

        const newFollow = new Follow({follower_id, following_id, following_type})
        await newFollow.save()

        res.status(201).json({message: 'Followed successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Could not follow', error: err})
    }
}

const getFollowers = async(req,res) => {
    try{
        const {user_id} = req.params
        const {following_type} = req.query

        const followers = await Follow.find({following_id: user_id, following_type}).populate('follower_id')
        res.status(200).json({followers})
    }
    catch(err){
        res.status(500).json({message: 'Could not fetch followers', error: err})
    }
}

const unfollow = async(req,res) => {
    try{
        const {follower_id, following_id, following_type} = req.body

        const alreadyFollowing = Follow.findOne({follower_id, following_id, following_type})

        if(!alreadyFollowing){
            return res.status(404).json({message: "You are already not following"})
        }

        await Follow.deleteOne({follower_id, following_id, following_type})

        if(following_type == "User"){
            await User.findByIdAndUpdate(follower_id, {$inc: {following_count: -1}})
            await User.findByIdAndUpdate(following_id, {$inc: {follower_count: -1}})
        }
        else if(following_type == "Company"){
            await Company.findByIdAndUpdate(follower_id, {$inc: {following_count: -1}})
            await Company.findByIdAndUpdate(following_id, {$inc: {follower_count: -1}})
        }
        else{
            return res.status(400).json({message: "Following type invalid"})
        }

        res.status(200).json({message: "Unfollowed successfully"})
    }
    catch(err){
        res.status(500).json({message: "Could not unfollow", error: err})
    }
}

export default {follow, getFollowers, unfollow}