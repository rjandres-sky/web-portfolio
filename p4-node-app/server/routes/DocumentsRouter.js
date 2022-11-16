const express = require('express');
const router = express.Router();

const Documents = require('../models/DocumentsModel');

router.get('/', (request, response) => {
    Documents.find()
        .populate({
            path: 'document.requestedby', select : 'name position',
                populate: { path: 'section', 
                populate: { path: 'division', } }
        })
        .then(
            result => {
                response.send(result)
            })
})

router.get('/:id', (request, response) => {
    Documents.find({ _id: request.params.id })
    .populate({
        path: 'document.requestedby', select : 'name position',
            populate: { path: 'section', 
            populate: { path: 'division', } }
    })
        .then(
            result => {
                console.count
                response.send(result)
            })
})

router.post('/', (request, response) => {
    Documents.create(request.body)
        .then(result =>
            response.send({ status: "New Document added", result: result })
        )
})

router.put('/:id', ( request, response ) => {
    Documents.updateOne(
        { _id: request.params.id }, 
        { $set: request.body  })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "Document has been updated" });
        }
    });
});

module.exports = router;


