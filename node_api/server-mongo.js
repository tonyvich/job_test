/**
 * @author Marc TONYE
 * 
 * This file is the entry point of node js Server linked to mongo db database
 */

/** 
 * Global requirements
 */  
const express           = require( 'express' );            
const cors              = require('cors');
ObjectID                = require('mongodb').ObjectID;
require('./schema/db')

/** 
 * Global vars
 */
const app               = express();
const server            = require('http').createServer(app);
const port              = process.env.PORT

// Socket Io Conf
const io                = require('socket.io').listen(server);
app.set('socket_io', io);

// Other confs
app.use(cors());                                                    // Allow request from Cross origin

// Registering Controllers
const userRouter        = require( './controllers/userController' );
const productRouter     = require( './controllers/productController' );
app.use( userRouter );
app.use( productRouter );

/** 
 * Server Startup 
*/
server.listen(port, function () {
    console.log('Node Product API With Mongo DB Listening on port' + port)
})