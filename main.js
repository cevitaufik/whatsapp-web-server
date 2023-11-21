const whatsapp = require('./app/whatsapp.js')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./utils/config.js')
const auth = require('./middleware/auth.js')
const moment = require('moment')

moment.locale('id')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth)
 
app.get('/', (req, res) => {
  res.send('Server is running')
})

app.post('/send', (req, res) => {
  console.log(req.body)
  console.log(moment().format('D MMMM YYYY H:mm:ss'))

  const number = req.body.number
  const message = req.body.message

  if (!number && !message) {
    return res
      .status(400)
      .send({ message: 'nomor dan pesan tidak boleh kosong' })
  }

  whatsapp.sendMessage(`${number}@c.us`, message)

  res.status(200).send({ message: 'success' })
})

whatsapp
  .initialize()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on [http://127.0.0.1:${config.port}]`)
    })
  })