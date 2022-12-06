/*global QUnit*/

sap.ui.define([
	"usermanagement/retailersapprovalrequest/controller/FlexibleColumnLayoutView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FlexibleColumnLayoutView Controller");

	QUnit.test("I should test the FlexibleColumnLayoutView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
