const { Schema, model } = require('mongoose')
const Joi = require('joi')

const director = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

function validateDirector(director) {
    const schema = Joi.object({
        login: Joi.string().required().lowercase().max(30),
        password: Joi.string().required().max(30).min(6)
    })
    return schema.validate(director)
}

module.exports.validateDirector = validateDirector
module.exports.Director = model('Director', director)