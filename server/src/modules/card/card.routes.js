import { Router } from "express";
import * as cc from "./card.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { multermiddleLocal } from "../../middlewares/multerMiddleware.js"
import { createCardSchema, deleteCardSchema, getCardSchema, updateCardSchema } from "./card.schemas.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";

const router = Router()



router.post('/', multermiddleLocal(allowedExtensions.Image).fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPic', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
]),validationFunction(createCardSchema),auth() , expressAsyncHandler(cc.createCard))
router.put('/', multermiddleLocal(allowedExtensions.Image).fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPic', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
]),validationFunction(updateCardSchema),auth() , expressAsyncHandler(cc.updateCard))

router.get('/sponsored',  expressAsyncHandler(cc.sponsoredCards))
router.get('/myCards', auth(), expressAsyncHandler(cc.getMyCards))
router.get('/:username', validationFunction(getCardSchema) , expressAsyncHandler(cc.getCardById))
router.post('/search',  expressAsyncHandler(cc.getCards))

router.delete('/:cardId', validationFunction(deleteCardSchema) ,auth(), expressAsyncHandler(cc.deleteCard))




router.post('/rate/:cardId', auth(), expressAsyncHandler(cc.rateCard))









export default router