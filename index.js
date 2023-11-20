const { Client, LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// client.on('message', message => {
// 	console.log(message.body);
// 	console.log(message);
// });

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/send', (req, res) => {
  console.log(req.body);

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
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  });