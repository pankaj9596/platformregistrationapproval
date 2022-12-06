sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../utils/dataUtil",
    "../utils/ajaxutil",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Sorter, Filter, FilterOperator, dataUtil, ajaxutil, formatter) {
        "use strict";

        return Controller.extend("usermanagement.retailersapprovalrequest.controller.TaskMaster", {
            formatter:formatter,
            onInit: function () {
                var oModel = dataUtil.createJsonModel();
                // oModel.setData({
                //     "MasterList": [
                //         {
                //             Code: "0001",
                //             Name: "Unilever",
                //             Department: "Household",
                //             PrimaryContact: "John",
                //             Email: "John@gmail.com",
                //             Phone: "123456"
                //         },
                //         {
                //             Code: "0002",
                //             Name: "NTUC",
                //             Department: "Retail",
                //             PrimaryContact: "Abhishek",
                //             Email: "Abhishek@gmail.com",
                //             Phone: "999999"
                //         },
                //         {
                //             Code: "0003",
                //             Name: "NUS",
                //             Department: "Retail",
                //             PrimaryContact: "Pankaj",
                //             Email: "Pankaj@gmail.com",
                //             Phone: "9898999"
                //         },
                //         {
                //             Code: "0004",
                //             Name: "Gaint",
                //             Department: "Retail",
                //             PrimaryContact: "Om",
                //             Email: "Om@gmail.com",
                //             Phone: "996790"
                //         }
                //     ]
                // });

                this.getView().setModel(oModel, "oMasterList");
                this._fnGetMasterList();

            },
            onPress: function (oEvent) {
                var oSelectedObject = oEvent.getSource().getBindingContext("oMasterList").getObject();
                var oModel = this.getOwnerComponent().getModel("oFiexibleLayout");
                oModel.setProperty("/Code", oSelectedObject);
                oModel.setProperty("/Code", oSelectedObject.Code);
                oModel.setProperty("/Name", oSelectedObject.Name);
                oModel.setProperty("/Department", oSelectedObject.Department);
                oModel.setProperty("/Email", oSelectedObject.Email);
                oModel.setProperty("/PrimaryContact", oSelectedObject.PrimaryContact);
                oModel.setProperty("/Phone", oSelectedObject.Phone);
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
                        name: "usermanagement.retailersapprovalrequest.fragments.TableSorting",
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
                        new Filter("Code", FilterOperator.Contains, sQuery),
                        new Filter("Name", FilterOperator.Contains, sQuery),
                        new Filter("Department", FilterOperator.Contains, sQuery),
                        new Filter("PrimaryContact", FilterOperator.Contains, sQuery),
                        new Filter("Email", FilterOperator.Contains, sQuery),
                        new Filter("Phone", FilterOperator.Contains, sQuery)
                    ];
                }

                this.getView().byId("idMastertable").getBinding("items").filter(oTableSearchState, "Application");
            },

            _fnGetMasterList: function () {
                var oParameters = {},
                    that =this;
                    // oParameters.filter = "emailID" + filterOpEnum.EQ + sEmail;
                oParameters.error = function (err) {
                    MessageBox.error(err.responseJSON.message);
                    
                };
                oParameters.success = function (oData) {
                    that.getView().getModel("oMasterList").setProperty("/MasterList",oData);
                    
                }.bind(that);
                ajaxutil.fnRead("platformrequest", oParameters);
            },
        });
    });
