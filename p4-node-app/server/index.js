const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const port = 8080;

server.use(express.json())
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());

// import routers
const UsersRouter = require('./routes/UsersRouter');
const DivisionsRouter = require('./routes/DivisionsRouter');
const SectionsRouter = require('./routes/SectionsRouter');
const AuthRouter = require('./routes/Auth');
const DocumentsRouter = require('./routes/DocumentsRouter');
const ActionsRouter = require('./routes/ActionsRouter');

mongoose.connect('mongodb://localhost:27017/documenttracking', { useNewUrlParser: true });

server.get('/', (request, response) => {
    response.send(`Welcome to Uplifting API`);
});

server.use('/users', UsersRouter); //users router
server.use('/divisions', DivisionsRouter); //divisions router
server.use('/sections', SectionsRouter); // sections router
server.use('/auth', AuthRouter) //login router
server.use('/documents', DocumentsRouter) //documents router
server.use('/actions', ActionsRouter)

server.listen(
    port,
    () => {
        console.log(`Server running on port ${port}`);
    }
);
