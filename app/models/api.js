var mongoose = require( 'mongoose' ),
    ApiSchema = require( '../schemas/api' ),
    Api = mongoose.model( 'Api', ApiSchema );

module.exports = Api;
