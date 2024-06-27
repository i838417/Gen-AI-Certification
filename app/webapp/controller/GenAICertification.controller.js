sap.ui.define([
    "./BaseController",
    "sap/ui/core/util/File",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, File, MessageBox, MessageToast) {
        "use strict";

       
        return BaseController.extend("com.sap.certificatedataupload.controller.GenAICertification", {
            onInit: function()
            {
            },          

            onPressUpload: function(event)
            {
                this.getView().byId("resultArea").setValue("");
                if (! this.validateUploadFilename())
                {
                    return;
                }
                let fileUploader = this.getView().byId("fileUploader");
                let confirmMsg = this.getView().getModel("i18n").getResourceBundle().getText("upload.Msg.ConfirmUpload");
                MessageBox.confirm(confirmMsg,
                {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.CANCEL],
                    onClose: function(action)
                    {
                        if (action == sap.m.MessageBox.Action.YES)
                        {
                            let uploadUrl = "/srv/upload?uploadMode=1";
                            fileUploader.setSendXHR(true);
                            fileUploader.setUploadUrl(uploadUrl);
                            fileUploader.upload();
                        }
                        fileUploader.clear();
                    }
                });
            },

            onUploadComplete: function(event)
            {
                let responseStatus = event.getParameter("status");
                let responseRaw = event.getParameter("responseRaw");
                if (responseStatus === 200)
                {
                    let msg = this.getView().getModel("i18n").getResourceBundle().getText("upload.Msg.Upload.Successful");
                    MessageToast.show(msg);
                    let fileUploader = this.getView().byId("fileUploader");
                    fileUploader.clear();
                    this.getView().byId("resultArea").setValue( responseRaw);
                }
                else
                {
                    MessageBox.error(responseRaw);
                }
            },

            handleTypeMissmatch: function(oEvent) {
                let aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function(sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                                        " is not supported. Choose one of the following types: " +
                                        aFileTypes.join(", "));
            },

            validateUploadFilename: function()
            {
                let fileUploader = this.getView().byId("fileUploader");
                let fileName = fileUploader.getValue();
                if (fileName == null || fileName === "" || ! fileName.endsWith(".pdf") )
                {
                    let errMsgg = this.getView().getModel("i18n").getResourceBundle().getText("upload.ErrorMsg.IncorrectFileType");
                    MessageBox.error(errMsgg);
                    return false;
                }
                return true;
            },

        });
    });
