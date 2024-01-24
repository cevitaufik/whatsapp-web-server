class ResponseService {

    response

    constructor(response) {
        this.response = response
    }

    badRequest(message = 'bad request') {
        return this.response
            .status(400)
            .send({ message })
    }

    success(message = 'success') {
        return this.response
            .status(200)
            .send({ message })
    }
}

module.exports = ResponseService