const moment = require('moment')

moment.locale('id')

class RequestService {

    #number
    #message
    #isGroup

    constructor(request, isGroup = false) {
        this.#number = request.body.number
        this.#message = request.body.message
        this.#isGroup = isGroup

        console.log(request.body)
        console.log(moment().format('D MMMM YYYY H:mm:ss'))
    }

    get number() {
        return (this.#isGroup) ? `${this.#number}@g.us` : `${this.#number}@c.us`
    }

    get message() {
        return this.#message
    }

    requestIsInvalid() {       
        return !this.#number && !this.#message
    }

}

module.exports = RequestService