sap.ui.define([
    "sap/ui/core/ValueState",
    "sap/ui/core/format/DateFormat"
], function (ValueState, DateFormat) {
    "use strict";

    return {

        /**
         * Rounds the number unit value to 2 digits
         * @public
         * @param {string} sValue the number string to be rounded
         * @returns {string} sValue with 2 digits rounded
         */

        onColumnVisible: function (sVal) {

            switch (sVal) {
                case "TwoColumnsMidExpanded":
                case "MidColumnFullScreen":
                    return false;
                default:
                    return true;
            }
        },

        dateTimeFormatter:function(sDate){
            if(sDate){
             sDate = new Date(sDate);
             var fnDateFormatter = DateFormat.getDateInstance({
                  pattern:"dd/MM/yyyy"
             });

             return fnDateFormatter.format(sDate);
            }else{
                return "";
            }
        }
    };

});