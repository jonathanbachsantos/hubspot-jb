const axios = require('axios');
require('dotenv').config()

const api = axios.create({
    baseURL: 'https://api.hubapi.com/contacts/v1/',
    params: {
        hapikey:process.env.HUBSPOT_KEY
    }
})

module.exports = api;