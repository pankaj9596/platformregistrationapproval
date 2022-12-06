sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,models) {
        "use strict";

        return Controller.extend("usermanagement.retailersapprovalrequest.controller.FlexibleColumnLayoutView", {
            onInit: function () {
                var oModel = new JSONModel({});
                oModel.setData({
                    layout: "OneColumn",
                    previousLayout: "",
                    actionButtonsInfo: {
                        midColumn: {
                            fullScreen: false,
                            exitFullScreen: true,
                            closeColumn: false
                        }
                    }
                });

                this.getOwnerComponent().setModel(oModel, "oFiexibleLayout");

            },
            onStateChange: function (oEvent) {
                var sLayout = oEvent.getParameter("layout");
                this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", sLayout);
                switch (sLayout) {
                    case "TwoColumnsMidExpanded":
                    case "MidColumnFullScreen":
                        this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/Span", "XL6 L6 M8 S12");
                    case "TwoColumnsBeginExpanded":
                        this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/Span", "X8 L8 M12 S12");
                    default:
                    // this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/Span", "X6 L6 M8 S12");

                }


            }
        });
    });
