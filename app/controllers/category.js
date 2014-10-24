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
    var postCateObj = req.body.category,
        id = postCateObj._id;

    var responseJson = {
        status: {
            code: 0,
            msg: null
        },
        data: {

        }
    };

    Category.findById( {
        _id: id
    }, function( err, category ) {
        if ( err ) {
            console.log( err );
        }

        category = _.extend( category, postCateObj );

        category.save( function( err, category ) {
            if ( err ) {
                console.log( err );
                responseJson.status.code = 1;
            }

            res.json( responseJson );
        } );
    } );
};

exports.delete = function( req, res ) {
    var id = req.params.id;
    var responseJson = {
        status: {
            code: 0,
            msg: null
        },
        data: {

        }
    };

    Category.remove( {
        _id: id
    }, function( err, api ) {
        if ( err ) {
            console.log( err );
            responseJson.status.code = 1;
        }

        res.json( responseJson );
    } );
};
