$( function() {
    var pageRun = {
        init: function() {
            this._cacheDom();
            this._initEvent();
        },

        _cacheDom: function() {

        },

        _initEvent: function() {
            var me = this;

            $( '#J-api-list' ).delegate( '.delete-btn', 'click', function() {
                var item = $( this ),
                    id = item.data( 'id' ),
                    itemParent = item.parent();

                $.ajax( {
                    type: 'DELETE',
                    url: '/api/delete/' + id
                } ).done( function( data ) {
                    if ( data.status.code === 0 ) {
                        itemParent.remove();
                    }
                } ).fail( function( data ) {
                    console.log( data );
                } );
            } );
        }
    };

    pageRun.init();
} );