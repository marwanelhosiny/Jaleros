import { Router } from "express";
import * as ac from "./auth.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { changepassSchema, forgetpasswordSchema, resetpassSchema, signinSchema, signupSchema, userupdateSchema } from "./auth.schemas.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()

router.post('/', validationFunction(signupSchema), expressAsyncHandler(ac.signUp))
router.post('/verify-email', expressAsyncHandler(ac.verifyAccount))
router.patch('/changePass', validationFunction(changepassSchema), auth(), expressAsyncHandler(ac.changePass))
router.post('/login', validationFunction(signinSchema), expressAsyncHandler(ac.signIn))
router.post('/forgetPass', validationFunction(forgetpasswordSchema), expressAsyncHandler(ac.forgetPassword))
router.post('/resetpass', validationFunction(resetpassSchema), expressAsyncHandler(ac.resetPass))
router.delete('/', auth(), expressAsyncHandler(ac.deleteUser))

router.get('/', auth(), expressAsyncHandler(ac.getUserData))
router.get('/allusers', auth(), expressAsyncHandler(ac.getUsers))


router.delete('/suspend/:id', auth(true), expressAsyncHandler(ac.delUser))
router.post('/suspend/:id', auth(true), expressAsyncHandler(ac.suspendUser))
router.post('/unsuspend/:id', auth(true), expressAsyncHandler(ac.unsuspendUser))










export default router