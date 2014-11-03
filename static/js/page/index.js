$( function() {
    var pageRun = {
        init: function() {
            this._cacheDom();
            this._initAce();
            this._initEvent();
        },

        _cacheDom: function() {
            this.newCateIpt = $( '#J-new-cate-ipt' );
            this.cateSlt = $( '#J-cate-slt' );
        },

        _initEvent: function() {
            var me = this;

            this.cateSlt.on( 'change', function( event ) {
                var curValue = $( this ).val();
                if ( !curValue ) {
                    me.newCateIpt.show();
                } else {
                    me.newCateIpt.val( '' );
                    me.newCateIpt.hide();
                }
            } );

            $( '#J-newapi-btn' ).on( 'click', function( event ) {
                var curCateIdVal = me.cateSlt.val(),
                    newCateVal = me.newCateIpt.val();

                if ( curCateIdVal ) {
                    me._goAddApi( curCateIdVal );
                } else {
                    if ( !newCateVal ) {
                        alert( '请先选择所属项目' );
                    } else {
                        me._ajaxAddCate( newCateVal );
                    }
                }
            } );

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

            $( '.call-btn' ).on( 'click', function( event ) {
                event.stopPropagation();
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

        _ajaxAddCate: function( name ) {
            var me = this;

            $.ajax( {
                url: '/category/add',
                type: 'post',
                data: {
                    name: name
                }
            } ).done( function( data ) {
                if ( data.status.code == 0 ) {
                    me._goAddApi( data.data._id );
                }
            } ).fail( function( data ) {
                console.log( data );
            } );
        },

        _goAddApi: function( cateId ) {
            location.href = '/api/add/?cateId=' + cateId;
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