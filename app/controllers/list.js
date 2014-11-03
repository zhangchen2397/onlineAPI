var mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' ),
    Api = mongoose.model( 'Api' );

exports.list = function( req, res ) {
    var cateId = req.params.id;

    Category.find( {
        _id: cateId
    } )
    .sort( 'meta.updateAt' )
    .populate( {
        path: 'apis'
    } )
    .sort( 'meta.updateAt' )
    .exec( function( err, categorys ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'list', {
            title: 'API接口文档 - ' + categorys[ 0 ].name,
            category: categorys[ 0 ]
        } );
    } );
};

