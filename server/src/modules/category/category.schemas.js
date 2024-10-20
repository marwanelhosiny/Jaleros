import Joi from "joi";






export const addcategorySchema = {
    body: Joi.object({
        category: Joi.string(),
    }),
}