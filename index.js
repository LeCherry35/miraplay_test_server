require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRouter = require('./router/authRouter')
const gamesRouter = require('./router/gamesRouter')
const cors = require('cors')
const authMiddleware = require('./middleware/authMiddleware')


const PORT = process.env.PORT || 3000

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use('/auth', authRouter)
app.use('/games', authMiddleware, gamesRouter)



const  start = async () => {
    try {
        const connectDB = async () => {
            try {
                console.log('rty');
              const conn = await mongoose.connect('mongodb+srv://che:KTL1RtUmMDVtvapC@cluster0.baj4emo.mongodb.net/?retryWrites=true&w=majority');
              console.log(`MongoDB Connected: ${conn.connection.host}`);
            } catch (error) {
              console.log(error);
              process.exit(1);
            }
        }
        connectDB().then(() => {
    app.listen(PORT, () => console.log(`server has started on port ${PORT}`))
        })

    } catch(e) {
        console.log(e);
    }
}

start()