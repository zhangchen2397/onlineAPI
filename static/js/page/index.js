$( function() {
    var pageRun = {
        init: function() {
            this._cacheDom();
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
        }
    };

    pageRun.init();
} );