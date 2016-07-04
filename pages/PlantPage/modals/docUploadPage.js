/*var docUploadPage = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../helper/utilities.js');
    
    //-----------------------------------------------Upload page elements-----------------------------------------------
    
    var browseButton = function(){
        return element(by.id('files'));
    };
    
    var uploadButton = function(){
        return element(by.ngClick('goStep2();'));
    };
    
    var uploadHelpText1 = function(){
        return element.all(by.css('.help-block')).first();
    };
    
    var uploadHelpText2 = function(){
        return element.all(by.css('.help-block')).last();
    };
    
    var plantName = function(){
        return element(by.id('plantNameTxtBox'));
    };
    
    var orderNo = function(){
        return element(by.id('orderNoTxtBox'));
    };
    
    var fileName = function(){
        return element(by.id('fileNameTxtBox'));
    };
    
    var professionName = function(){
        return element(by.id('professionName'));
    };
    
    var selectProfession = function(txt){
        return element(by.cssContainingText('option', txt));
    };
    
    var docTypeDropdown = function(){
        return element(by.id('docTypesDropDown'));
    };
    
    var description = function(){
        return element(by.id('descriptionTxtBox'));
    }
    
    var selectDocType = function(txt){
        return element(by.cssContainingText('option', txt));
    };
    
    var docSaveButton = function(){
        return element(by.ngClick('uploadAllDocc();'));
    };
    
    //-----------------------------------------------Upload page controllers-----------------------------------------------
    
    this.verifyHelptext = function(help1, help2){
        var deferred = protractor.promise.defer();
        uploadHelpText1.getText().then(function(txt1){
            if(txt1 == help1){
                uploadHelpText2.getText().then(function(txt2){
                    if(txt2 == help2){
                        deferred.fulfill(true);
                    }
                    else{
                        deferred.fulfill(false);
                    }
                });
            }
            else{
                deferred.fulfill(false);
            }
        });
        return deferred.promise;
    };
    
    this.fillDocInfo = function(orderNo, profession, type){
        utilities.enterText(plantName(), orderNo);
        docTypeDropdown().click();
        selectDocType(type).click();
        docSaveButton().click();
    };
    
    this.uploadSingleDocument = function(docPath, orderNo, profession, type){
        browseButton().sendKeys(docPath);
        uploadButton().click();
        this.fillDocInfo(profession, type);
        browser.pause();
    };
    
}
module.exports = new docUploadPage();

//-----------------------------------------------document tab controllers-----------------------------------------------

//search the Document table
this.searchDocTable = function (searchKey) {
    documentTab().click();
    utilities.enterText(docSearchBox(), searchKey);
};

//check the search results of Document table are correct
this.isDocumentResultsDisplayed = function (keyWord, tag) {
    var deferred = protractor.promise.defer();
    utilities.tableAllToArray(documentTableRowNumber(), documentTableLocator(), nextPageButtonDocument(), tag).then(function (rowContent) {
        if (rowContent.length > 10) { firstPageButton().click(); }
        for (var i = 0; i < rowContent.length; i++) {
            if (rowContent[i].toString().toLowerCase().indexOf(keyWord) >= 0) {
                deferred.fulfill(true);
            }
            else {
                deferred.fulfill(false);
                break;
            }
        }
    });
    return deferred.promise;
};

//check if no data found for Document search
this.isNoDocumentResultsDisplayed = function () {
    var deferred = protractor.promise.defer();
    utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), documentTable()).then(function (resultsDisplayed) {
        deferred.fulfill(resultsDisplayed);
    });
    return deferred.promise;
};

//check all the headers of document table is present
this.isDocumentColumsDisplayed = function () {
    var deferred = protractor.promise.defer();
    documentTab().click();
    docImageHeader().isPresent().then(function (imagePre) {
        if (imagePre) {
            docPDFHeader().isPresent().then(function (PDFPre) {
                if (PDFPre) {
                    docTitleHeader().isPresent().then(function (titlePre) {
                        if (titlePre) {
                            docLastUpdatedHeader().isPresent().then(function (lastPre) {
                                if (lastPre) {
                                    docUpdatedByHeader().isPresent().then(function (byPre) {
                                        if (byPre) {
                                            docOrderNoHeader().isPresent().then(function (noPre) {
                                                if (noPre) {
                                                    docSourceHeader().isPresent().then(function (sourcePre) {
                                                        if (sourcePre) {
                                                            docInBoligHeader().isPresent().then(function (inBolig) {
                                                                if (inBolig) {
                                                                    deferred.fulfill(true);
                                                                } else { deferred.fulfill(false); }
                                                            });
                                                        } else { deferred.fulfill(false); }
                                                    });
                                                } else { deferred.fulfill(false); }
                                            });
                                        } else { deferred.fulfill(false); }
                                    });
                                } else { deferred.fulfill(false); }
                            });
                        } else { deferred.fulfill(false); }
                    });
                } else { deferred.fulfill(false); }
            });
        } else { deferred.fulfill(false); }
    });
    return deferred.promise;
};

//check the number of rows in Document table is correct
this.isDocumentRowNumberCorrect = function () {
    var deferred = protractor.promise.defer();
    documentTab().click();
    documentTableRowNumber().getText().then(function (rowNo) {
        if (rowNo > 10) {
            lastPageButtonDocument().click();
            utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), documentTable()).then(function (isCorrect) {
                deferred.fulfill(isCorrect);
                firstPageButton().click();
            });
        }
        else {
            utilities.isLessRowNumberCorrect(rowNo, documentTable()).then(function (isCorrect) {
                deferred.fulfill(isCorrect);
            });
        }
    });
    return deferred.promise;
};

//sort the Document table by Title
this.sortByDocTitle_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docTitleHeader().getWebElement());
};

//sort the Document table by Last Updated
this.sortByDocLastUpdated_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docLastUpdatedHeader().getWebElement());
};

//sort the Document table by Updated By
this.sortByDocUpdatedBy_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docUpdatedByHeader().getWebElement());
};

//sort the Document table by Order No
this.sortByDocOrderNo_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docOrderNoHeader().getWebElement());
};

//sort the Document table by Last Source
this.sortByDocSource_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docSourceHeader().getWebElement());
};

//sort the Document table by Last Updated
this.sortByDocInBolig_A2Z = function () {
    documentTab().click();
    browser.driver.executeScript("arguments[0].click()", docInBoligHeader().getWebElement());
};

//check the Document table is sorted by Title A to Z
this.isSortedByDocTitle_A2Z = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(docTitleColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Title Z to A
this.isSortedByDocTitle_Z2A = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(docTitleColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Last Updated A to Z
this.isSortedByDocLastUpdated_A2Z = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnDateSorted_A2Z(docLastUpdatedColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Last Updated Z to A
this.isSortedByDocLastUpdated_Z2A = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnDateSorted_Z2A(docLastUpdatedColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Updated By A to Z
this.isSortedByDocUpdatedBy_A2Z = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(docUpdatedByColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Updated By Z to A
this.isSortedByDocUpdatedBy_Z2A = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(docUpdatedByColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Order No A to Z
this.isSortedByDocOrderNo_A2Z = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(docOrderNoColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Order No Z to A
this.isSortedByDocOrderNo_Z2A = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(docOrderNoColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Source A to Z
this.isSortedByDocSource_A2Z = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(docSourceColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

//check the Document table is sorted by Source Z to A
this.isSortedByDocSource_Z2A = function () {
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(docSourceColumn()).then(function (isSorted) {
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};*/