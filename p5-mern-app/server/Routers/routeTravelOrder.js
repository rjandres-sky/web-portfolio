const express = require('express');
const router = express.Router();

const TravelOrders = require('../Models/modelTravelOrder')

router.get('/', (request, response) => {
    TravelOrders.find()
        .select({ password: 0 })
        .populate({ path: 'employee', select: 'name extention position division section '  })
        .then(result => response.send(result))
})

router.post('/', async (request, response) => {
    const travelorder = new TravelOrders({ ...request.body })
    travelorder.save()
        .then(result => {
            response.status(204).send(result);
        })
        .catch(error => response.status(400).send(error))
})

router.put('/:id', (request, response) => {
    TravelOrders.updateOne(
        { _id: request.params.id },
        { $set: { ...request.body } })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.status(204).send(result);
            }
        })
        .catch(error => response.status(400).send(error))
});

router.delete('/:id', (request, response) => {
    TravelOrders.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                response.status(204).send({
                    status: "Travel Order has been deleted"
                });
            }
        })
        .catch(error => response.status(400).send(error))
});

module.exports = router



