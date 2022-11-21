const express = require('express');
const router = express.Router();

const Sections = require('../Models/modelSections')
const Divisions = require('../Models/modelDivisions')

router.get('/:id', (request, response) => {
    Sections.find({division : request.params.id})
    .then(result => response.send(result))
})

router.post('/', async (request, response) => {
    const section = new Sections(request.body)
    await section.save()
    .then(result => {
        console.log(result)
        Divisions.updateOne(
            {_id : request.body.division},
            {$push : {sections : result._id.toString()}}
            )
        response.status(204).send(section)
    })
    .catch(error => response.status(400).send(error))
}) 

router.put('/:id', (request, response) => {
    Sections.updateOne(
        { _id: request.params.id },
        { $set: request.body })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.status(204).send(result);
            }
        })
        .catch(error => response.status(404).send(error))
})

router.delete('/:id', (request, response) => {
    Sections.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                Divisions.updateOne(
                    {_id : request.body.division},
                    {$pull : {sections : request.params.id}}
                    ).then(res => console.log(res))

                response.status(204).send(result);
            }
        })
        .catch(error => response.status(404).send(error))
});

module.exports = router

