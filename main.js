const { Client, LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./utils/config.js')
const auth = require('./middleware/auth.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth)

const client = new Client({
  authStrategy: new LocalAuth()
})

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr)
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', message => {
	console.log(message.body)
	console.log(message)
})

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong')
	}
})
 
app.get('/', (req, res) => {
  res.send('oke')
})

app.post('/send', (req, res) => {
  console.log(req.body)

  const number = req.body.number
  const message = req.body.message

  client.sendMessage(`${number}@c.us`, message)

  res.send({
    status: true,
    message: 'success'
  })
})

client
  .initialize()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  })