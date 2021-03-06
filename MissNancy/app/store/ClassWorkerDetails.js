Ext.define('KCCVBS.store.ClassWorkerDetails', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.ClassWorkerDetails',
    autoLoad: false,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ClassWorkerKey',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: false,   // !Important, this makes it always a list to the server
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: './Classes/GetWorkers',
            destroy: './Classes/DeleteClassWorker'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});