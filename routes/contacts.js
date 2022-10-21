const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.createUpdateContact, contactsController.createContact);

router.put('/:id', validation.createUpdateContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;