const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const authRouter = require('./router/authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cookieParser)
app.use('/auth', authRouter)

const  start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://che:KTL1RtUmMDVtvapC@cluster0.baj4emo.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server has started on port ${PORT}`))

    } catch(e) {
        console.log(e);
    }
}

start()