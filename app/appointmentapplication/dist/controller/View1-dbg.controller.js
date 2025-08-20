sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("appointmentapplication.controller.View1", {
        onInit: function () {
            var oView = this.getView();
            var oModel = new JSONModel();
            oView.setModel(oModel, "appointments");

            // 🔹 AJAX call to OData service
            $.ajax({
                url: "/odata/v4/hospital/Appointments",   // 👉 तेरा सही OData endpoint
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("OData Response:", data);

                    // CAP OData में records हमेशा "value" में आते हैं
                    oModel.setData({ appointments: data.value });

                    MessageToast.show("Appointments loaded successfully!");
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    MessageToast.show("Error loading data: " + error);
                }
            });
        }
    });
});
