$( function() {
    var pageRun = {
        init: function() {
            this._cacheDom();
            this._initAce();
            this._initEvent();
        },

        _cacheDom: function() {

        },

        _initEvent: function() {
            var me = this;

            $( '.edit-btn' ).on( 'click', function( event ) {
                event.stopPropagation();
            } );

            $( '.delete-btn' ).on( 'click', function( event ) {
                event.stopPropagation();

                var item = $( this ),
                    id = item.data( 'id' ),
                    title = item.data( 'title' );

                $( '#deleteDialog .modal-body' ).html( '确定要删除<strong> ' + title + ' </strong>吗？' );

                me.deleteApiId = id;

                $( '#deleteDialog' ).modal( 'show' );
            } );

            $( '#confirm-delete-btn' ).on( 'click', function() {
                var id = me.deleteApiId;

                $.ajax( {
                    type: 'GET',
                    url: '/api/delete/' + id
                } ).done( function( data ) {
                    if ( data.status.code === 0 ) {
                        $( '#deleteDialog' ).modal( 'hide' );
                        $( '.panel-' + id ).remove(); 
                    }
                } ).fail( function( data ) {
                    console.log( data );
                } );
            } );
        },

        _initAce: function() {
            var me = this;

            $( '.code-edit' ).each( function() {
                var item = $( this ),
                    editVal = item.data( 'json' ),
                    idx = item.data( 'idx' ),
                    curEditor = 'editor' + idx;

                item.html( js_beautify( JSON.stringify( editVal ) ) );

                //init ace
                me[ curEditor ] = ace.edit( curEditor );
                me[ curEditor ].setTheme( 'ace/theme/twilight' );
                me[ curEditor ].getSession().setMode( 'ace/mode/javascript' );
                me[ curEditor ].setReadOnly( true );
            } );
        }
    };

    pageRun.init();
} );