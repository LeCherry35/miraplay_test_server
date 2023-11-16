const User = require('../models/User')
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

class AuthController {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Помилка при валідаціі', errors})
            }
            const { email, password } = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: `Користувач з поштою ${email} вже існує`})
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = new User({email, password: hashPassword})

            await user.save()

            return res.json({message: `Користувача успішно зареєстровано`})


        } catch(e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try{
            const { email, password } = req.body
            const candidate = await User.findOne({email})
            if(!candidate) {
                return res.status(400).json({message: `Користувача з поштою ${email} не знайдено`})
            }

            const isPassCorrect = await bcrypt.compare(password, candidate.password)
            if(!isPassCorrect) {
                return res.status(400).json({message: 'Хибний пароль'})
            }
            
            const token = jwt.sign({payload:{id: candidate._id, email}}, process.env.JWT_SECRET, {expiresIn: "24h"})
            return res.json({token})
        } catch(e) {
            next(e)
        }
    }

    async checkToken (req, res, next) {
        try{
            const { token } = req.body
            const data = jwt.verify(token, process.env.JWT_SECRET)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new AuthController()