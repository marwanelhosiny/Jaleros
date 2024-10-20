import { Router } from "express";
import * as bc from "./blog.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { multermiddleLocal } from "../../middlewares/multerMiddleware.js"

const router = Router()



router.post('/',multermiddleLocal().single('image') ,auth(), expressAsyncHandler(bc.addBlog))

router.get('/', expressAsyncHandler(bc.getAllBlogs))

router.get('/:id', expressAsyncHandler(bc.getBlogById))

router.put('/:id',multermiddleLocal().single('image') ,auth(), expressAsyncHandler(bc.updateBlogById))

router.delete('/:id', auth(), expressAsyncHandler(bc.deleteBlogById))




export default router