Ext.define('WMP.view.card.Card', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.card_Card',
    
    requires: [
        'Ext.grid.filters.Filters',
        'WMP.model.Customer'
    ],

    controller: 'card',

    viewModel: {
        type: 'card'
    },

    layout: 'card',

    items:[
        {
            xtype: 'panel',
            itemId: 'list',
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'breadcrumbs-tbar',
                    dock: 'top',
                    height: 54,
                    items: [
                        sprintf('<strong>%s</strong>', 'TITLE'.translate('UCUSTOMERS')),
                        '->',
                        {
                            xtype: 'button',
                            cls: 'green',
                            ui: 'breadcrumbs-tbar-button',
                            glyph: 'xf055@FontAwesome',
                            handler: 'onAddButton',
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 600': {
                                    text: null,
                                    tooltip: 'ADD'.translate('DEFAULT')
                                },
                                'width >= 600': {
                                    text: 'ADD'.translate('DEFAULT'),
                                    tooltip: false
                                }
                            },
                            text: devW() < 600 ? null : 'ADD'.translate('DEFAULT'),
                            tooltip: 'ADD'.translate('DEFAULT')
                        }
                    ]
                }
            ],
            items:[
                {
                    xtype: 'grid',
                    bind: '{Customer}',
                    plugins: [{
                        ptype: 'gridfilters'
                    }],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        deferEmptyText: false,
                        emptyText: '<div style="text-align: center; padding: 50px;">'+ 'NOT_FOUND_RECORDS'.translate('DEFAULT') +'</div>',
                        getRowClass: function(record) {
                            var cls = '';
                            if ( record.get('id') === Company.companySapId ){
                                cls += ' row-bold';
                            }
                            return cls;
                        }
                    },
                    columns:[
                        {
                            text: 'TYPE'.translate('DEFAULT'),
                            dataIndex: 'type',
                            minWidth: 80,
                            tdCls: 'capitalize-cell-text',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridcombotriggercustomertype'
                                }
                            ],
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 350': {
                                    width: 80
                                },
                                'width >= 350': {
                                    width: 110
                                }
                            },
                            width: devW() < 350 ? 80 : 110
                        },{
                            text: 'COMPANYNAME'.translate('UOFFERS'),
                            dataIndex: 'name',
                            flex: 2,
                            minWidth: 100,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }]
                        },{
                            text: 'CITY'.translate('DEFAULT'),
                            dataIndex: 'city',
                            flex: 2,
                            minWidth: 90,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }]
                        },{
                            text: 'PHONE'.translate('UCOMPANIES'),
                            dataIndex: 'phone',
                            flex: 1,
                            minWidth: 145,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }],
                            plugins: 'responsive',
                            hidden: true
                        },{
                            text: 'U_EXP_MONTHS'.translate('DEFAULT'),
                            dataIndex: 'expiration',
                            width: 100,
                            minWidth: 100,
                            align: 'right',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            renderer: function(value, metaData) {
                                if (parseInt(value) === 0) {
                                    metaData.tdAttr = 'data-qtip="' + 'EXPIRATIONTOOLTIP'.translate('DEFAULT') + '"';
                                }
                                return value;
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }],
                            filter: {
                                type: 'numeric',
                                itemDefaults: {
                                    emptyText: 'SEARCH'.translate('DEFAULT', false)
                                }
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 730': {
                                    hidden: true
                                },
                                'width >= 730': {
                                    hidden: false
                                }
                            },
                            hidden: devW() < 730 ? true : false
                        },{
                            text: 'TOTQUANTITY'.translate('DEFAULT'),
                            dataIndex: 'totalQuantity',
                            width: 100,
                            minWidth: 100,
                            align: 'right',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }],
                            filter: {
                                type: 'numeric',
                                itemDefaults: {
                                    emptyText: 'SEARCH'.translate('DEFAULT', false)
                                }
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 730': {
                                    hidden: true
                                },
                                'width >= 730': {
                                    hidden: false
                                }
                            },
                            hidden: devW() < 730 ? true : false
                        },{
                            text: 'TOTAL'.translate('DEFAULT'),
                            dataIndex: 'total',
                            width: 100,
                            minWidth: 100,
                            align: 'right',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }],
                            renderer: function(value, metaData, record) {
                                return (parseInt(record.get('U_EXP_MONTHS')) === 0)
                                        ? ''
                                        : (value
                                            ? Ext.util.Format.number((parseFloat(value)).toFixed(2), '0,0.00') + ' ' + Company.Currency.toCurrencySign()
                                            : ''
                                        );
                            },
                            filter: {
                                type: 'numeric',
                                itemDefaults: {
                                    emptyText: 'SEARCH'.translate('DEFAULT', false)
                                }
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 570': {
                                    hidden: true
                                },
                                'width >= 570': {
                                    hidden: false
                                }
                            },
                            hidden: devW() < 570 ? true : false
                        },{
                            text: 'CURRENCY'.translate('DEFAULT'),
                            hidden: true,
                            dataIndex: 'currency',
                            width: 60,
                            minWidth: 60,
                            align: 'center',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }]
                        },{
                            text: 'EUTOTAMOUNT'.translate('DEFAULT'),
                            dataIndex: 'totalEndUser',
                            width: 120,
                            minWidth: 120,
                            align: 'right',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }],
                            renderer: function(value, metaData, record) {
                                return (parseInt(record.get('U_EXP_MONTHS')) === 0)
                                        ? ''
                                        : (value
                                            ? Ext.util.Format.number((parseFloat(value)).toFixed(2), '0,0.00') + ' ' + Company.Currency.toCurrencySign()
                                            : ''
                                        );
                            },
                            filter: {
                                type: 'numeric',
                                itemDefaults: {
                                    emptyText: 'SEARCH'.translate('DEFAULT', false)
                                }
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 570': {
                                    hidden: true
                                },
                                'width >= 570': {
                                    hidden: false
                                }
                            },
                            hidden: devW() < 570 ? true : false
                        },{
                            text: 'EUCURRENCY'.translate('DEFAULT'),
                            hidden: true,
                            dataIndex: 'currencyEndUser',
                            width: 60,
                            minWidth: 60,
                            align: 'center',
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[{
                                xtype: 'gridsearchtrigger',
                                autoSearch: true
                            }]
                        },{
                            xtype:'actioncolumn',
                            width: 30,
                            items:[
                                {
                                    iconCls: 'fa fa-ellipsis-v',
                                    glyph: true,
                                    handler: function( view, rowIndex, colIndex, item, e, record, row ){
                                        var card = this.up('card_Card');

                                        if(card.menu_grid){
                                            var previousRow = card.menu_grid.row;
                                            delete card.menu_grid;
                                            if (previousRow === rowIndex) return;
                                        }

                                        var c = this.up('card_Card').getController();
                                        var domen = record.get('U_NAME') > '' 
                                            ? record.get('U_NAME') + '.wildixin.com'
                                            : ''; 
                                        var items = [
                                            { text: 'Edit', handler: function() {
                                                c.onCustomerMenuNavigate(record, '/c_details.cardEdit');
                                            }, glyph: 'xf044@FontAwesome' },
                                            { text: 'PBXes', handler: function() {
                                                c.onCustomerMenuNavigate(record, '/c_details.pbxes');
                                            }, glyph: 'xf098@FontAwesome' }
                                        ];
                                        if( record.get('U_NAME') > '' ){
                                            items.push({
                                                cls: 'menuitem-link',
                                                text: domen, handler: function() {
                                                    window.open( 'https://pbxs.wildix.com/' + domen + '/' );
                                                }
                                            });
                                        }
                                        items = items.concat([
                                            { text: 'Offers', handler: function() {
                                                c.onCustomerMenuNavigate(record, '/c_details.offers');
                                            }, glyph: 'xf1ea@FontAwesome' },
                                            { text: 'Adresses', handler: function() {
                                                c.onCustomerMenuNavigate(record, '/c_details.addresses');
                                            }, glyph: 'xf0f7@FontAwesome' },
                                            { text: 'Contacts', handler: function() {
                                                c.onCustomerMenuNavigate(record, '/c_details.contacts');
                                            }, glyph: 'xf0c0@FontAwesome' }
                                        ]);
                                        card.menu_grid = new Ext.menu.Menu({
                                            items: items,
                                            row: rowIndex
                                        });

                                        card.menu_grid.showBy(e.position.cellElement)
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },{
            xtype: 'card_CardEditor',
            itemId: 'editForm',
            onCancel: function(){
                this.fireEvent('cancel');
            },
            onSave: function(){
                this.fireEvent('save');
            }
        },{
            xtype: 'card_details_Details',
            itemId: 'details'
        }
    ]

});