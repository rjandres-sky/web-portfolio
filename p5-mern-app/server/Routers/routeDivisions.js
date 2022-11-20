const express = require('express')
const router = express.Router()

const divisions = require('../Models/modelDivisions')

router.get('/', (request, response) => {
    divisions.find()
        .populate('sections')
        .then(result => request.send(result))
        .catch(response.send(404))
})

router.get('/:id', (request, response) => {
    divisions.findOne()
        .populate('sections')
        .then(result => request.send(result))
        .catch(response.send(404))
})

router.post('/', async (request, response) => {
    divisions.create(request.body)
        .then(result => {
            response.send({ status: "New Division added", result: result })
        })
        .catch(response.send(404))
})

router.put('/:id', (request, response) => {
    divisions.updateOne(
        { _id: request.params.id },
        { $set: request.body })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.send({ status: "Division has been updated" });
            }
        })
        .catch(response.send(404))
})

router.delete('/:id', (request, response) => {
    divisions.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                response.send({
                    status: "Division has been deleted"
                });
            }
        })
        .catch(response.send(404))
});

module.exports = router

