require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRouter = require('./router/authRouter')

const PORT = process.env.PORT || 5000

const app = express()
const jsonParser = bodyParser.json()

app.use(jsonParser)
app.use('/auth', authRouter)


const  start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`server has started on port ${PORT}`))

    } catch(e) {
        console.log(e);
    }
}

start()