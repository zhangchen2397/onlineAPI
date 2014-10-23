var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' ),
    Api = mongoose.model( 'Api' );

exports.add = function( req, res ) {
    var category = new Category( {
        name: req.body.name
    } );

    var responseJson = {
        status: {
            code: 0,
            msg: null
        },
        data: {

        }
    };

    category.save( function( err, category ) {
        if ( err ) {
            console.log( err );
            responseJson.status.code = 1;
        } else {
            responseJson.data = category;
        }

        res.json( responseJson );
    } );
};

exports.update = function( req, res ) {
    //to do list
};

exports.delete = function( req, res ) {
    //to do list
};
