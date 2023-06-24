const { jwtVerify } = require("../helpers/jwt")
// const { User } = require('../models')
const pool = require('../config/config')

async function authorization(req, res, next) {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: 'You are not authorized'}
        const payload = jwtVerify(access_token)
        const response = pool.query(`SELECT * FROM users WHERE username = '${payload.username}'`)
        if(!response) throw {name: 'You are not authorized'}
        req.user = payload
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports = { authorization }