const express = require('express');
const router = express.Router();

const Actions = require('../models/ActionsModel');

router.get('/:id', (request, response) => {
    Actions.find({documentno : request.params.id})
    .populate({path : 'createdby', select : 'name', 
    populate : {path : 'section', select : 'section'}})
        .then(
            result => {
                response.send(result)
            })
})

router.get('/', (request, response) => {
    Actions.find()
    .populate({path : 'createdby', select : 'name', 
    populate : {path : 'section', select : 'section',
    populate : 'division'
}})
        .then(
            result => {
                response.send(result)
            })
})

router.post('/', async (request, response) => {
    Actions.create( request.body )
    .then( result => {
            response.send({ status: "New Action added", result : result });
    });
})


module.exports = router;