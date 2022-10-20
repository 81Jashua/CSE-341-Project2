const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
   // #swagger.description = 'Get all contacts in Contacts db'
   mongodb.getDb().db('CSE341').collection('contacts').find().toArray((err, lists) => {
     if (err) {
       res.status(400).json({message: err});
     }
     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(lists);
   });
 };

const getSingle = (req, res) => {
  // #swagger.description = 'Get contact by contact id in Contacts db'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb.getDb().db('CSE341').collection('contacts').find({ _id: userId }).toArray((err, result) => {
    if (err) {
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

const createContact = async (req, res) => {
  // #swagger.description = 'Create a contacts in Contacts db. first, last, email, fav color, birthday'
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip    
  };
  const response = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  // #swagger.description = 'Update contact by id in Contacts db'
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip    
  };
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  // #swagger.description = 'delete contact by id in Contacts db'
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('CSE341').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};