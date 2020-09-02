const apiHubspot = require('../services/api');
const ratelimit = require('../utils/ratelimit')

const fs = require('fs');

module.exports = class ContactsController {
    constructor() {
        apiHubspot.post('lists', { "name": `jonathan.bach_dos_santos.${Date.now()}` })
            .then(function (response) {
                global.listId = response.data.listId;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async index(request, response) {
        return response.send('ok')
    }

    async create(request, response) {
        fs.readFile('contatos.csv', 'utf8', async function (err, data) {
            console.log(err)
            let dataArray = data.split(/\r?\n/);


            let vId = [];
            let properties = dataArray[0].split(',')

            dataArray.shift()
            dataArray = dataArray.map((data) => {
                return data ? apiHubspot.post('contact', {
                    "properties": data.split(',').map((aux, index) => {
                        return { property: properties[index].replace('_', ''), value: aux }
                    })
                }) : null

            })


            await Promise.all(dataArray).then(async function (response) {
                for (let i = 0; i < response.length; i++) {
                    vId.push(response[i].data.vid);
                    console.log(await ratelimit(response[i].headers))
                }
            }).catch(function (error) {
                console.log('erro')
            });
            await apiHubspot.post(`lists/${global.listId}/add`, {
                "vids": vId,
                "emails": [
                    "testingapisBACH@hubspot.com"
                ]
            }).catch(function (error) {
                console.log(error);
            });
            return response.send(data)
        });


    }
}
