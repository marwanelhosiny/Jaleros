import { Router } from "express";
import * as pc from "./promocode.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()



router.post('/',auth(true),expressAsyncHandler(pc.addPromoCode))

router.get('/',auth(true),expressAsyncHandler(pc.getAllPromos))

router.get('/:id',auth(true),expressAsyncHandler(pc.getPromoById))

router.put('/:id',auth(true),expressAsyncHandler(pc.updatePromoById))

router.delete('/:id',auth(true),expressAsyncHandler(pc.deletePromoById))






export default router