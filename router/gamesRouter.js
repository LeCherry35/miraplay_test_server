const Router = require('express')
const gamesController = require('../controller/gamesController')

const router = new Router()

router.post('/', gamesController.fetch)

module.exports = router