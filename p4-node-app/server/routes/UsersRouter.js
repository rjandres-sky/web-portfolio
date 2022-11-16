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
        .catch(response.send(404))
})

router.get('/:id', (request, response) => {
    users.findOne({ "sections.employees._id": request.params.id })
        .then(
            result => {
                console.log(result)
                response.send(result)
            })
        .catch(response.send(404))
})

router.post('/', async (request, response) => {
    await bcrypt.hash(request.body.password, 10)
        .then(hashedPassword =>
            users.create({ ...request.body, password: hashedPassword })
                .then(result => {
                    response.send({ status: "New User has been added", result: result });
                })
                .catch(response.send(404))
        )
        .catch(response.send("Invalid password"))

})

//change password
router.put('/:id/change', async (request, response) => {
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
                .catch(response.send(404))
        )
        .catch(response.send("Invalid Password"))
});

router.put('/:id', (request, response) => {
    users.updateOne(
        { _id: request.params.id },
        { $set: { ...request.body } })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.send({ status: "User has been updated", result: result });
            }
        })
        .catch(response.send(404))
});

router.delete('/:id', (request, response) => {
    users.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                response.send({
                    status: "Users has been deleted"
                });
            }
        })
        .catch(response.send(404))
});

module.exports = router;