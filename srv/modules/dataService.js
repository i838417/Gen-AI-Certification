//====================================================================================================
//  Subject: Data Service (Module)
//====================================================================================================
"use strict";

const CSVTOJSON = require("csvtojson");
const formidable = require("formidable");
const pdfParse = require("pdf-parse");
const fs = require('fs');
const PATH = require("path");
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const XLSX = require("xlsx");

const { v4: uuidv4 } = require('uuid');
const logger = require("./logger");

//====================================================================================================
//  ----- MODULE EXPORTS -----
//====================================================================================================
module.exports =
{
	doUpload: doUpload,
    doDownloadCSV: doDownloadCSV,
    doDownloadXLSX: doDownloadXLSX,
}

//====================================================================================================
//  ----- MODULE FUNCTIONS (EXPORTS) -----
//====================================================================================================
async function doUpload(req, res, next)
{
    if (! req.authInfo.checkScope("$XSAPPNAME.CertificateAppUser"))
    {
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
        res.status(403).send({message: "Forbidden"});
    }

      
    const form = formidable({});  

    form.parse(req, async (error, fields, files) => {

        if (error) {
            logger.error(error.stack);
            next(error);
        }

        try
        {
            let filePath = getFilePath(files.fileUpload);
            let fileName = getFileName(files.fileUpload);
            let dataBuffer = fs.readFileSync(filePath);
            let result;
            let version;
            pdfParse(dataBuffer).then(function(data) {
 
                // number of pages
                console.log(data.numpages);
                // number of rendered pages
                console.log(data.numrender);
                // PDF info
                console.log(data.info);
                // PDF metadata
                console.log(data.metadata); 
                // PDF.js version
                // check https://mozilla.github.io/pdf.js/getting_started/
                console.log(data.version);
                version = data.version
                // PDF text
                console.log(data.text); 
                result = data.text;

                res.status(200).send(result);
            }).catch(function(error){
                // handle exceptions
            });
/*            
            if (fileName.endsWith(".csv"))
            {
                jsonObj = await CSVTOJSON().fromFile(filePath);
            }
            else if (fileName.endsWith(".xlsx"))
            {
                const WORKBOOK = XLSX.readFile(filePath);
                const WORKSHEET = WORKBOOK.Sheets["Catena-X"];
                if(WORKSHEET == null || WORKSHEET == "undefined")
                {
                    logger.error("Can not find tab Catena-X in excel sheet, please make sure upload data in tab Catena-X.");
                    throw getError(500, "Can not find tab Catena-X in excel sheet, please make sure upload data in tab Catena-X.");
                }
                jsonObj = XLSX.utils.sheet_to_json(WORKSHEET, {defval: ""});
            }
*/
//            res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");

         //   res.status(200).send(JSON.stringify(version));
         //   return
        }
        catch(err)
        {
            //log error and pass err to error handler
            logger.error(err.stack);
            next(err);
        }
    });
    
}

//====================================================================================================
async function doDownloadCSV(req, res, next)
{
    if (! req.authInfo.checkScope("$XSAPPNAME.CertificateAppUser"))
    {
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
        res.status(403).send({message: "Forbidden"});
    }
    let fileName = "CatenaX_Template.csv";
    let filePath = PATH.join(__dirname, "../template_files/" + fileName);
    res.download(filePath, fileName, function (err) {
        if (err)
        {
            //log error and pass err to error handler
            logger.error("CSV Template File Download Error: ", err);           
            next(err);
        }
    });
}

//====================================================================================================
async function doDownloadXLSX(req, res, next)
{
    if (! req.authInfo.checkScope("$XSAPPNAME.CertificateAppUser"))
    {
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
        res.status(403).send({message: "Forbidden"});
    }
    let fileName = "CatenaX_Template.xlsx";
    let filePath = PATH.join(__dirname, "../template_files/" + fileName);
    res.download(filePath, fileName, function (err) {
        if (err)
        {
            //log error and pass err to error handler
            logger.error("XLSX Template File Download Error: " + err);
            next(err);
        }
    });
}

//====================================================================================================
//  ----- HELPER FUNCTIONS -----
//====================================================================================================
function getFileName(file)
{
    return file.originalFilename;
}

//====================================================================================================
function getFilePath(file)
{
    return file.filepath
}

//====================================================================================================
function getFileSize(file)
{
    return file.size;
}

//====================================================================================================
function getError(iStatus, sMessage)
{
    let err = new Error(sMessage);
    err.status = iStatus;
    return err;
}

//====================================================================================================
function processUploadedData(jsonData, sUploadMode)
{
    
    logger.info("----------");

    
}

//====================================================================================================
/*** <END OF FILE> ***/
//====================================================================================================