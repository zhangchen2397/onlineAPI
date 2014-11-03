var _ = require( 'underscore' ),
    mongoose = require( 'mongoose' ),
    Category = mongoose.model( 'Category' ),
    Api = mongoose.model( 'Api' );

exports.add = function( req, res ) {
    var cateId = req.query.cateId,
        api = {};

    api.cateId = cateId;

    Category.findById( cateId, function( err, category ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'api', {
            title: '新增API - ' + category.name,
            api: api
        } );
    } );
};

exports.save = function( req, res ) {
    var postApiObj = req.body.api,
        cateId = postApiObj.cateId,
        id = postApiObj._id,
        api = null;

    if ( id ) {
        Api.findById( id, function( err, api ) {
            if ( err ) {
                console.log( err );
            }

            api = _.extend( api, postApiObj );

            api.save( function( err, api ) {
                if ( err ) {
                    console.log( err );
                }

                res.redirect( '/list/' + cateId );
            } );
        } );
    } else {
        api = new Api( postApiObj );

        api.save( function( err, api ) {
            if ( err ) {
                console.log( err );
            }

            Category.findById( cateId, function( err, category ) {
                category.apis.unshift( api._id );

                category.save( function( err, category ) {
                    if ( err ) {
                        console.log( err );
                    }

                    res.redirect( '/list/' + cateId );
                } );
            } );
        } );
    }
};

exports.update = function( req, res ) {
    var id = req.params.id;

    Api.findById( id, function( err, api ) {
        if ( err ) {
            console.log( err );
        }

        res.render( 'api', {
            title: JSON.parse( api.baseInfo ).name + ' - 更新',
            api: api
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

    Api.remove( {
        _id: id
    }, function( err, api ) {
        if ( err ) {
            console.log( err );
            responseJson.status.code = 1;
        }

        res.json( responseJson );
    } );
};

exports.call = function( req, res ) {
    var id = req.params.id;
    
    Api.findById( id, function( err, api ) {
        if ( err ) {
            console.log( err );
        }

        res.json( JSON.parse( api.responseData ) );
    } );
};
