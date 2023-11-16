const axios = require('axios')
class GamesController {
    async fetch(req,res,next) {
        try {
            const {page, genre, isFreshGamesFirst, gamesToShow} = req.body
            const response =  await axios.post('https://api.miraplay.cloud/games/by_page', { 
                    "page": page,
                    "isFreshGamesFirst": isFreshGamesFirst,
                    "genre": genre,
                    "gamesToShow": gamesToShow,
                  }
            )
            const { data } = response
            const {games, gamesListLength} = data
            const gamesDto = games.map(game => {
                const {gameDescription, commonGameName, gameImage} = game
                return {gameDescription, commonGameName, gameImage}
            })
            return res.json({games:gamesDto, gamesListLength})
        } catch(e) {
            next(e)
        }
    }
}
module.exports = new GamesController