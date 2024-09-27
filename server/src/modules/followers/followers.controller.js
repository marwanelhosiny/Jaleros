import prisma from "../../../DB/prisma.js"








//===================================== follow api ===============================//


export const follow = async (req,res,next)=> {
    const { id : followerId} = req.authUser;
    let { followingId } = req.params;

    followingId = parseInt(followingId)
    // check if user is exists
    const user = await prisma.user.findUnique({
        where:{
            id: followingId
        }
    })
    
    if(!user){
        return res.status(404).json({error: "User not found"})
    }

    if(followingId==followerId){
        return res.status(400).json({error: "You can't follow yourself"})
    }

    // check if the user is already followed
    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId,
            },
        }
    })
    console.log('her')
    
    if(existingFollow){
        const unfollow = await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            }
})
        return res.status(200).json({message: "Unfollowed"})
    }

    // get followers
    const followers = await prisma.follow.findMany({
        where:{
            followingId: followerId
        }
    })

    const followUser = await prisma.follow.create({data:{followingId , followerId}})
    return res.status(200).json({message: "Followed", followers:followers.length()})
}

