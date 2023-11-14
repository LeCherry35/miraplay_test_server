const Router = require('express')
const {check} = require('express-validator')
const authController = require('../controller/authController')

const router = new Router()

router.post(
    '/registration', 
    [
        check('email', 'Enter valid email').isEmail(),
        check('password', 'Password must be from 3 to 20 char').isLength({min: 3, max: 20}),
    ],
    authController.registration
)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/users',authController.getUsers)

module.exports = router