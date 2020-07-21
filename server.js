require('dotenv').config()

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static( __dirname + '/public')) 
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/register')

app.use('/', indexRouter)
app.use('/register', signupRouter)
app.use('/login', loginRouter)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to database"))

app.listen(process.env.PORT || 3000, () =>
  console.log("server is listening on port 3000")
)
