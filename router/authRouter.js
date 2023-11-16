const Router = require('express')
const {body} = require('express-validator')
const authController = require('../controller/authController')

const router = new Router()

router.post(
    '/registration', 
    [
        body('email').isEmail(),
        body('password').isLength({min: 3, max: 20}),
    ],
    authController.registration
)
router.post('/login', authController.login)
router.post('/checkToken', authController.checkToken)

module.exports = router