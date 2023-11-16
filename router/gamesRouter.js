const Router = require('express')
const gamesController = require('../controller/gamesController')

const router = new Router()

router.post('/fetchGames', gamesController.fetch)

module.exports = router