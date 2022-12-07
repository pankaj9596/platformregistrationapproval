sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../utils/dataUtil",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "../utils/ajaxutil"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, dataUtil, Fragment, formatter, ajaxutil) {
        "use strict";

        return Controller.extend("usermanagement.retailersapprovalrequest.controller.TaskDetail", {
            formatter:formatter,
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
            },

            onApprove: function (oEvent, sAction) {
                var that = this;

                this.oRejectDialog = new sap.m.Dialog({
                    title: sAction,
                    type: sap.m.DialogType.Message,
                    content: [
                        new sap.m.Label({
                            required: sAction === "REJECT" ? true : false,
                            text: sAction === "APPROVE" ? "Do you want to Approve this?" : "Do you want to Reject this?",
                            labelFor: "rejectionNote"
                        }),
                        new sap.m.TextArea("rejectionNote", {
                            width: "100%",
                            placeholder: "Add note (optional)"
                        })
                    ],
                    beginButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: sAction,
                        press: function () {
                            var sText = sap.ui.getCore().byId("rejectionNote").getValue(),
                                aPayload = [],
                                oPayload = {},
                                oParameters = {};
                            oParameters.error = function (oEvent) {

                            };
                            oParameters.success = function (oData) {
                                
                            }.bind(this);
                            oPayload.ACTION = sAction;
                            oPayload.PFSEQID = that.getOwnerComponent().getModel("oFiexibleLayout").getProperty("/retailerReg/PFSEQID");
                            // oPayload.REMARKS = sText;
                            // aPayload.push(oPayload);
                            if (sText === "") {
                                sap.ui.getCore().byId("rejectionNote").setValueState("Error");
                                sap.ui.getCore().byId("rejectionNote").setValueStateText("Please enter remarks");
                                return;
                            } else {
                                sap.ui.getCore().byId("rejectionNote").setValueState("None");
                            }
                             ajaxutil.fnCreate("platformrequest/action", oParameters, oPayload, false, this);
                            this.oRejectDialog.close();
                            this.oRejectDialog.destroy();
                            this.oRejectDialog = undefined;
                            this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", "OneColumn");
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            this.oRejectDialog.close();
                            this.oRejectDialog.destroy();
                            this.oRejectDialog = undefined;
                        }.bind(this)
                    })
                });
                this.oRejectDialog.open();

                // Fragment.load({
                //     id: that.createId("REMARKS"),
                //     name: "usermanagement.retailersapprovalrequest.fragments.Remarks",
                //     controller: that
                // }).then(function (oDialog) {
                //     oDialog.attachAfterClose(function (oEvent) {
                //         oEvent.getSource().destroy();
                //     });
                //     oDialog.setEscapeHandler(function (oPromise) {
                //         oPromise.reject();
                //     });
                //     that._oApproveReject = oDialog;
                //     that.getView().addDependent(oDialog);
                //     oDialog.open(oEvent.getSource());
                // });
            }
        });
    });
