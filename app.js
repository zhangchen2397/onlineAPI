var express = require( 'express' ),
    path = require( 'path' ),
    fs = require( 'fs' ),
    mongoose = require( 'mongoose' );

var port = process.env.PORT || 1337,
    dbUrl = 'mongodb://localhost/api',
    app = express();

mongoose.connect( dbUrl );
require( './app/models/category' );
require( './app/models/api' );

app.set( 'views', './app/views' );
app.set( 'view engine', 'ejs' );

app.use( express.bodyParser() );
app.use( express.static( path.join( __dirname, 'static') ) );

require( './app/routes/routes' )( app );

app.listen( port );

console.log( 'onlineAPI started on port ' + port );

