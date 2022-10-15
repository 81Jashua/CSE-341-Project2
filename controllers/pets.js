const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.description = 'Get all pets in Pets db'
  const result = await mongodb.getDb().db('CSE341').collection('pet').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.description = 'Get pet by pet id in Pets db'
  const petId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('pet').find({ _id: petId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPet = async (req, res) => {
  // #swagger.description = 'Create a pet in Pets db. ownerId, name, type, sex, color, birthday, license, habitat, cost, trained'
  const pet = {
    ownerId: req.body.ownerId,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    birthday: req.body.birthday,
    license: req.body.license,
    habitat: req.body.habitat,
    cost: req.body.cost,
    trained: req.body.trained,
  };
  const response = await mongodb.getDb().db('CSE341').collection('pet').insertOne(pet);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the pet.');
  }
};

const updatePet = async (req, res) => {
  // #swagger.description = 'Update pet by id in Pets db'
  const petId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const pet = {
    ownerId: req.body.ownerId,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    birthday: req.body.birthday,
    license: req.body.license,
    habitat: req.body.habitat,
    cost: req.body.cost,
    trained: req.body.trained,
  };
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('pet')
    .replaceOne({ _id: petId }, pet);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the pet.');
  }
};

const deletePet = async (req, res) => {
  // #swagger.description = 'delete pet by id in Pets db'
  const petId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('CSE341').collection('pet').deleteOne({ _id: petId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the pet.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPet,
  updatePet,
  deletePet
};