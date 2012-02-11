Ext.define('KCCVBS.store.Classes', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Classes',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ClassKey',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: false,
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: '/Classes/Get',
            create: '/Classes/Create',
            update: '/Classes/Update',
            destroy: '/Classes/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});