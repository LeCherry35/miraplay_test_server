const User = require('../models/User')
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

class AuthController {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Validation error', errors})
            }
            const { email, password } = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = new User({email, password: hashPassword})
            await user.save()

            return res.json({message: `User successfully registered`})


        } catch(e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try{
            const { email, password } = req.body
            const candidate = await User.findOne({email})
            if(!candidate) {
                return res.status(400).json({message: `No user with email ${email}`})
            }

            const isPassCorrect = await bcrypt.compare(password, candidate.password)
            if(!isPassCorrect) {
                return res.status(400).json({message: 'Wrong password'})
            }
            console.log('1234');
            const token = jwt.sign({payload:{id: candidate._id}}, process.env.JWT_SECRET, {expiresIn: "24h"})
            return res.json({token})
        } catch(e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try{

        } catch(e) {
            next(e)
        }
    }

    async getUsers (req, res, next) {
    }

}

module.exports = new AuthController()