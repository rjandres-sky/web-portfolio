const { response } = require('express');
const express = require('express');
const router = express.Router();

const Sections = require('../models/SectionsModel');


router.get('/', (request, response) => {
    Sections.find()
        .populate('division')
        .then(
            result => {
                console.log(result)
                response.send(result)
            })
            .catch(response.send(404))
})

router.get('/:id', (request, response) => {
    Sections.findOne({ _id: request.params.id })
        .populate('division')
        .then(
            result => {
                console.log(result)
                response.send(result)
            })
            .catch(response.send(404))
})

router.post('/', async (request, response) => {
    Sections.create(request.body)
        .then(result => {
            response.send({ status: "New Section added", result: result });
        })
        .catch(response.send(404))
})

router.put('/:id', (request, response) => {
    Sections.updateOne(
        { _id: request.params.id },
        { $set: { ...request.body } })
        .then(result => {
            response.send({ status: "Post has been updated", result: result });
        })
        .catch(response.send(404))
});

module.exports = router;