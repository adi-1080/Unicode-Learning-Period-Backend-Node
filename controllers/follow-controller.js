import Follow from "../models/follow-model.js";

const follow = async(req,res) => {
    try{
        const {follower_id, following_id, following_type} = req.body
        const newFollow = new Follow({follower_id, following_id, following_type})
        await newFollow.save()

        res.status(201).json({message: 'Followed successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Failed to follow', error: err})
    }
}

const getFollowers = async(req,res) => {
    try{
        const user_id = req.params
        const followers = await Follow.find({following_id: user_id, following_type: 'User'}).populate('follower_id')
        res.status(200).json({followers})
    }
    catch(err){
        res.status(500).json({message: 'Could not fetch followers', error: err})
    }
}

export default {follow, getFollowers}