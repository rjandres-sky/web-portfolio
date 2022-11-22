const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../Models/modelUsers');

router.post('/', (request, response) => {
    User.findOne({$and : [{ username: request.body.username }]})
        .then(result => {
            if (result !== null) {
                bcrypt.compare(request.body.password, result.password, (err, match) => {
                    if (match) {
                        // Autheticated, valid email and password
                        User.findOne({_id : result._id})
                        .select({password : 0})
                        .populate({ path: 'division', select: { sections: 0 } })
                        .populate({ path: 'section', select: { division: 0 } })
                        .then(result => response.status(200).send(result))
                    } else {
                        response.status(400).send('Invalid Username or Password2')
                    }
                });
            }
        })
        .catch(error => response.status(400).send('Invalid Username or Password'))
});


module.exports = router;


