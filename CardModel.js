Ext.define('WMP.view.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.card',
    
    stores: {

        headerBar: {
            fields: ['description', 'value'],
            proxy:{
                type: 'ajax',
                url: '?controller=Headerbar&action=Home',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            autoLoad: true
        },
        
        Customer: {
            model: 'WMP.model.Customer',
            proxy:{
                type: 'ajax',
                url: '?controller=Customers&action=getList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            autoLoad: true,
            listeners: {
                load: 'storeCostomersLoad',
                filterchange: 'storeFilterChange'
            }
        },
        
        customerTypes: {
            fields: ['name', 'type'],
            data:[
                {name: 'All', type: 'all'},
                {name: 'Partner', type: 'partner'},
                {name: 'Reseller', type: 'reseller'},
                {name: 'End-User', type: 'enduser'},
                {name: 'Customer', type: 'customer'},
                {name: 'Lead', type: 'lead'}
            ]
        }
    }
    
});
