Ext.define('KCCVBS.controller.WorkerTypes', {
    extend: 'Ext.app.Controller',

    stores: ['WorkerTypes'],

    models: ['WorkerType'],

    views: ['workertype.List', 'workertype.Edit'],

    refs: [{
        ref: 'panel',
        selector: 'workertypelist'
    }],

    init: function () {
        this.control({
            'workertypelist dataview': {
                itemdblclick: this.editItem
            },
            'workertypeedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'workertypeedit button[action=save]': {
                click: this.updateItem
            },
            'workertypelist button[action=new]': {
                click: this.createItem
            },
            'workertypelist button[action=delete]': {
                click: this.deleteItem
            },
            'workertypelist checkbox[action=showActive]': {
                change: this.showActive
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#WorkerTypes');
        if (!tab) {
            tab = tabs.add({
                id: 'WorkerTypes',
                title: 'Worker Types',
                xtype: 'workertypelist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.workertype.Edit').show();
        var record = Ext.create('KCCVBS.model.WorkerType');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.workertype.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues();

        if (!form.isValid()) {
            return;
        };
        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getWorkerTypesStore().insert(0, record);
        }

        win.close();

        this.getWorkerTypesStore().sync();
    },

    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Worker Type', 'Are you sure you want to delete', function (confirmButton) {
            if (confirmButton == 'yes') {
                var grid = button.up('panel');
                var store = grid.getStore();
                Ext.each(grid.getView().getSelectionModel().getSelection(), function (record) {
                    store.remove(record);
                });

                store.sync();
            }

        });
    },

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getWorkerTypesStore().load({ params: { activeOnly: newValue} });
    }
});

