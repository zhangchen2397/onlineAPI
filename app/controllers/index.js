var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' );

exports.index = function( req, res ) {
    Category.find( {} ).populate( {
        path: 'apis',
        options: { limit: 2 }
    } ).exec( function( err, categorys ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'index', {
            title: 'API接口文档首页',
            categorys: categorys
        } );
    } );
};


