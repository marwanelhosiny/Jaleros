import jwt from "jsonwebtoken"
import prisma from "../../DB/prisma.js"

//==================================================authentication middlleware========================================//
export const auth = (isAdmin=false) => {
    return async (req, res, next) => {
        const { accesstoken } = req.headers
        if (!accesstoken) { return next(new Error('missing access token', { cause: 400 })) }


        try {
            const verifiedToken = jwt.verify(accesstoken, process.env.ACCESSTOKEN_SECRET_KEY)

            if (!verifiedToken || !verifiedToken.id) { return next(new Error('invalid token payload', { cause: 400 })) }

            //check if user has the required role
            if (!verifiedToken.isAdmin === isAdmin) { return next(new Error('unauthorized access', { cause: 403 })) }
            
            //checking if user is deleted or role updated while using an old valid token
            const stillExist = await prisma.user.findUnique({where:{id:verifiedToken.id}})
            if (!stillExist) { return next(new Error('please signUp first', { cause: 400 })) }

            req.authUser = stillExist

            next()

        } catch (error) {
            return next(new Error(`authentication error :${error.message}`, { casue: 400 }))
        }
    }
}