require('dotenv').config()

const { PORT } = process.env

const conectDataBase = require('./src/lib/db')
const { request } = require('express')
const server = require('./src/server')

conectDataBase().then(() => {
  console.log('DB connected')
  server.listen(PORT, () => {
    console.log(`servers is listening in port ${PORT}`)
  })
})
