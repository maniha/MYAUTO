var buildingProjTab = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');
    
    //-----------------------------------------------Building Projects Tab elements-----------------------------------------------    
    var numberHeader = function(){
        return element(by.ngClick("order('code')"));
    };
    
    var nameHeader = function(){
        return element(by.ngClick("order('name')"));
    };
    
    var companyHeader = function(){
        return element(by.ngClick("order('company')"));
    };
    
    var updatedDateHeader = function(){
        return element(by.ngClick("order('updatedDate')"));
    };
    
    var statusHeader = function(){
        return element(by.ngClick("order('status')"));
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
        return "proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'";
    };
    
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first();
    };
    
    var selectedPageButton = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var projectTable = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'"));
    };
    
    var searchBox = function(){
        return element(by.id('plantProjectsSearch'));
    };
    
    var noTableDataFoundText = function(){
        
        return element(by.css('.resultatet-teller-red'));
    };
    
    var codeColumn = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.code'));
    };
    
    var nameColumn = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.name'));
    };
    
    var companyColumn = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.company'));
    };
    
    var lastUpdatedColumn = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column("proj.updatedDate.split(' ')[0]  | date:'dd.MM.yyyy'"));
    };
    
    var statusColumn = function(){
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.status'));
    };
    
    
    //-----------------------------------------------Building Projects Tab controllers-----------------------------------------------    
    
    this.beforeAll = function(){
        utilities.enterText(searchBox(), "z");
        utilities.clearText(searchBox());
    };
    
    //search the Project table
    this.searchTable = function(searchKey){
        utilities.enterText(searchBox(), searchKey);
    };
    
    //check the search results of Project table are correct
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
    
    //check if no data found for Project search
    this.isNoResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), projectTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of Project table is present
    this.isColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        numberHeader().isPresent().then(function(imagePre){
            if(imagePre){
                nameHeader().isPresent().then(function(PDFPre){
                    if(PDFPre){
                        companyHeader().isPresent().then(function(titlePre){
                            if(titlePre){
                                updatedDateHeader().isPresent().then(function(lastPre){
                                    if(lastPre){
                                        statusHeader().isPresent().then(function(byPre){
                                            if(byPre){
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
        return deferred.promise;
    };
    
    //check the number of rows in Project table is correct
    this.isRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), projectTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, projectTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Project table by Code
    this.sortByCode = function(){
        browser.driver.executeScript("arguments[0].click()", numberHeader().getWebElement());        
    };
    
    //sort the Project table by Name
    this.sortByName = function(){
        browser.driver.executeScript("arguments[0].click()", nameHeader().getWebElement());        
    };
    
    //sort the Project table by Company
    this.sortByCompany = function(){
        browser.driver.executeScript("arguments[0].click()", companyHeader().getWebElement());        
    };
    
    //sort the Project table by Updated Date
    this.sortByOrderNo = function(){
        browser.driver.executeScript("arguments[0].click()", updatedDateHeader().getWebElement());        
    };
    
    //sort the Project table by Status
    this.sortByStatus = function(){
        browser.driver.executeScript("arguments[0].click()", statusHeader().getWebElement());        
    };

    
    //check the Project table is sorted by Code A to Z
    this.isSortedByCode_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(codeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Code Z to A
    this.isSortedByCode_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(codeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Name A to Z
    this.isSortedByName_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(nameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Name Z to A
    this.isSortedByName_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(nameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Project table is sorted by Company A to Z
    this.isSortedByCompany_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(companyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Company Z to A
    this.isSortedByCompany_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(companyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Project table is sorted by Updated Date A to Z
    this.isSortedBylastUpdatedastUpdated_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_A2Z(lastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Updated Date Z to A
    this.isSortedBylastUpdatedastUpdated_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_Z2A(lastUpdatedColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
    //check the Project table is sorted by Status A to Z
    this.isSortedByStatus_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(statusColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Status Z to A
    this.isSortedByStatus_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(statusColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    }; 
    
}
module.exports = new buildingProjTab();