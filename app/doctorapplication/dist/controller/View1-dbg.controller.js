sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("doctorapplication.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            // ✅ Adjust the URL properly (case-sensitive)
            var sUrl = "/odata/v4/hospital/Doctors";  

            $.ajax({
                url: sUrl,
                method: "GET",
                success: function (oData) {
                    // OData v4 responses usually have "value"
                    if (oData.value) {
                        oModel.setData({ Doctors: oData.value });
                    } else {
                        oModel.setData({ Doctors: oData });
                    }
                },
                error: function (err) {
                    console.error(err);
                    MessageToast.show("Failed to load doctors data");
                }
            });
        }
    });
});
