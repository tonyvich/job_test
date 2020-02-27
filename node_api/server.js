/**
 * @author Marc TONYE
 * 
 * This file is the entry point of node js Server
 */

/**
 * Global requirements
 */  
const express           = require( 'express' );            
const bodyParser        = require( 'body-parser' );      
const helper            = require( './global_functions' );
const cors              = require('cors');



/** 
 * Global vars
 */
const app               = express();
const server            = require('http').createServer(app);
var products            = helper.readJsonFile( 'products.json' );
var currentMaxId        = products[ products.length -1 ]._id;       // Get the last id for auto increment while saving new product
const io                = require('socket.io').listen(server);

app.use(cors());                                                    // Allow request from Cross origin

app.use( bodyParser.urlencoded({ extended: false }) ); // parse application/json

/** 
 * Product API
 */
    
/** 
 * GET /products
 * Display the list of stored products
 */ 
app.get( '/products', function( request, result ){
    result.writeHead( 200, { "Content-type": "text/json"} );
    result.write( JSON.stringify(products) );
    result.end();
});

/** 
 * GET /product/{id}
 * Get one product
 */ 
app.get( '/product/:id', function( request, result ){

    // Loop to find the product with the matching _id
    productId           = request.params.id;
    position            = 0;                    // Store the position of the matching product
    found               = false;                // Control if the product is found
    productMatching     = {};

    i = 0;
    products.forEach( product => {
        if ( product._id == productId ) {
            found = true;
            position = i;
            productMatching = product
        }
        i++;
    });
    
    // Handle not existing ids
    if( !found ) {
        result.writeHead( 404, {'Content-Type': 'text/json'} );
        result.end( JSON.stringify( { message: 'Produit Introuvable' } ) );    
    }

    // Response
    result.writeHead( 200, { "Content-type": "text/json"} );
    result.write( JSON.stringify( productMatching ) );
    result.end();
});

/** 
 * POST /product
 * Store a product
 */
app.post( '/product', function( request, result ) {
    // Save Product
    var product = {
        _id:            currentMaxId++,
        name:           request.body.name,
        type:           request.body.type,
        price:          parseFloat(request.body.price),
        warranty_years: parseInt(request.body.rating),
        rating:         parseFloat(request.body.rating),
        available:      ( request.body.available == 'true' ) ? true : false
    };
    products[ products.length ] = product;
    
    // Response
    result.writeHead( 200, {'Content-Type': 'text/json'} );
    result.end( JSON.stringify( { message: 'le produit à été correctement enregistré' } ) );
});


/** 
 * POST /product/{_id}
 * edit a product
 */
app.post( '/product/:id', function( request, result ) {
    
    // Loop to find the product with the matching _id
    productId           = request.params.id;
    editableProduct     = {};
    counter             = 0;                    // Store the position of the matching product
    found               = false;                // Control if the product is found
    
    products.forEach( product => {
        if ( product._id == productId ) {
            editableProduct = product;
            found = true;
            counter++;
            return;
        }
    });

    // Handle not existing ids
    if( !found ) {
        result.writeHead( 404, {'Content-Type': 'text/json'} );
        result.end( JSON.stringify( { message: 'Produit Introuvable' } ) );    
    }
    
    // Save Product
    editableProduct.name            = ( request.body.name != undefined )? request.body.name : editableProduct.name;
    editableProduct.type            = ( request.body.type != undefined )? request.body.type : editableProduct.type;
    editableProduct.price           = ( request.body.price != undefined )? parseFloat(request.body.price) : editableProduct.price;
    editableProduct.rating          = ( request.body.rating != undefined )? parseFloat(request.body.rating) : editableProduct.rating;
    editableProduct.warranty_years  = ( request.body.warranty_years != undefined )? parseInt( request.body.warranty_years ) : editableProduct.warranty_years;
    editableProduct.available       = ( request.body.available != undefined )? ( request.body.available == 'true' ) ? true : false : editableProduct.available;
    
    // Response
    result.writeHead( 200, {'Content-Type': 'text/json'} );
    result.end( JSON.stringify( { message: 'le produit à été correctement modifié' } ) );
});

 /** 
 * DELETE /product{_id}
 * Delete a product
 */
app.delete( '/product/:id', function( request, result ) {
    
    // Loop to find the product with the matching _id
    productId           = request.params.id;
    position            = 0;                    // Store the position of the matching product
    found               = false;                // Control if the product is found
    
    i = 0;
    products.forEach( product => {
        if ( product._id == productId ) {
            found = true;
            position = i;
        }
        i++;
    });
    
    // Handle not existing ids
    if( !found ) {
        result.writeHead( 404, {'Content-Type': 'text/json'} );
        result.end( JSON.stringify( { message: 'Produit Introuvable' } ) );    
    }
    
    // Delete Product
    products.splice( position, 1 );

    // Emit Socket
    io.emit("reloadProducts", products);

    // Response
    result.writeHead( 200, {'Content-Type': 'text/json'} );
    result.end( JSON.stringify( { message: 'le produit à été correctement supprimé' } ) );
});

/** 
 * Server Startup 
*/
server.listen(8888, function () {
    console.log('Node Product API Listening on port 8888')
})