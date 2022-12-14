const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const validation = require('../middleware/validate');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', validation.createUpdatePet, petsController.createPet);

router.put('/:id', validation.createUpdatePet, petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;