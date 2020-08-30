const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.hubapi.com/contacts/v1/'
})

module.exports = api;