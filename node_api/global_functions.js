/**
 * @author Marc TONYE
 * @description This file regroup basic functions for the app
 */

const fs                = require( 'fs' );                  // For file reading

exports.readJsonFile = function( filename ) {
    raw = fs.readFileSync( filename );
    return JSON.parse( raw );
}

exports.writeJsonFIle = function( filename, content ){
    try {
        fs.writeFileSync( filename, content );
    } catch (error) {
        console.log( 'Something wrong hapenned while saving ' + filename );
    }
}