/**
 * @author Marc TONYE
 * 
 * This file is the entry point of node js Server linked to mongo db database
 */

/** 
 * Global requirements
 */  
const express           = require( 'express' );            
const bodyParser        = require( 'body-parser' );      
const helper            = require( './global_functions' );
const cors              = require('cors');
const mongoClient       = require('mongodb').MongoClient;
const assert            = require('assert');
ObjectID                = require('mongodb').ObjectID;



/** 
 * Global vars
 */
const app               = express();
const server            = require('http').createServer(app);
const io                = require('socket.io').listen(server);

const mongoDbUrl        = 'mongodb://localhost:27017';
const mongoDbName       = 'beta_remit_test';

app.use(cors());                                                    // Allow request from Cross origin

app.use( bodyParser.urlencoded({ extended: false }) );              // parse application/json

/** 
 * Product API
 */
    
/** 
 * GET /products
 * Display the list of stored products
 */ 
app.get( '/products', function( request, result ){
    (async function() {
        const client = new mongoClient( mongoDbUrl );    
        try {
            await client.connect();
            const database      = client.db( mongoDbName );
            const collection    = database.collection( 'products' );
            // Load product to send 
            const products      = await collection.find({}).toArray();
            // Response
            result.writeHead( 200, { "Content-type": "text/json"} );
            result.write( JSON.stringify(products) );
            result.end();
        } catch (err) {
            console.log(err.stack);
            // Response
            result.writeHead( 500, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'Une erreur s\'est produite' } ) );
        }
        // Close connection
        client.close();
    })();
    
});

/** 
 * GET /product/{id}
 * Get one product
 */ 
app.get( '/product/:id', function( request, result ){
    productId           = new ObjectID(request.params.id);

    (async function() {
        const client = new mongoClient( mongoDbUrl );    
        try {
            await client.connect();
            const database              = client.db( mongoDbName );
            const collection            = database.collection( 'products' );
            // Load product to send 
            const productMatching      = await collection.findOne({ "_id": productId });
            // Response
            result.writeHead( 200, { "Content-type": "text/json"} );
            result.write( JSON.stringify( productMatching ) );
            result.end();
        } catch (err) {
            console.log(err.stack);
            // Response
            result.writeHead( 500, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'Une erreur s\'est produite' } ) );
        }
        // Close connection
    })();

});

/** 
 * POST /product
 * Store a product
 */
app.post( '/product', function( request, result ) {
    // Save Product
    var product = {
        name:           request.body.name,
        type:           request.body.type,
        price:          parseFloat(request.body.price),
        warranty_years: parseInt(request.body.rating),
        rating:         parseFloat(request.body.rating),
        available:      ( request.body.available == 'true' ) ? true : false
    };
    
    /** 
     * Save in mongo db
    */
    (async function() {
        const client = new mongoClient( mongoDbUrl );
      
        try {
            await client.connect();
            const database      = client.db( mongoDbName );
            const collection    = database.collection( 'products' );
           
            let request = await collection.insertOne( product );
            assert.equal(1, request.insertedCount);
            // Response
            result.writeHead( 200, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'le produit à été correctement enregistré' } ) );
        } catch (err) {
            console.log(err.stack);
            // Response
            result.writeHead( 500, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'Une erreur s\'est produite' } ) );
        }
      
        // Close connection
        client.close();
    })();

    
});


/** 
 * POST /product/{_id}
 * edit a product
 */
app.post( '/product/:id', function( request, result ) {
    // Product id
    productId                       =  new ObjectID (request.params.id);
    // Save Product
    editableProduct                 = {};
    editableProduct.name            = ( request.body.name != undefined )? request.body.name : editableProduct.name;
    editableProduct.type            = ( request.body.type != undefined )? request.body.type : editableProduct.type;
    editableProduct.price           = ( request.body.price != undefined )? parseFloat(request.body.price) : editableProduct.price;
    editableProduct.rating          = ( request.body.rating != undefined )? parseFloat(request.body.rating) : editableProduct.rating;
    editableProduct.warranty_years  = ( request.body.warranty_years != undefined )? parseInt( request.body.warranty_years ) : editableProduct.warranty_years;
    editableProduct.available       = ( request.body.available != undefined )? ( request.body.available == 'true' ) ? true : false : editableProduct.available;
    
    /** 
     * Save in mongo db
    */
    (async function() {
        const client = new mongoClient( mongoDbUrl );    
        try {
            await client.connect();
            const database      = client.db( mongoDbName );
            const collection    = database.collection( 'products' );
            let request         = await collection.updateOne( { "_id": productId }, { $set : editableProduct });
            assert.equal(1, request.matchedCount);
            assert.equal(1, request.modifiedCount);
        } catch (err) {
            console.log(err.stack);
        }
        // Close connection
        client.close();
    })();

    // Response
    result.writeHead( 200, {'Content-Type': 'text/json'} );
    result.end( JSON.stringify( { message: 'le produit à été correctement modifié' } ) );
});

 /** 
 * DELETE /product{_id}
 * Delete a product
 */
app.delete( '/product/:id', function( request, result ) {
    // Product id
    productId                       =  new ObjectID (request.params.id);
    /** 
     * Save in mongo db
    */
    (async function() {
        const client = new mongoClient( mongoDbUrl );    
        try {
            await client.connect();
            const database      = client.db( mongoDbName );
            const collection    = database.collection( 'products' );
            let request         = await collection.deleteOne( { "_id": productId } );
            assert.equal(1, request.deletedCount);
            // Load product to send as socket signal
            const products      = await collection.find({}).toArray();
            console.log( products );
            // Emit Socket
            io.emit("reloadProducts", products);
            // Response
            result.writeHead( 200, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'le produit à été correctement supprimé' } ) );
        } catch (err) {
            console.log(err.stack);
            // Response
            result.writeHead( 500, {'Content-Type': 'text/json'} );
            result.end( JSON.stringify( { message: 'Une erreur s\'est produite' } ) );
        }
        // Close connection
        client.close();
    })();
});

/** 
 * Server Startup 
*/
server.listen(8888, function () {
    console.log('Node Product API With Mongo DB Listening on port 8888')
})