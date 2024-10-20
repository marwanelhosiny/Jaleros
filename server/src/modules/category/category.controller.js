import prisma from "../../../DB/prisma.js"








//===================================== category api ===============================//


export const addCategory = async(req,res,next)=>{
    const {  category } = req.body

        const newCategory = await prisma.category.create({
            data: {
                category
            }
        })
        res.status(201).json(newCategory)
}

export const getCategories = async(req,res,next)=>{
    const categories = await prisma.category.findMany()
    res.status(200).json(categories)
}

