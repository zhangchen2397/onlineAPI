var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' );

exports.index = function( req, res ) {
    Category.find( {} )
    .sort( 'meta.createAt' )
    .populate( {
        path: 'apis',
        options: { limit: 5 }
    } ).exec( function( err, categorys ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'index', {
            title: 'API接口文档 - 首页',
            categorys: categorys
        } );
    } );
};


