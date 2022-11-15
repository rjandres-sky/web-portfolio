const { response } = require('express');
const express = require('express');
const router = express.Router();

const Divisions = require('../models/DivisionsModel');


router.get('/', (request, response) => {
    Divisions.find()
    .select({"_id" : 1, "division" : 1, "description" : 1})
    .then(
        result => {
            console.log(result)
            response.send(result)        
        })
        console.log(users)
})

router.get('/:id', (request, response) => {
    Divisions.findOne({ _id: request.params.id })
    .select({"_id" : 1, "division" : 1, "description" : 1})
    .then(
        result => {
            console.log(result)
            response.send(result)        
        })
        console.log(users)
})

router.post('/add', async (request, response) => {
    Divisions.create(request.body)
    .then(result => {
        response.send({status : "New Division added", result : result})
    })
})

router.put('/:id', ( request, response ) => {
    Division.updateOne(
        { _id: request.params.id }, 
        { $set: request.body  })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "Division has been updated" });
        }
    });
});

router.delete('/:id', ( request, response ) => {
    division.deleteOne({ _id: request.params.id })
    .then( result => {
        if( result.deletedCount === 1 ){
            response.send({
                status: "Division has been deleted"
            });
        }
    });
});

module.exports = router;