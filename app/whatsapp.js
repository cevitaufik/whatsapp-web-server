const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const moment = require('moment')

moment.locale('id')

const whatsapp = new Client({
    authStrategy: new LocalAuth()
})

whatsapp.on('qr', (qr) => {
    console.log('QR RECEIVED', qr)
    qrcode.generate(qr, { small: true })
})

whatsapp.on('ready', () => {
    console.log('Client is ready!')
})

whatsapp.on('message', message => {
    console.log(message.body)
    console.log(moment().format('D MMMM YYYY H:mm:ss'))
})

whatsapp.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong')
    }
})

module.exports = whatsapp