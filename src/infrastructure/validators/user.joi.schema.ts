import * as joi from '@hapi/joi'
export const createUserJoiSchema = joi.object().keys({
    id: joi.number().optional(),
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    roles: joi.array().items(joi.number().required()).required(),
    created_at: joi.date().iso().optional(),
    updated_at: joi.date().iso().optional(),
    activated: joi.boolean().optional()
})
export const updateUserJoiSchema = joi.object().keys({
    name: joi.string().optional(),
    email: joi.string().optional(),
    password: joi.string().optional(),
    created_at: joi.date().iso().optional(),
    updated_at: joi.date().iso().optional(),
    roles: joi.array().items(joi.number().required()).optional(),
    activated: joi.boolean().optional()
})
export const userAuthJoiSchema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
})