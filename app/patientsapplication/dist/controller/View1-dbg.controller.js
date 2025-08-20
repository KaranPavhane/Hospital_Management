sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("patientsapplication.controller.View1", {
        onInit: function () {
            this._loadPatientsData();
        },

        _loadPatientsData: function () {
            var oView = this.getView();
            var oModel = new JSONModel();

            $.ajax({
                url: "/odata/v4/hospital/Patients",   // relative path (no localhost hardcoding)
                method: "GET",
                success: function (data) {
                    console.log("Full Response:", data);   // ✅ Console me pura response
                    console.log("Patients Data:", data.value); // ✅ sirf patients array

                    oModel.setData({ patients: data.value });  // wrap inside `patients`
                    oView.setModel(oModel, "patientsModel");   // named model for clarity

                    MessageToast.show("Patients data loaded successfully!");
                },
                error: function (err) {
                    console.error("Error loading Patients Data:", err);
                    MessageBox.error("Failed to load patients data");
                }
            });
        }
    });
});
