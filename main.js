const whatsapp = require('./app/whatsapp.js')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./utils/config.js')
const auth = require('./middleware/auth.js')
const RequestService = require('./app/request-service.js')
const ResponseService = require('./app/response-service.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth)
 
app.get('/', (req, res) => {
  res.send('Server is running')
})

app.post('/send', (req, res) => {
  const request = new RequestService(req, false)
  const response = new ResponseService(res)

  if (request.requestIsInvalid()) {
    return response.badRequest('nomor dan pesan tidak boleh kosong')
  }

  whatsapp.sendMessage(request.number, request.message)

  response.success()
})

app.post('/send/group', (req, res) => {
  const request = new RequestService(req, true)
  const response = new ResponseService(res)

  if (request.requestIsInvalid()) {
    return response.badRequest('nomor dan pesan tidak boleh kosong')
  }

  whatsapp.sendMessage(request.number, request.message)

  response.success()
})

whatsapp
  .initialize()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on [http://127.0.0.1:${config.port}]`)
    })
  })