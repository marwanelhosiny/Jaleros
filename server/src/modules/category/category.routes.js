import { Router } from "express";
import * as cc from "./category.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { addcategorySchema } from "./category.schemas.js";

const router = Router()



router.post('/', validationFunction(addcategorySchema) ,auth(true), expressAsyncHandler(cc.addCategory))
router.get('/', auth(), expressAsyncHandler(cc.getCategories))
router.delete('/:id', auth(true), expressAsyncHandler(cc.deleteCategory))







export default router