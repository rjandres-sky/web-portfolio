const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../Models/modelUsers')

router.get('/', (request, response) => {
    Users.find()
        .select({ password: 0 })
        .populate({ path: 'division', select : {sections : 0}})
        .populate({ path: 'section', select : {division : 0}})
        .then(result => response.send(result))
})

router.post('/', async (request, response) => {
    await bcrypt.hash(request.body.password, 10)
        .then((hashedPassword) => {
            const user = new Users({ ...request.body, password: hashedPassword })
            user.save()
                .then(result => {
                    response.status(204).send(result);
                })
                .catch(error => response.status(400).send(error))
        })
        .catch(error => response.status(400).send(error))

})

router.put('/:id/change', async (request, response) => {
    await bcrypt.hash(request.body.password, 10)
        .then(hashedPassword =>
            Users.updateOne(
                { _id: request.params.id },
                { $set: { password: hashedPassword } })
                .then(result => {
                    if (result.modifiedCount === 1) {
                        response.status(204).send({ status: "Password changed" });
                    }
                })
                .catch(error => response.status(400).send(error))
        )
        .catch(response.send("Invalid Password"))
});

router.put('/:id', (request, response) => {
    Users.updateOne(
        { _id: request.params.id },
        { $set: { ...request.body } })
        .then(result => {
            if (result.modifiedCount === 1) {
                response.status(204).send({ status: "User has been updated" });
            }
        })
        .catch(response.status(400).send(404))
});

router.delete('/:id', (request, response) => {
    Users.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                response.status(204).send({
                    status: "Users has been deleted"
                });
            }
        })
        .catch(error => response.status(400).send(error))
});

module.exports = router



