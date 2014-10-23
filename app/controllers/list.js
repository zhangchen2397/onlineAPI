var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' ),
    Api = mongoose.model( 'Api' );

exports.list = function( req, res ) {
    var cateId = req.params.id;

    Category.find( {
        _id: cateId
    } ).populate( {
        path: 'apis'
    } ).exec( function( err, categorys ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'list', {
            title: '列表页',
            category: categorys[ 0 ]
        } );
    } );
};

