import { Router } from "express";
import * as fc from "./followers.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()



router.post('/:followingId', auth(), expressAsyncHandler(fc.follow))







export default router