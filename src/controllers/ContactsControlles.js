const hubspot = require('@hubspot/api-client');
const apiHubspot = require('../services/api');

module.exports = class ContactsController {
    constructor() {
        apiHubspot.post('lists?hapikey=demo', {"name":`jonathan.bach_dos_santos.${Date.now()}`})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    async index(request, response) {
        return response.send('ok')
    }

    async create(request, response) {

        const contactObj = {
            properties: {
                firstname: 'Jonathan',
                lastname: 'Bach'
            }
        };
        const companyObj = {
            properties: {
                domain: 'somapp.com',
                name: 'somapp'
            }
        };

        try {
            const hubspotClient = new hubspot.Client({ apiKey: 'ae4319f0-8941-432e-a3ca-da7487edef32' });
            const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)
            const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create(companyObj)
            await hubspotClient.crm.companies.associationsApi.create(createCompanyResponse.body.id, 'contacts', createContactResponse.body.id)
            return response.send('sucesso');
        } catch (error) {
            return response.send('erro');
        }


    }
}
