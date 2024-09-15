import Joi from "joi";

export const createCardSchema = {
    body: Joi.object({
        name : Joi.string().required(),
        email: Joi.string().email(),
        country: Joi.string(),
        city: Joi.string(),
        location : Joi.string(),
        about : Joi.string(),
        phoneNumber : Joi.string(),
        facebook: Joi.string(),
        instagram: Joi.string(),
        youtube: Joi.string(),
        X: Joi.string(),
        tikTok: Joi.string(),
        snapchat: Joi.string(),
        linkedin: Joi.string(),
        telegram: Joi.string(),
        reddit: Joi.string(),
        pinterest: Joi.string(),
        custom1: Joi.string(),
        custom2: Joi.string(),
        custom3: Joi.string(),
        type: Joi.string(),
        sponsored: Joi.boolean(),
    }).unknown(true),
}
export const updateCardSchema = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        country: Joi.string(),
        city: Joi.string(),
        location : Joi.string(),
        about : Joi.string(),
        phoneNumber : Joi.string(),
        facebook: Joi.string(),
        instagram: Joi.string(),
        youtube: Joi.string(),
        X: Joi.string(),
        tikTok: Joi.string(),
        snapchat: Joi.string(),
        linkedin: Joi.string(),
        telegram: Joi.string(),
        reddit: Joi.string(),
        pinterest: Joi.string(),
        custom1: Joi.string(),
        custom2: Joi.string(),
        custom3: Joi.string(),
        removeGalleryPics: Joi.string(),

    }).unknown(true),
}

export const singleCardSchema = {
    params: Joi.object({
        cardId: Joi.string(),
    }),
}