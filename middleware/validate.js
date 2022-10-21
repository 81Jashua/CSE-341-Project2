const validator = require('../helpers/validate');

const createUpdateContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    birthday: 'string',
    phone: 'string',
    address: 'string',
    city: 'string',
    state: 'string',
    zip: 'numeric'    
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Contact Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const createUpdatePet = (req, res, next) => {
  const validationRule = {
    ownerId: 'required|string',
    name: 'required|string',
    type: 'required|string',
    color: 'required|string',
    birthday: 'string',
    license: 'boolean',
    habitat: 'string',
    cost: 'numeric',
    trained: 'boolean'
  };  

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Contact Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createUpdateContact, createUpdatePet
};