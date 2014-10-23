var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' );

exports.index = function( req, res ) {
    Category.fetch( function( err, catetories ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'index', {
            title: 'API接口文档首页',
            catetories: catetories
        } );
    } );
};


