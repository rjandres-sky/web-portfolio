const express = require('express');
const router = express.Router();

const Documents = require('../models/DocumentsModel');

router.get('/', (request, response) => {
    Documents.find().populate('document.requestedby', 'section')
    .then(
        result => {
            response.send(result)
        })
})

router.get('/:id', (request, response) => {
    Documents.find({_id : request.params.id})
    .then(
        result => {
            response.send(result)
        })
})

router.post('/', (request, response) => {
    Documents.create(request.body)
    .then( result => 
        response.send({status : "New Document added", result : result})
    )
} )

module.exports = router;


