
// followed this guys advice for structure
// http://stackoverflow.com/questions/6871594/best-practices-concerning-initcomponent-in-ext-define


Ext.define('KCCVBS.view.classes.ClassWorkerDetailsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.classworkerdetailslist',
    store: 'ClassWorkerDetails',
    header: false,

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        this.tbar = [{
            xtype: 'combo',
            name: 'MasterTeacherKey',
            emptyText: "Start typing Worker's Last Name here",
            store: Ext.create('KCCVBS.store.WorkersCombo'),
            displayField: 'DisplayName',
            valueField: 'WorkerKey',
            queryMode: 'remote',
            minChars: 2,
            hideTrigger: true,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            action: 'new',
            width: 240

        }, {
            xtype: 'tbseparator'
        }, {
            iconCls: 'unassign-item',
            text: 'Unassign',
            action: 'delete'
        }];

        this.columns = [{
            header: 'Class Worker',
            dataIndex: 'DisplayName',
            flex: 1
        }, {
            header: 'Phone',
            dataIndex: 'Phone',
            flex: 1
        }, {
            header: 'Mobile',
            dataIndex: 'Mobile',
            flex: 1
        }];

        this.callParent(arguments);
    }
});


