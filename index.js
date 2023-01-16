const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env'})
const notify = require('./routes/Notify')

const app = express();

app.use(express.json())
app.use(cors())
app.use(notify)


const connection_string = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(connection_string, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`)
        })
        console.log("Mongodb Connection Successful")
    })
    .catch((err) => {
        console.error(err.message)
    })