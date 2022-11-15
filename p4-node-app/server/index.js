const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server  = express();
const port = 8080;

server.use(express.json())
server.use( morgan('dev') );
server.use( cors() );
server.use( bodyParser.json() );
//server.use( helmet() );

// import routers
const UsersRouter = require('./routes/UsersRouter')
const DivisionsRouter = require('./routes/DivisionsRouter')
const SectionsRouter = require('./routes/SectionsRouter')

mongoose.connect('mongodb://localhost:27017/documenttracking', { useNewUrlParser: true });

server.get('/', ( request, response ) => {
    response.send(`Welcome to Uplifting API`);
});

server.use('/users', UsersRouter ); //user router
server.use('/divisions', DivisionsRouter ); //divisions router
server.use('/sections', SectionsRouter ); // sections router


server.listen(
    port, 
    () => {
        console.log(`Server running on port ${ port }`);
    }
);
