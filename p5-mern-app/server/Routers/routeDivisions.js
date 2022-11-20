const express = require('express');
const router = express.Router();

const Divisions = require('../Models/modelDivisions')
const Sections = require('../Models/modelSections')

router.get('/', (request, response) => {
    Divisions.find()
    .populate({path : 'sections', model : 'sections'})

    .then(result => response.send(result))
})

router.get('/:id', (request, response) => {
    Divisions.findOne()
        .populate('sections')
        .then(result => response.send(result))
        .catch(response.send(404))
})

router.post('/', async (request, response) => {
    const division = new Divisions(request.body)
    try {
        await division.save()
        response.status(204).send(division)
    } catch(error) {
        response.status(400).send(error)
    }
    
    // Divisions.create(request.body)
    //     .then(result => {
    //         response.sendStatus(204)}
    //     )
    //     .catch(error => {
    //         console.log(error)
    //         response.sendStatus(400).send({error})
    //     })
}) 

router.put('/:id', (request, response) => {
    Divisions.updateOne(
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
    Divisions.deleteOne({ _id: request.params.id })
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

