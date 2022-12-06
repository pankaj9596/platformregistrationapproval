sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";
    return {
        getDataSet: function (vDataSetName) {
            if (this._storage === undefined) {
                this._storage = new jQuery.sap.storage.Storage(jQuery.sap.storage.Type.local);
            }
            var oDataSet = this._storage.get(vDataSetName);
            var info = this._storage.get(vDataSetName) === null ? null : oDataSet;
            return this._decriptInfo(info);

        },
        setDataSet: function (vDataSetName, oDataSet) {
            this._storage = new jQuery.sap.storage.Storage(jQuery.sap.storage.Type.local);
            this._storage.put(vDataSetName, this._encriptInfo(oDataSet));
            return true;
        },
        _encriptInfo: function (info) {
            if (info) {
                info = btoa(btoa(JSON.stringify(info) + this.fnGetUIEncriptionKey()));
                return info;
            }
            return null;
        },
        _decriptInfo: function (info) {
            if (info) {
                info = atob(info);
                info = info.replace(this.fnGetUIEncriptionKey(), '');
                info = atob(info);
                return JSON.parse(info);
            }
            return null;
        },
        getJsonModel :function(vDataSetName){
            return this.createJsonModel(this.getDataSet(vDataSetName));
        },
        createJsonModel:function(oDataSet){
            return new JSONModel;
        }

    }
})