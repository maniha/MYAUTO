var propertyProjTab = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------project tab elements-----------------------------------------------

    var projectSearchBox = function() {
        return element(by.id('plantProjectsSearch'));
    };

    var projectTableLocator = function() {
        return "proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'";
    };

    var projectTable = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'"));
    };

    var projectNumberHeader = function() {
        return element(by.linkText('Prosjektnr'));
    };

    var projectNameHeader = function() {
        return element(by.linkText('Prosjektnavn'));
    };

    var projectManagerHeader = function() {
        return element(by.linkText('Prosjektansvarlig'));
    };

    var projectLastUpdatedHeader = function() {
        return element(by.linkText('Sist oppdatert'));
    };

    var projectStatusHeader = function() {
        return element(by.linkText('Status'));
    };

    var projectNumberColumn = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.code'));
    };

    var projectNameColumn = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.name'));
    };

    var projectManagerColumn = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.company'));
    };

    var projectLastUpdatedColumn = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.updatedDate | date:"dd.MM.yyyy'));
    };

    var projectStatusColumn = function() {
        return element.all(by.repeater("proj in projectList| orderBy:predicate:reverse|PlantProjectsFilter:plantProjectsSearch | itemsPerPage: 10 : 'plantProjPag'").column('proj.status'));
    };

    var projectTab = function() {
        return element(by.ngClick('setTab(3)'));
    };

    var documentTableRowNumber = function() {
        return element.all(by.tagName('strong')).first();
    };

    var lastPageButtonDocument = function() {
        return element(by.ngClick('setCurrent(pagination.last)'));
    };

    var firstPageButton = function() {
        return element(by.ngClick('setCurrent(1)'));
    };

    var nextPageButtonDocument = function() {
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };

    var selectedPageButtonDocument = function() {
        return element(by.css('.ng-scope.active'));
    };

    var noTableDataFoundText = function() {
        return element(by.css('.resultatet-teller-red'));
    };

    var plusButton = function() {
        return element(by.xpath("//button[@id='dropdownMenu1']"));
    };

    var connectProjectLink = function() {
        return element(by.xpath('//a[@ng-click="getAnonymousProjects()"]'));
    };
    //-----------------------------------------------project tab controllers-----------------------------------------------

    //search the Project table
    this.searchProjectTable = function(searchKey) {
        projectTab().click();
        utilities.enterText(projectSearchBox(), searchKey);
    };

    //to add a connect with a tempory project
    this.getConnectProjModal = function() {
        plusButton().click();
        connectProjectLink().click();

        return require('../modals/projectConnectModal.js');
    };

    this.checkIfProjAdded = function(projNo) {
        utilities.enterText(projectSearchBox(), projNo);
        var deferred = protractor.promise.defer();
        projectTable().count().then(function(rowNo) {
            deferred.fulfill(rowNo);
        });
        return deferred.promise;
    };

    //check the search results of Project table are correct
    this.isProjectResultsDisplayed = function(keyWord, tag) {
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(documentTableRowNumber(), projectTableLocator(), nextPageButtonDocument(), tag, 10).then(function(rowContent) {
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

    //check all the headers of project table is present
    this.isProjectColumsDisplayed = function() {
        var deferred = protractor.promise.defer();
        projectTab().click();
        projectNumberHeader().isPresent().then(function(imagePre) {
            if (imagePre) {
                projectNameHeader().isPresent().then(function(PDFPre) {
                    if (PDFPre) {
                        projectManagerHeader().isPresent().then(function(titlePre) {
                            if (titlePre) {
                                projectLastUpdatedHeader().isPresent().then(function(lastPre) {
                                    if (lastPre) {
                                        projectStatusHeader().isPresent().then(function(byPre) {
                                            deferred.fulfill(true);
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

    //check if no data found for Project search
    this.isNoProjectResultsDisplayed = function() {
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), projectTable()).then(function(resultsDisplayed) {
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };

    //check the number of rows in Project table is correct
    this.isProjectRowNumberCorrect = function() {
        var deferred = protractor.promise.defer();
        projectTab().click();
        documentTableRowNumber().getText().then(function(rowNo) {
            if (rowNo > 10) {
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), projectTable(), 10).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else {
                utilities.isLessRowNumberCorrect(rowNo, projectTable()).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };

    //sort the Project table by Number
    this.sortByProjectNo_A2Z = function() {
        projectTab().click();
        browser.driver.executeScript("arguments[0].click()", projectNumberHeader().getWebElement());
    };

    //sort the Project table by Name
    this.sortByProjectName_A2Z = function() {
        projectTab().click();
        browser.driver.executeScript("arguments[0].click()", projectNameHeader().getWebElement());
    };

    //sort the Project table by Manager
    this.sortByProjectManager_A2Z = function() {
        projectTab().click();
        browser.driver.executeScript("arguments[0].click()", projectManagerHeader().getWebElement());
    };

    //sort the Project table by Last Updated
    this.sortByProjectLastUpdated_A2Z = function() {
        projectTab().click();
        browser.driver.executeScript("arguments[0].click()", projectLastUpdatedHeader().getWebElement());
    };

    //sort the Project table by Status
    this.sortByProjectStatus_A2Z = function() {
        projectTab().click();
        browser.driver.executeScript("arguments[0].click()", projectStatusHeader().getWebElement());
    };

    //check the Project table is sorted by Number A to Z
    this.isSortedByProjectNo_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectNumberColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Number Z to A
    this.isSortedByProjectNo_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectNumberColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Name A to Z
    this.isSortedByProjectName_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Name Z to A
    this.isSortedByProjectName_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Manager A to Z
    this.isSortedByProjectManager_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectManagerColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Manager Z to A
    this.isSortedByProjectManager_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectManagerColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Last Updated A to Z
    this.isSortedByProjectLastUpdated_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_A2Z(projectLastUpdatedColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Last Updated Z to A
    this.isSortedByProjectLastUpdated_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_Z2A(projectLastUpdatedColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Status A to Z
    this.isSortedByProjectStatus_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectStatusColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Project table is sorted by Status Z to A
    this.isSortedByProjectStatus_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectStatusColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
}
module.exports = new propertyProjTab();
