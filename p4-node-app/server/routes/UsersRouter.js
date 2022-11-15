const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/UsersModel');

router.get('/', (request, response) => {
    users.find()
        .then(
            result => {
                response.send(result)
            })
    console.log(users)
})

router.get('/:id', (request, response) => {
    users.findOne({ "sections.employees._id": request.params.id })
        .then(
            result => {
                console.log(result)
                response.send(result)
            })
    console.log(users)
})

router.post('/', async (request, response) => {
    await bcrypt.hash(request.body.password, 10)
        .then(hashedPassword =>
            users.create({ ...request.body, password: hashedPassword })
                .then(result => {
                    response.send({ status: "New User has been added", result: result });
                })
        )

})

//change password
router.put('/:id/change', async(request, response) => {
    await bcrypt.hash(request.body.password, 10)
        .then(hashedPassword =>
            users.updateOne(
            { _id: request.params.id },
            { $set: { password: hashedPassword } })
            .then(result => {
                if (result.modifiedCount === 1) {
                    response.send({ status: "Password changed", result: result });
                }
            })
        )
});

router.put('/:id', (request, response) => {
    users.updateOne(
        { _id: request.params.id },
        { $set: { "sections.$.employees.$[emp]": request.body } })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.send({ status: "User has been updated", result: result });
            }

        });
});

router.delete('/:id', (request, response) => {
    users.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                response.send({
                    status: "Comment has been deleted"
                });
            }
        });
});

module.exports = router;