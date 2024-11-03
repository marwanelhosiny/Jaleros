import prisma from "../../../DB/prisma.js"
import generateUniequeString from "../../utils/generateUniqueString.js"





//============================================ add Promo ===========================================//
export const addPromoCode = async(req,res,next)=>{

    const { discountType, discountValue, maxUsage, expiresAt }=req.body

    const code = generateUniequeString(9)

    const newPromoCode = await prisma.promoCode.create(
        {
            data: {
                code,
                discountType,
                discountValue,
                maxUsage,
                expiresAt,
            },
        }
    )
    if (!newPromoCode){
        return res.status(400).json({message: "Error creating new promo code"})
    }
    res.status(201).json({message: "Promo code added successfully" , newPromoCode})
}

//============================================ get all Promos ===========================================//

export const getAllPromos = async(req,res,next)=>{
    const { page = 1, limit = 6 } = req.query; // Default pagination values


    const allPromos = await prisma.promoCode.findMany({
        skip: (page - 1) * limit,  // For pagination
        take: parseInt(limit),  // Limit number of results
    })
    if (!allPromos){
        return res.status(404).json({message: "No promo codes found"})
    }
    const total = allPromos.length // Count total number of promo codes
    res.status(200).json({
        message: 'promos fetched successfully',
        allPromos,
        page,
        limit,
        total
    })
}

//============================================ get Promo by ID ===========================================//

export const getPromoById = async(req,res,next)=>{
    const { id } = req.params

    const promo = await prisma.promoCode.findUnique({
        where: {
            id: parseInt(id),
        },
    })
    if (!promo){
        return res.status(404).json({message: "Promo code not found"})
    }
    res.status(200).json({message: 'Promo code fetched successfully', promo})
}

//============================================ update Promo by ID ===========================================//

export const updatePromoById = async(req,res,next)=>{
    const { id } = req.params
    const { discountType, discountValue, maxUsage, expiresAt }=req.body

    const updatedPromo = await prisma.promoCode.update({
        where: {
            id: parseInt(id),
        },
        data: {
            discountType,
            discountValue,
            maxUsage,
            expiresAt,
        },
    })
    if (!updatedPromo){
        return res.status(404).json({message: "Promo code not found"})
    }
    res.status(200).json({message: 'Promo code updated successfully', updatedPromo})
}

//============================================ delete Promo by ID ===========================================//

export const deletePromoById = async(req,res,next)=>{
    const { id } = req.params

    const deletedPromo = await prisma.promoCode.delete({
        where: {
            id: parseInt(id),
        },
    })
    if (!deletedPromo){
        return res.status(404).json({message: "Promo code not found"})
    }
    res.status(200).json({message: 'Promo code deleted successfully', deletedPromo})
}




