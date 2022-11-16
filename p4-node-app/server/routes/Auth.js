const express = require('express');
const router = express.Router();

// Model
const User = require('../models/UsersModel');

// BCrypt
const bcrypt = require('bcrypt');

router.post('/', ( request, response ) => {
    User.findOne({ username: request.body.username }).then( result => {

        if(result !== null) {
            bcrypt.compare( request.body.password, result.password, ( err, match ) => {
            if( match ){
                // Autheticated, valid email and password
                response.send({ 
                    status: "Valid crendentials", 
                    id: result._id
                });
            }else{
                response.send({
                    status: "Invalid credentials"
                })
            }    
        });
        }
    });
});


module.exports = router;
