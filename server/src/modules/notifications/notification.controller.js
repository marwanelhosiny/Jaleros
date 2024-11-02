import prisma from "../../../DB/prisma.js"








//===================================== notifications api ===============================//


export const addNotification = async(req,res,next)=>{
    const {userId,userIds,message} = req.body
    if(userId){
        await prisma.notification.create({
            data: {
                userId,
                message,
                
            },
        })
    }
    if(userIds){
        await Promise.all(userIds.map(async (id) => {
            await prisma.notification.create({
                data: {
                    userId: id,
                    message,
                },
            })
        }))
    }
    res.status(201).json({message: "Notification sent successfully"})
    
}
//======================================== get notifications =============================//
export const getNotifications = async(req,res,next)=>{
    const { page = 1, limit = 6 } = req.query; // Default pagination values
    const {id} = req.authUser
    const notifications = await prisma.notification.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: "desc",
        },
        skip: (page - 1) * limit,  // For pagination
        take: parseInt(limit),  // Limit number of results
    })
    const total = notifications.length

    res.status(200).json({
        message: 'notifications fetched successfully',
        notifications,
        page,
        limit,
        total
    })
}

//======================================== delete notification =============================//

export const deleteNotification = async(req,res,next)=>{
    const {id} = req.params
    await prisma.notification.delete({
        where: {
            id:parseInt(id),
        },
    })
    res.status(200).json({message: "Notification deleted successfully"})
}

//======================================== mark as read notification =============================//

export const markAsRead = async(req,res,next)=>{
    const {id} = req.params
    await prisma.notification.update({
        where: {
            id:parseInt(id),
        },
        data: {
            isRead: true,
        },
    })
    res.status(200).json({message: "Notification marked as read successfully"})
}

//======================================== mark all as read notification =============================//

export const markAllAsRead = async(req,res,next)=>{
    const {id} = req.authUser
    await prisma.notification.updateMany({
        where: {
            userId: id,
        },
        data: {
            isRead: true,
        },
    })
    res.status(200).json({message: "All notifications marked as read successfully"})
}


