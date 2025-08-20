sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            this.oModel = new JSONModel({ Students: [] });
            this.getView().setModel(this.oModel);
            this.onLoadStudents(); // load data initially
        },

        // GET Students
        onLoadStudents() {
            $.ajax({
                url: "http://localhost:4004/odata/v4/student/Students",
                method: "GET",
                success: (data) => {
                    this.oModel.setProperty("/Students", data.value);
                },
                error: (err) => {
                    console.error(err);
                    MessageToast.show("Failed to load students");
                }
            });
        },

        // POST Student
        onSubmitStudent() {
            const oView = this.getView();

            const studentData = {
                firstName: oView.byId("firstName").getValue(),
                lastName: oView.byId("lastName").getValue(),
                email: oView.byId("email").getValue(),
                phoneNumber: oView.byId("phone").getValue(),
                dateOfBirth: oView.byId("dob").getDateValue()?.toISOString().split("T")[0],
                gender: oView.byId("gender").getValue(),
                address: oView.byId("address").getValue(),
                enrollmentDate: oView.byId("enrollDate").getDateValue()?.toISOString().split("T")[0]
            };

            $.ajax({
                url: "http://localhost:4004/odata/v4/student/Students",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(studentData),
                success: () => {
                    MessageToast.show("Student Added Successfully");
                    this.onLoadStudents(); // refresh table
                },
                error: (err) => {
                    console.error(err);
                    MessageToast.show("Error adding student");
                }
            });
        }
    });
});
