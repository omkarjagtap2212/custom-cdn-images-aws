const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())


const imageRoutes = require('./routes/imageRoutes');

app.use("/api/images", imageRoutes)


module.exports = app;