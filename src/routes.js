const express = require("express");
const ContactsController = require("./controllers/ContactsControlles");

const routes = express.Router();
const contactsController = new ContactsController();

routes.get("/contacts", contactsController.index);
routes.post("/contacts", contactsController.create);

module.exports = routes;
