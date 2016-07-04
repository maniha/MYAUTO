var propertyRoomTab = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------rooms tab elements-----------------------------------------------

    var documentTableRowNumber = function() {
        return element.all(by.tagName('strong')).first();
    };

    var roomSearchBox = function() {
        return element(by.id('plantpropertyUnitsSearch'));
    };

    var roomsTableLocator = function() {
        return "propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|PlantPropertyUnitsFilter:plantPropertyUnitsSearch | itemsPerPage: 10 : 'plantProUnitsPag'";
    };

    var roomsTable = function() {
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|PlantPropertyUnitsFilter:plantPropertyUnitsSearch | itemsPerPage: 10 : 'plantProUnitsPag'"));
    };

    var roomNameHeader = function() {
        return element(by.linkText('Navn på rom'));
    };

    var roomTypeHeader = function() {
        return element(by.linkText('Type rom'));
    };

    var roomNameColumn = function() {
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|PlantPropertyUnitsFilter:plantPropertyUnitsSearch | itemsPerPage: 10 : 'plantProUnitsPag'").column('propertyUnit.Name'));
    };

    var roomTypeColumn = function() {
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|PlantPropertyUnitsFilter:plantPropertyUnitsSearch | itemsPerPage: 10 : 'plantProUnitsPag'").column('propertyUnit.PropertyUnitType'));
    };

    var roomTabHelp = function() {
        return element(by.css('.alert.alert-success.alert-dismissible.fade.in')).element(by.tagName('p'));
    };

    var roomsTab = function() {
        return element(by.ngClick('setTab(2)'));
    };

    var noTableDataFoundText = function() {
        return element(by.css('.resultatet-teller-red'));
    };

    var lastPageButtonDocument = function() {
        return element(by.ngClick('setCurrent(pagination.last)'));
    };

    var selectedPageButtonDocument = function() {
        return element(by.css('.ng-scope.active'));
    };

    var firstPageButton = function() {
        return element(by.ngClick('setCurrent(1)'));
    };

    //-----------------------------------------------rooms tab controllers-----------------------------------------------

    //search the Room table
    this.searchRoomTable = function(searchKey) {
        roomsTab().click();
        utilities.enterText(roomSearchBox(), searchKey);
    };

    //check the search results of Room table are correct
    this.isRoomResultsDisplayed = function(keyWord, tag) {
        var deferred = protractor.promise.defer();
        documentTableRowNumber().getText().then(function(rows) {
            var nextButton;
            if (Number(rows) > 10) { nextButton = nextPageButtonDocument() } else { nextButton = null };
            utilities.tableAllToArray(documentTableRowNumber(), roomsTableLocator(), nextButton, tag, 10).then(function(rowContent) {
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
        });
        return deferred.promise;
    };

    //check all the headers of Room table is present
    this.isRoomColumsDisplayed = function() {
        var deferred = protractor.promise.defer();
        roomsTab().click();
        roomNameHeader().isPresent().then(function(imagePre) {
            if (imagePre) {
                roomTypeHeader().isPresent().then(function(PDFPre) {
                    deferred.fulfill(true);
                });
            } else { deferred.fulfill(false); }
        });
        return deferred.promise;
    };

    //check if the room help text displayed
    this.isRoomHelpTextDisplayed = function(contains) {
        var deferred = protractor.promise.defer();
        roomsTab().click();
        roomTabHelp().getText().then(function(txt) {
            console.log(txt);
            if (txt.toString().toLowerCase().indexOf(contains.toLowerCase()) >= 0) {
                deferred.fulfill(true);
            }
            else {
                deferred.fulfill(false);
            }
        });
        return deferred.promise;
    }

    //check if no data found for Room search
    this.isNoRoomResultsDisplayed = function() {
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), roomsTable()).then(function(resultsDisplayed) {
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };

    //check the number of rows in Room table is correct
    this.isRoomsRowNumberCorrect = function() {
        var deferred = protractor.promise.defer();
        roomsTab().click();
        documentTableRowNumber().getText().then(function(rowNo) {
            if (rowNo > 10) {
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), roomsTable(), 10).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else {
                utilities.isLessRowNumberCorrect(rowNo, roomsTable()).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };

    //sort the Room table by Room Name
    this.sortByRoomName_A2Z = function() {
        roomsTab().click();
        browser.driver.executeScript("arguments[0].click()", roomNameHeader().getWebElement());
    };

    //sort the Room table by Room Type
    this.sortByRoomType_A2Z = function() {
        roomsTab().click();
        browser.driver.executeScript("arguments[0].click()", roomTypeHeader().getWebElement());
    };

    //check the Room table is sorted by Name A to Z
    this.isSortedByRoomName_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(roomNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Room table is sorted by Name Z to A
    this.isSortedByRoomName_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(roomNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Room table is sorted by Type A to Z
    this.isSortedByRoomType_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(roomTypeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Room table is sorted by Type Z to A
    this.isSortedByRoomType_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(roomTypeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
}

module.exports = new propertyRoomTab();