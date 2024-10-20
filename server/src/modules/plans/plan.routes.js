import { Router } from "express";
import * as pc from "./plan.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { multermiddleLocal } from "../../middlewares/multerMiddleware.js"

const router = Router()



router.post('/', auth(), expressAsyncHandler(pc.createPlan))
router.put('/:id', auth(), expressAsyncHandler(pc.updatePlan))
router.delete('/:id', auth(), expressAsyncHandler(pc.deletePlan))
router.get('/', auth(), expressAsyncHandler(pc.getAllPlans))

router.post('/subscribereq', multermiddleLocal().single('payment') ,auth(), expressAsyncHandler(pc.subscribePlan))
router.post('/subscribe', auth(), expressAsyncHandler(pc.acceptOrRejectSubscription))

router.get('/subscription', auth(), expressAsyncHandler(pc.getSubscriptionRequests))
router.get('/:id', auth(), expressAsyncHandler(pc.getPlanById))
router.get('/subscription/:subscriptionId', auth(), expressAsyncHandler(pc.getSubscriptionById))







export default router