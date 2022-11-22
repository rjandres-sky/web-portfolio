const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../Models/modelUsers');

router.post('/', (request, response) => {
    User.findOne({ username: request.body.username })
        .select({ password: 0 })
        .populate({ path: 'division', select: { sections: 0 } })
        .populate({ path: 'section', select: { division: 0 } })
        .then(result => {
            if (result !== null) {
                bcrypt.compare(request.body.password, result.password, (err, match) => {
                    if (match) {
                        // Autheticated, valid email and password
                        response.status(200).send(result);
                    } else {
                        response.status(400).send('Invalid Username or Password')
                    }
                });
            }
        })
        .catch(error => response.status(400).send('Invalid Username or Password'))
});


module.exports = router;


