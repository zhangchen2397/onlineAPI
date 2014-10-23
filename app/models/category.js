var mongoose = require( 'mongoose' ),
    CategorySchema = require( '../schemas/category' ),
    Category = mongoose.model( 'Category', CategorySchema );

module.exports = Category;
