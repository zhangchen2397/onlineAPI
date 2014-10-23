var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' ),
    Api = mongoose.model( 'Api' );

exports.add = function( req, res ) {
    var cateId = req.query.cateId;

    res.render( 'editApi', {
        title: '新增API',
        cateId: cateId
    } );
};

exports.save = function( req, res ) {
    var postApiObj = req.body.api,
        cateId = postApiObj.cateId,
        id = req.body.id,
        api = null;

    if ( id ) {

    } else {
        api = new Api( postApiObj );

        api.save( function( err, api ) {
            if ( err ) {
                console.log( err );
            }

            Category.findById( cateId, function( err, category ) {
                category.apis.push( api._id );

                category.save( function( err, category ) {
                    if ( err ) {
                        console.log( err );
                    }

                    res.redirect( '/' );
                } );
            } )
        } );
    }
};

exports.update = function( req, res ) {
    //to do list
};

exports.delete = function( req, res ) {
    //to do list
};
