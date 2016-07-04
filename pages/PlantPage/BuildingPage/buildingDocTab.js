var buildingDocTab = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');
    
    //-----------------------------------------------Building Documents Tab elements-----------------------------------------------    
    var originalHeader = function(){
        return element.all(by.css('.center-block')).get(1);
    };
    
    var PDFHeader = function(){
        return element.all(by.css('.center-block')).get(2);
    };
    
    var editHeader = function(){
        return element.all(by.css('.center-block')).get(0);
    };
    
    var titleHeader = function(){
        return element(by.ngClick("order('Title')"));
    };
    
    var updatedDateHeader = function(){
        return element(by.ngClick("order('UpdateDateString')"));
    };
    
    var updatedByHeader = function(){
        return element(by.ngClick("order('UpdatedBy')"));
    };
    
    var orderNoHeader = function(){
        return element(by.ngClick("order('OrderNo')"));
    };
    
    var chapterTagsHeader = function(){
        return element(by.css('.col-lg-2.col-md-2.col-sm-2.col-xs-2.table-header-link'));
    };
    
    /*var sourceHeader = function(){
        return element(by.ngClick("order('Source')"));
    };*/
    
    var showInBoligHeader = function(){
        return element(by.ngClick("order('ShowInBoligbok')"));
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var lastPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.last)'));
    };
    
    var nextPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };
    
    var tableLocator = function(){
        return "document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'";
    };
    
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first();
    };
    
    var selectedPageButton = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var documentTable = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'"));
    };
    
    var searchBox = function(){
        return element(by.id('plantDocumentsSearch'));
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var titleColumn = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.Title'));
    };
    
    var lastUpdatedColumn = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.UpdateDateString | date:"dd.MM.yyyy"'));
    };
    
    var updatedByColumn = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.UpdatedBy'));
    };
    
    var orderNoColumn = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.OrderNo'));
    };
    
    /*var sourceColumn = function(){
        return element.all(by.repeater("document in documents| orderBy:predicate:reverse|PlantDocumentsFilter:plantDocumentsSearch| itemsPerPage: 10 : 'plantDocsPag'").column('document.Source'));
    };*/
    
    var chapterTag10 = function(){
        return element(by.ngClick("assignSearch('10 Annet nyttig')"));
    };
    
    var chapterTagDropDown = function(){
        return element(by.cssContainingText('.btn.btn-default.dropdown-toggle', 'Kapittel'));
    };
    
    var clearCharperTag = function(){
        return element(by.ngClick('clearChapterTag()'));
    };
        
    var bubbleContainer = function(){
        return '.bubble-dontainer';
    };
    
    //-----------------------------------------------Building Documents Tab controllers-----------------------------------------------    
    
    this.beforeAll = function(){
        utilities.enterText(searchBox(), "z");
        utilities.clearText(searchBox());
    };
    
    //Filter documents by chapterTags
    this.filterChapterTag = function(){
        browser.driver.executeScript("arguments[0].click()", chapterTagDropDown().getWebElement());
        browser.driver.sleep(2000);
        chapterTag10().click();
    };
    
    //clear chapterTag filter
    this.resetChapterTag = function(){
        browser.driver.executeScript("arguments[0].click()", chapterTagDropDown().getWebElement());
        browser.driver.sleep(2000);
        clearCharperTag().click();
    };
    
    //search the Document table
    this.searchTable = function(searchKey){
        utilities.enterText(searchBox(), searchKey);
    };
    
    //check the search results of Document table are correct
    this.isResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(tableRowNumber(), tableLocator(), nextPageButton(), tag, 10).then(function(rowContent){
            if(rowContent.length > 10){firstPageButton().click();}
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
    
    //check chapter tag filtering works
    this.chapterTagFiltered = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.chapterTagsToArray(tableRowNumber(), bubbleContainer(), nextPageButton(), tag, 10).then(function(rowContent){
            if(rowContent.length > 10){firstPageButton().click();}
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
    this.isNoResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), documentTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of document table is present
    this.isDocumentColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        originalHeader().isDisplayed().then(function(imagePre){
            if(imagePre){
                console.log('1');
                PDFHeader().isDisplayed().then(function(PDFPre){
                    if(PDFPre){
                        titleHeader().isDisplayed().then(function(titlePre){
                            if(titlePre){
                                updatedDateHeader().isDisplayed().then(function(lastPre){
                                    if(lastPre){
                                        updatedByHeader().isDisplayed().then(function(byPre){
                                            if(byPre){
                                                orderNoHeader().isDisplayed().then(function(noPre){
                                                    if(noPre){
                                                        chapterTagsHeader().isDisplayed().then(function(sourcePre){
                                                            if(sourcePre){
                                                                showInBoligHeader().isDisplayed().then(function(inBolig){
                                                                    if(inBolig){
                                                                        editHeader().isDisplayed().then(function(editHead){
                                                                            if(editHead){
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
            }else{deferred.fulfill(false);}
        });
        return deferred.promise;
    };
    
    //check the number of rows in Document table is correct
    this.isDocumentRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), documentTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    browser.driver.sleep(1000);
                    firstPageButton().click();
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
    this.sortByTitle = function(){
        browser.driver.executeScript("arguments[0].click()", titleHeader().getWebElement());        
    };
    
    //sort the Document table by Last Updated
    this.sortByLastUpdated = function(){
        browser.driver.executeScript("arguments[0].click()", updatedDateHeader().getWebElement());        
    };
    
    //sort the Document table by Updated By
    this.sortByUpdatedBy = function(){
        browser.driver.executeScript("arguments[0].click()", updatedByHeader().getWebElement());        
    };
    
    //sort the Document table by Order No
    this.sortByOrderNo = function(){
        browser.driver.executeScript("arguments[0].click()", orderNoHeader().getWebElement());        
    };
    
    /*//sort the Document table by Source
    this.sortBySource = function(){
        browser.driver.executeScript("arguments[0].click()", sourceHeader().getWebElement());        
    };*/

    
    //check the Document table is sorted by Title A to Z
    this.isSortedByTitle_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(titleColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Title Z to A
    this.isSortedByTitle_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(titleColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Last Updated A to Z
    this.isSortedByLastUpdated_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_A2Z(lastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Last Updated Z to A
    this.isSortedByLastUpdated_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_Z2A(lastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Document table is sorted by Updated By A to Z
    this.isSortedByUpdatedBy_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(updatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Updated By Z to A
    this.isSortedByUpdatedBy_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(updatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Document table is sorted by Order No A to Z
    this.isSortedByOrderNo_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(orderNoColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Order No Z to A
    this.isSortedByOrderNo_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(orderNoColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    /*//check the Document table is sorted by Source A to Z
    this.isSortedBySource_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(sourceColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Source Z to A
    this.isSortedBySource_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(sourceColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };*/
    
}
module.exports = new buildingDocTab();