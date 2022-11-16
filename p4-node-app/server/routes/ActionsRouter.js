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

router.post('/', async (request, response) => {
    Actions.create( request.body )
    .then( result => {
            response.send({ status: "New Action added", result : result });
    });
})

// router.put('/:id', (request, response) => {
//     users.updateOne(
//         { _id: request.params.id },
//         { $set: { "sections.$.employees.$[emp]": request.body } })
//         .then(result => {
//             if (result.modifiedCount === 1) {
//                 response.send({ status: "User has been updated", result: result });
//             }

//         });
// });

// router.delete('/:id', (request, response) => {
//     users.deleteOne({ _id: request.params.id })
//         .then(result => {
//             if (result.deletedCount === 1) {
//                 response.send({
//                     status: "Comment has been deleted"
//                 });
//             }
//         });
// });

module.exports = router;