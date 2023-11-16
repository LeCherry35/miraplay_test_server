require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRouter = require('./router/authRouter')
const gamesRouter = require('./router/gamesRouter')
const cors = require('cors')
const authMiddleware = require('./middleware/authMiddleware')


const PORT = process.env.PORT || 5000

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use('/auth', authRouter)
app.use('/games', authMiddleware, gamesRouter)



const  start = async () => {
    try {
        console.log('gtr', process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`server has started on port ${PORT}`))

    } catch(e) {
        console.log(e);
    }
}

start()