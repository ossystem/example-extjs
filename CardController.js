Ext.define('WMP.view.card.CardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.card',

    routes: {
        '!card.view.:id': {
            action     : 'onDetails'
        },
        '!card.list': {
            action: 'onList'
        },
        '!card.new': {
            action: 'onNew'
        },
        '!card.edit.:id': {
            action     : 'onEdit'
        }
    },
        control:{
        '#editForm':{
            cancel: function(){
                this.redirectTo('!card.list');
            },
            save: function(){
                this.redirectTo('!card.list');
            }
        }
    },

    onDetails: function(id){
        var view = this.getView().down('#details');
        if(view){
            if(view.getViewModel().get('CardName') == ''){
                this.getViewModel().getStore('Customer').on({
                    load: {
                        single: true,
                        fn: function(store){
                            var record = store.findRecord('id',id);
                            if(record){
                                view.getViewModel().set('CardName', record.get('name'));
                            }
                        }
                    }
                });
            }
            view.getViewModel().set('CardCode', id);
        }
        this.getView().getLayout().setActiveItem('details');
    },
    onList: function(){
        var view = this.getView().getLayout().setActiveItem('list');
        if(view){
            view.down('grid').getStore().load();
        }
    },
    onNew: function(){

        var form = this.getView().down('#editForm').down('form').getForm();
        var rec = Ext.create('WMP.model.Customer');

        if (window
            && window.customerType
            && (['customer', 'lead'].indexOf(window.customerType) !== -1)
        ) {
            rec.set('type', window.customerType);    
        }
        
        form.reset();
        form.loadRecord(rec);
        this.getView().down('#btnDelete').setVisible(false);

        this.getView().getLayout().setActiveItem('editForm');
    },

    onAddButton: function(){
        this.redirectTo('!card.new');
    },

    onEditButton: function(obj) {
        var record = obj.up('panel').down('grid').selection;

        if (!record) return;
        
        this.setDetailViewModelData(record);

        this.redirectTo('!card.view.'+record.get('id')+'/c_details');
    },
    
    onCustomerMenuNavigate: function(record, to){
        this.setDetailViewModelData(record);
        this.redirectTo('!card.view.'+record.get('id') + to);
    },
    
    setDetailViewModelData: function(record){
        var v = this.getView();
        if(!v) return;
        
        var view = v.down('#details');

        if (view) {
            view.getViewModel().set( 'CardName', record.get('name') );
            view.getViewModel().set( 'CardCode', record.get('id') );
            view.getViewModel().set( 'isLead', (record.get('type') == 'lead') );
            view.getViewModel().set( 'record', record );
        }
    },

    btnDetails:function(view, rowIndex, colIndex, item, e, record, row ){
        var view = this.getView().down('#details');

        if(view){
            view.getViewModel().set( 'CardName', record.get('name') );
            view.getViewModel().set( 'CardCode', record.get('id') );
            view.getViewModel().set( 'isLead', (record.get('type') == 'lead') );
            view.getViewModel().set( 'record', record );
        }
        this.redirectTo('!card.view.'+record.get('id')+'/c_details');
    },

    btnList: function(){
        this.redirectTo('!card.list');
    },
    
    storeCostomersLoad: function( store ) {
        var filterId = 'type';

        if (window
            && window.customerType === undefined
        ) {
            var filter = {
                id: filterId, 
                property: 'type', 
                value: 'customer'
            };
            
            store.removeFilter( filterId, false );
            store.addFilter(filter);
        }
    },

    storeFilterChange: function(store, filters) {
        var record = this.view.down('grid').selection;

        if (record && (store.count() > 0) ) {
            var index = store.findExact('id', record.get('id'));

            if (index === -1) {
                this.view.down('grid').setSelection(null);
            }
        }
    }

});
