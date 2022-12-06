sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../utils/dataUtil",
    "sap/ui/core/Fragment",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, dataUtil, Fragment, formatter) {
        "use strict";

        return Controller.extend("usermanagement.retailersapprovalrequest.controller.TaskDetail", {
            onInit: function () {
                var oModel = dataUtil.createJsonModel();
                oModel.setData({
                    "bEdit": false,
                    "bDisplay": true
                });
                this.getView().setModel(oModel, "oVendorMaster");
                this.oModel = this.getView().getModel("oVendorMaster");

            },
            handleFullScreen: function (oEvent) {
                this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/Span", "XL6 L6 M8 S12");
                var bFullScreen = this.getOwnerComponent().getModel("oFiexibleLayout").getProperty("/actionButtonsInfo/midColumn/fullScreen");
                this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
                if (!bFullScreen) {
                    // store current layout and go full screen
                    this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/previousLayout", this.getOwnerComponent().getModel("oFiexibleLayout").getProperty("/layout"));
                    this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", "MidColumnFullScreen");
                } else {
                    // reset to previous layout
                    this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", this.getOwnerComponent().getModel("oFiexibleLayout").getProperty("/previousLayout"));
                }
            },
            handleClose: function (oEvent) {
                this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", "OneColumn");
            },
            onEditScreen: function (oEvent) {
                this.oModel.setProperty("/bEdit", false);
                this.oModel.setProperty("/bDisplay", true);
            },
            onDisplayScreen: function (oEvent) {
                this.oModel.setProperty("/bEdit", true);
                this.oModel.setProperty("/bDisplay", false);
            }
        });
    });
