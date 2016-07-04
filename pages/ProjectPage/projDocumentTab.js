/// <reference path="../../typings/tsd.d.ts" />

var projDocumentTab = function () {
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Document tab elements-----------------------------------------------
    var projectMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var documentTableRowNumber = function(){
        return element.all(by.tagName('strong')).first(); 
    };
    
    var docSearchBox = function(){
        return element(by.id('projectDocumentsSearch'));
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var lastPageButtonDocument = function(){
        return element(by.ngClick('setCurrent(pagination.last)'));
    };
    
    var nextPageButtonDocument = function(){
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };
    
    var selectedPageButtonDocument = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var documentTable = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'"));
    };
    
    var documentTableLocator = function(){
        return "document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'";
    };
    
    var docImageHeader = function(){
        return element(by.linkText('Filtype'));
    };
    
    var docPDFHeader = function(){
        return element(by.linkText('PDF'));
    };
    
    var docTitleHeader = function(){
        return element(by.linkText('Filnavn'));
    };
    
    var docLastUpdatedHeader = function(){
        return element(by.linkText('Sist oppdatert'));
    };
    
    var docUpdatedByHeader = function(){
        return element(by.linkText('Oppdatert av'));
    };
    
    var docOrderNoHeader = function(){
        return element(by.linkText('Ordrenr'));
    };
    
    /*var docSourceHeader = function(){
        return element(by.linkText('Kapittel'));
    };*/
    
    var docInBoligHeader = function(){
        return element(by.linkText('Vis i Boligmappa'));
    };
    
    var docCompanyHeader = function(){
        return element(by.linkText('Firmanavn'));
    };
    
    var docChapterTagsHeader = function(){
        return element(by.linkText('Kapittel'));
    };
    
    var docTitleColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.Title'));
    };
    
    var docLastUpdatedColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.updateDate | date:"dd.MM.yyyy"'));
    };
    
    var docCompanyNameColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.Company.CompanyName'));
    };
    
    var docUpdatedByColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.UpdatedBy'));
    };
    
    var docOrderNoColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.OrderNumber'));
    };
    
    var docSourceColumn = function(){
        return element.all(by.repeater("document in projectDocuments| ProjectDocumentViewFilter:documentView:loggedInUserCompanyId|orderBy:predicate:reverse|ProjectDocumentsFilter:projectDocumentsSearch | itemsPerPage: 10 : 'projectDocsPag'").column('document.ApplicationTag'));
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red.ng-scope'));
    };
    
    var chapterTagDropDown = function(){
        return element(by.id('dropdownMenu1'));
    };
    
    var chapterTag6 = function(){
        return element(by.ngClick("assignSearch('6 Tegninger og bilder')"));
    };
    
    var clearCharperTag = function(){
        return element(by.ngClick('clearChapterTag()'));
    };
    
    var bubbleContainer = function(){
        return '.bubble-dontainer';
    };
    
    var showOnlySharedDocs = function(){
        return element(by.ngClick('showOnlySharedDocuments()'));
    };
    
    var showOnlyMyDocs = function(){
        return element(by.ngClick('showOnlyMyDocuments()'));
    };
    
    var showAllDocs = function(){
        return element(by.ngClick('showAllDocuments()'));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle.ng-scope'));
    };
    
    var plusButtonContainer = function(){
        return element(by.xpath('//div[@class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"]/div[@class="dropdown"]'))
    };
    
    var addNewDoc = function(){
        return element(by.linkText('Last opp filer'));
    };
    
    var tickAllDock = function(){
        return element(by.id('#globalcheckboxforprojectdocuments'));
    };
    
    var deleteDoc = function(){
        return element(by.ngClick("deleteSelectedDocuments(selectedDocs)"));
    };
    
    var deleteConfirmYes = function(){
        return element.all(by.css('.btn.btn-warning.button.right.small')).last();
    };
    
    var deleteConfirmNo = function(){
        return element.all(by.repeater('button in dialog.buttons')).get(0);
    };
    
    var canDocDeleteBtn = function(){
        return element(by.xpath('//ul[@class="dropdown-menu dropdown-menu-right tools-menu ng-scope"]/li[3]'));
    };
        
    //-----------------------------------------------Document tab controlles-----------------------------------------------
    this.beforeEachDocTest = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            utilities.enterText(docSearchBox(), "z");
            utilities.clearText(docSearchBox());
        });
    };
    
    //delete all documents
    this.deleteAllCocuments = function(){
        tickAllDock().click();
        plusButton().click();
        deleteDoc().click();
        browser.driver.executeScript("arguments[0].click()", deleteConfirmYes().getWebElement());
        //deleteConfirmYes().click();
    };
    
    //to check if the plus button is visible
    this.isFileUploadAvailable = function(){
        var deferred = protractor.promise.defer();
        plusButtonContainer().getOuterHtml().then(function(innerHtml){
            console.log(innerHtml);
            deferred.fulfill(innerHtml);
        });
        return deferred.promise;
    };
    
    //to check if a document can be deleted
    this.canDocDelete = function(docName){
        var deferred = protractor.promise.defer();
        utilities.enterText(docSearchBox(), docName);
        tickAllDock().click();
        plusButton().click();
        canDocDeleteBtn().getAttribute('class').then(function(clas){
            deferred.fulfill(clas);
        });
        return deferred.promise;
    };
    
    //to check if a document is deleted
    this.isDocumentDeleted = function(docName){
        var deferred = protractor.promise.defer();
        utilities.enterText(docSearchBox(), docName);
        noTableDataFoundText().isDisplayed().then(function(displayed){
            deferred.fulfill(displayed);
        });
        return deferred.promise;
    };
    
    //go back to project page
    this.goToProjectPage = function(){
        projectMenuIcon().click();
        
        return require('./projectPage.js');
    };
    
    //to get number of documents
    this.numberOfDocs = function(){
        var deferred = protractor.promise.defer();
        documentTableRowNumber().getText().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //to check if the document is uploaded
    this.isDocumentUploaded = function(docName){
        var deferred = protractor.promise.defer();
        utilities.enterText(docSearchBox(), docName);
        documentTableRowNumber().getText().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //open the document upload modal
    this.getAddDocModal = function(){
        plusButton().click();
        addNewDoc().click();
        browser.driver.sleep(1000);
        
        return require('./Modals/addNewDocument.js');
    };
    
    //search the Document table
    this.searchDocTable = function(searchKey){
        utilities.enterText(docSearchBox(), searchKey);
    };
    
    //Filter documents by chapterTags
    this.filterChapterTag = function(){
        browser.driver.executeScript("arguments[0].click()", chapterTagDropDown().getWebElement());
        browser.driver.sleep(2000);
        chapterTag6().click();
    };
    
    //clear chapterTag filter
    this.resetChapterTag = function(){
        browser.driver.executeScript("arguments[0].click()", chapterTagDropDown().getWebElement());
        browser.driver.sleep(2000);
        clearCharperTag().click();
    };
    
    //check the search results of Document table are correct
    this.isDocumentResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(documentTableRowNumber(), documentTableLocator(), nextPageButtonDocument(), tag, 10).then(function(rowContent){
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
        utilities.chapterTagsToArray(documentTableRowNumber(), bubbleContainer(), nextPageButtonDocument(), tag, 10).then(function(rowContent){
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
    this.isNoDocumentResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), documentTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check the number of rows in Document table is correct
    this.isDocumentRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        documentTableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), documentTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
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
    
    //check all the headers of document table is present
    this.isDocumentColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        docImageHeader().isPresent().then(function(imagePre){
            if(imagePre){
                docPDFHeader().isPresent().then(function(PDFPre){
                    if(PDFPre){
                        docTitleHeader().isPresent().then(function(titlePre){
                            if(titlePre){
                                docLastUpdatedHeader().isPresent().then(function(lastPre){
                                    if(lastPre){
                                        docUpdatedByHeader().isPresent().then(function(byPre){
                                            if(byPre){
                                                docOrderNoHeader().isPresent().then(function(noPre){
                                                    if(byPre){
                                                                docInBoligHeader().isPresent().then(function(inBolig){
                                                                    if(inBolig){
                                                                        docCompanyHeader().isPresent().then(function(company){
                                                                            if(company){
                                                                                docChapterTagsHeader().isPresent().then(function(chapter){
                                                                                    if(chapter){
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
    
    //sort the Document table by Title
    this.sortByDocTitle_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docTitleHeader().getWebElement());        
    };
    
    //sort the Document table by Last Updated
    this.sortByDocLastUpdated_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docLastUpdatedHeader().getWebElement());        
    };
    
    //sort the Document table by Updated By
    this.sortByDocUpdatedBy_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docUpdatedByHeader().getWebElement());        
    };
    
    //sort the Document table by Order No
    this.sortByDocOrderNo_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docOrderNoHeader().getWebElement());        
    };
    
    /*//sort the Document table by Last Source
    this.sortByDocSource_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docSourceHeader().getWebElement());        
    };*/
    
    //sort the Document table by Company
    this.sortByDocCompany_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", docCompanyHeader().getWebElement());        
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
    }; */
    
    //check the Document table is sorted by Source A to Z
    this.isSortedByDocCompany_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(docCompanyNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Document table is sorted by Source Z to A
    this.isSortedByDocCompany_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(docCompanyNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //filter by my docs
    this.filterByMyDocs = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            showOnlyMyDocs().click();
        });        
    };
    
    //filter by shared docs
    this.filterBySharedDocs = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            showOnlySharedDocs().click();
        });        
    };
    
    //show all the docs
    this.filterByAllDocs = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            showAllDocs().click();            
        });
    };
    
    //check if the docs are filtered
    this.isFilteredDocsVisible = function(sharedDocClass){
        var deferred = protractor.promise.defer();
        utilities.tableAllAttributeToArray(documentTableRowNumber(), documentTableLocator(), nextPageButtonDocument(), 'class', 10).then(function(classArr){
            console.log(classArr);
            for(var i = 0; i < classArr.length; i++){
                if(classArr[i].toString().toLowerCase() == sharedDocClass){
                    deferred.fulfill(true);}
                else{
                    deferred.fulfill(false);
                    break;
                }
            }
        });
        return deferred.promise;
    };
    
    //check if all the types of docs are visible
    this.isAllDocsVisible = function(sharedDocClass, myDocsClass){
        var deferred = protractor.promise.defer();
        utilities.tableAllAttributeToArray(documentTableRowNumber(), documentTableLocator(), nextPageButtonDocument(), 'class').then(function(classArr){
            console.log(classArr);
            for(var i = 0; i < classArr.length; i++){
                if(classArr[i].toString().toLowerCase() == sharedDocClass || classArr[i].toString().toLowerCase() == myDocsClass){
                    deferred.fulfill(true);}
                else{
                    deferred.fulfill(false);
                    break;
                }
            }
        });
        return deferred.promise;
    };
    
}
module.exports = new projDocumentTab();