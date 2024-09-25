import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generateUniequeString from "../../utils/generateUniqueString.js"
import sendEmailService from "../services/send-email.service.js"
import prisma from "../../../DB/prisma.js"


//============================================== register api =======================================//
export const signUp = async (req, res, next) => {
    //destructing enteries from req
    const { fullName , username , email, password , phoneNumber } = req.body
    
    //checking if email duplicated
    const checkEmail = await prisma.user.findUnique({ where: { email: email }})
    if (checkEmail) { return next(new Error('duplicated email', { cause: 400 })) }

    //checking if username duplicated
    const checkUsername = await prisma.user.findUnique({ where: { username: username }})
    if (checkUsername) { return next(new Error('duplicated username', { cause: 400 })) }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10)
    

    //send verification mail
    const OTP = generateUniequeString(4)

    //creating user with all required data
    const user = await prisma.user.create({data:{ fullName , username ,email , phoneNumber, password: hashedPassword  ,  OTP}})
    if (!user) {
        return res.status(500).json({ message: 'Failed to create user' });
    }

    const message = `<h1>hello</h1>
    <h3>here is your OTP  :${OTP}</h3>`
    const confirmMail =  await sendEmailService({ to: email, message })

    if (!confirmMail) {
        return res.status(500).json({ message: 'Failed to send verification email' });
    }

    return res.status(201).json({ message: 'user registered successfully' , user})

}

//================================================ verify-email =====================================//

export const verifyAccount = async (req, res, next) => {
    const { OTP, email } = req.body;

    // Find the user with the specified email and OTP
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // Check if user exists and if OTP is valid and not verified
    if (!user || user.OTP !== OTP || user.verified) {
        return next(new Error('Invalid OTP or account already verified', { cause: 400 }));
    }

    // Proceed with the update since the user exists and OTP is valid
    const updatedUser = await prisma.user.update({
        where: { email },
        data: { verified: true, OTP: null },
    });

    const { id, fullname, phoneNumber } = updatedUser;

    const token = jwt.sign({ phoneNumber, fullname, email, id }, process.env.ACCESSTOKEN_SECRET_KEY);

    return res.status(200).json({ message: 'Account verified successfully', token });
}

//============================================= login api ==========================================//
export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    //checking email accuaracy and changing status too
    const isExist = await prisma.user.findUnique({ 
        where: { email, verified: true }  // change to email later
     })

    if (!isExist) { return next(new Error('invalid credentials or not verified yet', { cause: 400 })) }

    //checking password accuaracy
    const checkPass = bcrypt.compareSync(password, isExist.password)
    if (!checkPass) { return next(new Error('invalid credentials', { cause: 400 })) }

    //creating token to send back in the response
    const {  fullName, id } = isExist
    const token = jwt.sign({ email,fullName , id }, process.env.ACCESSTOKEN_SECRET_KEY, { expiresIn: "1 d" })

    return res.status(200).json({ message: "you signed in successfully", token })
}

//=========================================== getUserData api ===============================//
export const getUserData = async (req,res,next) => {
    const { id } = req.authUser

    const [theFollowers, theFollowing] = await Promise.all([
        prisma.follow.findMany({ where: { followingId: id }, select: { followerId: true } }),
        prisma.follow.findMany({ where: { followerId: id }, select: { followingId: true } })
    ]);

    const Followers = theFollowers.length
    const Following = theFollowing.length

    const userData = await prisma.user.findUnique({
        where: { id }, select: {
            id: true,
            username:true,
            fullName: true,
            email: true,
            phoneNumber: true,
            isAdmin: true,
            isActive: true,
            verified: true,
            createdAt: true,
            updatedAt: true,
            // The password field is not included
        } })
    if (!userData) { return next(new Error('user not found', { cause: 404 })) }
    
    return res.status(200).json({ message: "user data fetched successfully", userData: { ...userData, Followers, Following } })
}


//=========================================== updatePassword api ===============================//
export const changePass = async (req, res, next) => {
    const { newPass, oldPass } = req.body
    const { id } = req.authUser

    //check old pass
    const checkPass = bcrypt.compareSync(oldPass, req.authUser.password)
    if (!checkPass) { return next(new Error('invalid credentials', { cause: 400 })) }

    //hashing the new pass
    const hashedPass = bcrypt.hashSync(newPass, 9)


    //updating database
    const passUpdate = await prisma.user.update({where:{id:id},data:{password:hashedPass}})
    if (!passUpdate) { return next(new Error('update failed', { cause: 400 })) }

    return res.status(200).json({ message: "password updated Successfully" })
}


//========================================== forgetPassword========================================//
export const forgetPassword = async (req, res, next) => {
    const { email  } = req.body

    //check if email accurate
    const isExist = await prisma.user.findUnique({where : {email} })
    if (!isExist) { return next(new Error('invalid email', { cause: 400 })) }

    //set forget code and send it in email
    const OTP = generateUniequeString(4)

    await prisma.user.update({where:{email:email},data:{OTP:OTP}})

    const message = `<h1>hello</h1>
    <h2>OTP:${OTP}</h2>`
    const confirmMail = sendEmailService({ to: email, message })

    return res.status(200).json({ message: "email sent successfully" })

}


//========================================== resetPass ========================================//

export const resetPass = async (req, res, next) => {
    const { email , OTP , newPass } = req.body

    if(OTP && email && newPass) {
    //find user
    const findUser = await prisma.user.findUnique({where: {email , OTP} })
    if (!findUser) { return next(new Error('user does not exist', { cause: 400 })) }

    //hash password
    const hashedPass = bcrypt.hashSync(newPass, 9)
    
    //updating user with the new password
    const updateUser = await prisma.user.update({where: {email} , data : { OTP:null , password : hashedPass} })

    return res.status(200).json({ message: "password updated Successfully" })
    }else if (email && OTP){
        //find user
        const findUser = await prisma.user.findUnique({ where: { email, OTP } })
        if (!findUser) { return next(new Error('user does not exist', { cause: 400 })) }

        return res.status(200).json({ message: "OTP is valid" })
    }

}

//=========================================== deleteUser ======================================== //

export const deleteUser = async (req, res, next) => {
    const { id } = req.authUser

    //deleting user and returning deleted document 
    const deleted = await prisma.user.delete({where: {id }})
    if(!deleted) { return next( new Error('user does not exist', { cause:400}))}

    return res.status(200).json({ messsage: "user deleted successsfully" })
}

