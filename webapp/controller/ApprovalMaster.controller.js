sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../utils/dataUtil",
    "../utils/ajaxutil",
    "../model/formatter",
    "../utils/filterOpEnum"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Sorter, Filter, FilterOperator, dataUtil, ajaxutil, formatter, filterOpEnum) {
        "use strict";

        return Controller.extend("usermanagement.platformregistrationapproval.controller.TaskMaster", {
            formatter:formatter,
            onInit: function () {
                var oModel = dataUtil.createJsonModel();
                this.getView().setModel(oModel, "oMasterList");
                this._fnGetMasterList();

            },
            onPress: function (oEvent) {
                // var oSelectedObject = oEvent.getSource().getBindingContext("oMasterList").getObject();
                var oSelectedObject = oEvent.getSource().getBindingContext("oFiexibleLayout").getObject();
                var oModel = this.getOwnerComponent().getModel("oFiexibleLayout");
                oModel.setProperty("/retailerReg", oSelectedObject);
                this.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/layout", "TwoColumnsMidExpanded");
                this.getOwnerComponent().getRouter().navTo("TaskDetail", { TaskType: "1" });
            },
            onPressSortConfirm: function (oEvent) {
                var sPath, bDescending, aSorters = [],
                    oTable = this.getView().byId("idMastertable"),
                    oSortParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items");
                sPath = oSortParams.sortItem.getKey();
                bDescending = oSortParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));
                oBinding.sort(aSorters);
            },
            onPressOverviewTableSort: function (oEvent) {
                var that = this;
                if (!that._sortDialog) {
                    that._pDialog = Fragment.load({
                        name: "usermanagement.platformregistrationapproval.fragments.TableSorting",
                        controller: that
                    }).then(function (oDialog) {
                        that._sortDialog = oDialog;
                        that.getView().addDependent(that._sortDialog);
                    });
                }
                that._pDialog.then(function (oDialog) {
                    that._sortDialog.open();
                }.bind(that));

            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [
                        new Filter("BUSINESS_CODE", FilterOperator.Contains, sQuery),
                        new Filter("COMPANY_NAME", FilterOperator.Contains, sQuery),
                        new Filter("PRIMARY_CONTACT_NAME", FilterOperator.Contains, sQuery),
                        new Filter("EMAIL_ID", FilterOperator.Contains, sQuery),
                        new Filter("PHONE_NUMBER", FilterOperator.Contains, sQuery)
                    ];
                }

                this.getView().byId("idMastertable").getBinding("items").filter(new Filter(oTableSearchState, false), "Application");
            },

            _fnGetMasterList: function () {
                var oParameters = {},
                    that =this;
                    // oParameters.filter = "STATUS" + filterOpEnum.EQ + "PFADMINAPPROVED";
                oParameters.error = function (err) {
                    MessageBox.error(err.responseJSON.message);
                    
                };
                oParameters.success = function (oData) {
                    // that.getView().getModel("oMasterList").setProperty("/MasterList",oData);
                    that.getOwnerComponent().getModel("oFiexibleLayout").setProperty("/MasterList",oData);
                    
                }.bind(that);
                ajaxutil.fnRead("platformrequest", oParameters);
            }
        });
    });
