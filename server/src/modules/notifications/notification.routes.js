import { Router } from "express";
import * as nc from "./notification.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()




router.post('/',auth(true),expressAsyncHandler(nc.addNotification))

router.get('/',auth(),expressAsyncHandler(nc.getNotifications))

router.delete('/:id',auth(),expressAsyncHandler(nc.deleteNotification))

router.patch('/:id',auth(),expressAsyncHandler(nc.markAsRead))

router.put('/',auth(),expressAsyncHandler(nc.markAllAsRead))






export default router