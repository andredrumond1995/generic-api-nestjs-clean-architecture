import * as joi from '@hapi/joi'
export const createRoleJoiSchema = joi.object().keys({
    id: joi.number().optional(),
    name: joi.string().required(),
})
export const updateRoleJoiSchema = joi.object().keys({
    name: joi.string().optional(),
})
