require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandling')
const router = require('./routes/routes')
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})