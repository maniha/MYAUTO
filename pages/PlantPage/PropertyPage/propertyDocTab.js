var propertyDocTab = function(){
    
//-----------------------------------------------helpers-----------------------------------------------
var utilities = require('../../../helper/utilities.js');

//-----------------------------------------------document tab elements-----------------------------------------------

var lastPageButtonDocument = function () {
    return element(by.ngClick('setCurrent(pagination.last)'));
};

var firstPageButton = function () {
    return element(by.ngClick('setCurrent(1)'));
};

var nextPageButtonDocument = function () {
    return element(by.ngClick('setCurrent(pagination.current + 1)'));
};

var documentTableLocator = function () {
    return "document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'";
};

var documentTableRowNumber = function () {
    return element.all(by.tagName('strong')).first();
};

var selectedPageButtonDocument = function () {
    return element(by.css('.ng-scope.active'));
};

var documentTable = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'"));
};

var docImageHeader = function () {
    return element(by.linkText('Filtype'));
};

var docPDFHeader = function () {
    return element(by.linkText('PDF'));
};

var docTitleHeader = function () {
    return element(by.linkText('Filnavn'));
};

var docLastUpdatedHeader = function () {
    return element(by.linkText('Sist oppdatert'));
};

var docUpdatedByHeader = function () {
    return element(by.linkText('Oppdatert av'));
};

var docOrderNoHeader = function () {
    return element(by.linkText('Ordrenr'));
};

var docSourceHeader = function () {
    return element(by.linkText('Kapittel'));
};

var docInBoligHeader = function () {
    return element(by.linkText('Vis i Boligmappa'));
};

var docTitleColumn = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.Title'));
};

var docLastUpdatedColumn = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.UpdateDateString | date:"dd.MM.yyyy"'));
};

var docUpdatedByColumn = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.UpdatedBy'));
};

var docOrderNoColumn = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.OrderNo'));
};

var docSourceColumn = function () {
    return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.Source'));
};

var docSearchBox = function () {
    return element(by.id('plantDocumentsSearch'));
};

var documentTab = function(){
        return element(by.ngClick('setTab(1)'));
};

var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };

//-----------------------------------------------document tab controllers-----------------------------------------------

//search the Document table
    this.searchDocTable = function(searchKey){
        documentTab().click();
        utilities.enterText(docSearchBox(), searchKey);
    };
    
    //check the search results of Document table are correct
    this.isDocumentResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(documentTableRowNumber(), documentTableLocator(), nextPageButtonDocument(), tag).then(function(rowContent){
            for(var i = 0; i < rowContent.length; i++){
                if(rowContent[i].toString().toLowerCase().indexOf(keyWord) >= 0){
                    deferred.fulfill(true);}
                else{
                    deferred.fulfill(false);
                    break;
                }
            }
        });
         return deferred.promise;
    };
    
    //check if no data found for Document search
    this.isNoDocumentResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), documentTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of document table is present
    this.isDocumentColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        documentTab().click();
        docImageHeader().isDisplayed().then(function(imagePre){
            if(imagePre){
                docPDFHeader().isDisplayed().then(function(PDFPre){
                    if(PDFPre){
                        docTitleHeader().isDisplayed().then(function(titlePre){
                            if(titlePre){
                                docLastUpdatedHeader().isDisplayed().then(function(lastPre){
                                    if(lastPre){
                                        docUpdatedByHeader().isDisplayed().then(function(byPre){
                                            if(byPre){
                                                docOrderNoHeader().isDisplayed().then(function(noPre){
                                                    if(byPre){
                                                        docSourceHeader().isDisplayed().then(function(sourcePre){
                                                            if(sourcePre){
                                                                docInBoligHeader().isDisplayed().then(function(inBolig){
                                                                    if(inBolig){
                                                                        deferred.fulfill(true);
                                                                    }else{deferred.fulfill(false);}
                                                                });
                                                            }else{deferred.fulfill(false);}
                                                        });
                                                    }else{deferred.fulfill(false);}
                                                });
                                            }else{deferred.fulfill(false);}
                                        });
                                    }else{deferred.fulfill(false);}
                                });
                            }else{deferred.fulfill(false);}
                        });
                    }else{deferred.fulfill(false);}
                });
            }else{deferred.fulfill(false);}
        });
        return deferred.promise;
    };
    
    //check the number of rows in Document table is correct
    this.isDocumentRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        documentTab().click();
        documentTableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), documentTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, documentTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Document table by Title
    this.sortByDocTitle_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docTitleHeader().getWebElement());        
    };
    
    //sort the Document table by Last Updated
    this.sortByDocLastUpdated_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docLastUpdatedHeader().getWebElement());        
    };
    
    //sort the Document table by Updated By
    this.sortByDocUpdatedBy_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docUpdatedByHeader().getWebElement());        
    };
    
    //sort the Document table by Order No
    this.sortByDocOrderNo_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docOrderNoHeader().getWebElement());        
    };
    
    /*//sort the Document table by Last Source
    this.sortByDocSource_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docSourceHeader().getWebElement());        
    };*/
    
    //sort the Document table by Last Updated
    this.sortByDocInBolig_A2Z = function(){
        documentTab().click();
        browser.driver.executeScript("arguments[0].click()", docInBoligHeader().getWebElement());        
    };
    
    //check the Document table is sorted by Title A to Z
    this.isSortedByDocTitle_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(docTitleColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Title Z to A
    this.isSortedByDocTitle_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(docTitleColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Last Updated A to Z
    this.isSortedByDocLastUpdated_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_A2Z(docLastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Last Updated Z to A
    this.isSortedByDocLastUpdated_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_Z2A(docLastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Document table is sorted by Updated By A to Z
    this.isSortedByDocUpdatedBy_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(docUpdatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Updated By Z to A
    this.isSortedByDocUpdatedBy_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(docUpdatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Document table is sorted by Order No A to Z
    this.isSortedByDocOrderNo_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(docOrderNoColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Order No Z to A
    this.isSortedByDocOrderNo_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(docOrderNoColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    /*//check the Document table is sorted by Source A to Z
    this.isSortedByDocSource_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(docSourceColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Source Z to A
    this.isSortedByDocSource_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(docSourceColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };*/

}
module.exports = new propertyDocTab();