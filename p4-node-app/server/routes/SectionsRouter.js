const { response } = require('express');
const express = require('express');
const router = express.Router();

const Divisions = require('../models/DivisionsModel');


router.get('/', (request, response) => {
    Divisions.find()
    .select({"sections._id" : 1, "sections.section" : 1, "sections.description" : 1})
    .then(
        result => {
            console.log(result)
            response.send(result)        
        })
})

router.get('/:id', (request, response) => {
    Divisions.sections.findOne({ _id: request.params.id })
    .select({"sections._id" : 1, "sections.section" : 1, "sections.description" : 1})
    .then(
        result => {
            console.log(result)
            response.send(result)        
        })
})

router.post('/:id', async (request, response) => {
    Divisions.updateOne(
        { _id: request.params.id }, 
        { $addToSet: { sections : request.body } })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "New Section added", result : result });
        }
    });
})

router.put('/:id', ( request, response ) => {
    users.findOneAndUpdate( 
        { "sections._id":request.params.id}, 
        { $set: { "sections.$" : request.body } })
    .then( result => {
            response.send({ status: "Post has been updated", result : result});
    });
});

module.exports = router;