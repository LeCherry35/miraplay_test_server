const {model, Schema} = require('mongoose')

const User = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
})

module.exports = model('User', User)