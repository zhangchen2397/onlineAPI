$( function() {
    var defaultApi = {
        base: {
            "method": "GET",
            "name": "热门推荐列表接口",
            "url": "请求url"
        },

        request: {
            "action": {
                "type": "string",
                "describe": "首页焦点图action",
                "value": "top_operating",
                "isMust": true
            },
            "limit": {
                "type": "int",
                "describe": "显示数目限制",
                "value": 6,
                "isMust": false
            },
            "sid": {
                "type": "string",
                "describe": "用户SID",
                "value": "",
                "isMust": true
            }
        },

        response: {
            "id": {
                "type": "int",
                "describe": "旅游详情页id",
                "value": 1938
            },
            "title": {
                "type": "string",
                "describe": "旅游产品标题",
                "value": "澳门3天2晚自由行"
            },
            "image": {
                "type": "string",
                "describe": "封面图片url",
                "value": "travel_6_5423df81a7e82"
            }
        },

        demo: {
            "data": {
                "list": [
                    {
                        "title": "攻略",
                        "image_size": "80X320",
                        "cmtCount": 8982
                    },
                    {
                        "title": "去哪儿网",
                        "image_size": "80X320",
                        "cmtCount": 8982
                    }
                ]
            },
            "code": 0,
            "msg": "成功"
        }
    };

    var pageRun = {
        init: function() {
            this._cacheDom();
            this._initEditor();
            this._initEvent();
        },

        _cacheDom: function() {

        },

        _initEditor: function() {
            this._insAce( 'base', 'base-info' );
            this._insAce( 'request', 'request-info' );
            this._insAce( 'response', 'response-info' );
            this._insAce( 'demo', 'demo-info' );
        },

        _initEvent: function() {
            var me = this;

            $( '#submit-btn' ).on( 'click', function() {
                $( '.json-ipt' ).each( function() {
                    var item = $( this ),
                        itemVal = me[ item.data( 'item' ) ].getValue() || '{}';

                    item.val( itemVal );
                } );

                if ( $( '.ace_error' ).length ) {
                    alert( 'JSON格式错误，请检查！' );
                    return false;
                }

                if ( $( '.ace_warning' ).length ) {
                    alert( 'JSON格式字符串必做用双引号，请检查！' );
                    return false;
                }

                $( '#api-form' ).submit();
            } );
        },

        _insAce: function( name, id ) {
            var me = this,
                editEl = $( '#' + id ),
                editVal = editEl.data( 'json' );

            //setValue
            if ( !editVal ) {
                editVal = defaultApi[ name ];
            }

            editEl.html( js_beautify( JSON.stringify( editVal ) ) );

            //init ace
            window.aceins = this[ name ] = ace.edit( id );
            this[ name ].setTheme( 'ace/theme/twilight' );
            this[ name ].getSession().setMode( 'ace/mode/javascript' );

            this[ name ].on( 'blur', function( e ) {
                me[ name ].setValue( js_beautify( me[ name ].getValue() ) );
                me[ name ].clearSelection();
            } );
        }
    };

    pageRun.init();
} );

