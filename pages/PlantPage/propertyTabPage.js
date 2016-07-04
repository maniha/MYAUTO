require('./plantDetailPage.js');
require('./buildingTabPage.js');

var propertyTabPage = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');

    //-----------------------------------------------property Tab elements-----------------------------------------------    
    var addressHeader = function() {
        return element(by.linkText('Adresse'));
    };

    var kundeHeader = function() {
        return element(by.linkText('Hjemmelshaver'));
    };

    var matrikkelHeader = function() {
        return element(by.ngClick("order('Matrikkel')"));
    };

    var bruksenhetHeader = function() {
        return element(by.linkText('Bruksenhet'));
    };

    var boligTableRowNumber = function() {
        return element.all(by.tagName('strong')).first();
    };

    var addressColumn = function() {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'").column('propertyPlant.FolderName'));
    };

    var matrikkelColumn = function() {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'").column('propertyPlant.Matrikkel'));
    };

    var kundeColumn = function() {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'").column('propertyPlant.CustomerName'));
    };

    var bruksenhetColumn = function() {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'").column('propertyPlant.UnitNumber'));
    };

    var housingTable = function() {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'"));
    };

    var housingTableLocator = function() {
        return "propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'";
    };

    var housingTableRow = function(rowNo) {
        return element.all(by.repeater("propertyPlant in propertyPlants| orderBy:predicate:reverse|PropertyPlantsFilter:propertySearch | itemsPerPage: 20 : 'propertyPag'")).get(rowNo).all(by.tagName('a'));
    };

    var searchHousingBox = function() {
        return element(by.id('propertySearch'));
    };

    var boligTab = function() {
        return element.all(by.ngClick("setTabName('')")).first();
    };

    var firstPageButtonBolig = function() {
        return element.all(by.ngClick('setCurrent(1)')).first();
    };

    var previousPageButtonBolig = function() {
        return element.all(by.ngClick('setCurrent(pagination.current - 1)')).first();
    };

    var nextPageButtonBolig = function() {
        return element.all(by.ngClick('setCurrent(pagination.current + 1)')).first();
    };

    var lastPageButtonBolig = function() {
        return element.all(by.ngClick('setCurrent(pagination.last)')).first();
    };

    var selectedPageButtonBolig = function() {
        return element.all(by.css('.ng-scope.active')).first();
    };

    var boligRowByAddress = function(address) {
        return element(by.linkText(address));
    };

    //-----------------------------------------------property tab controllers-----------------------------------------------

    this.beforeAllBolig = function() {
        boligTab().click();
        utilities.enterText(searchHousingBox(), 'z');
        utilities.clearText(searchHousingBox());
    };

    //search the bolig table
    this.searchHousing = function(searchKey) {
        utilities.enterText(searchHousingBox(), searchKey);
    };

    //check bolig tab is visible
    this.isBoligTabVisible = function() {
        var deferred = protractor.promise.defer();
        boligTab().isDisplayed().then(function(isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };

    //sort the bolig table by Adddress
    this.sortByAddress_A2Z = function() {
        boligTab().click();
        browser.driver.executeScript("arguments[0].click()", addressHeader().getWebElement());
    };

    //check the bolig table is sorted by Adddress A to Z
    this.isSortedByAddress_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(addressColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the bolig table is sorted by Adddress Z to A
    this.isSortedByAddress_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(addressColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //sort the bolig table by Kunde
    this.sortByKunde_A2Z = function() {
        boligTab().click();
        browser.driver.executeScript("arguments[0].click()", kundeHeader().getWebElement());
    };

    //check the bolig table is sorted by Kunde A to Z
    this.isSortedByKunde_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(kundeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the bolig table is sorted by Kunde Z to A
    this.isSortedByKunde_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(kundeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //sort the bolig table by Matrikkel
    this.sortByMatrikkel_A2Z = function() {
        boligTab().click();
        browser.driver.executeScript("arguments[0].click()", matrikkelHeader().getWebElement());
    };

    //check the bolig table is sorted by Matrikkel A to Z
    this.isSortedByMatrikkel_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(matrikkelColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the bolig table is sorted by Matrikkel Z to A
    this.isSortedByMatrikkel_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(matrikkelColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //sort the bolig table by Bruksenhet
    this.sortByBruksenhet_A2Z = function() {
        boligTab().click();
        browser.driver.executeScript("arguments[0].click()", bruksenhetHeader().getWebElement());
    };

    //check the bolig table is sorted by Bruksenhet A to Z
    this.isSortedByBruksenhet_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(bruksenhetColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the bolig table is sorted by Bruksenhet Z to A
    this.isSortedByBruksenhet_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(bruksenhetColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the number of rows in Bolig table is correct
    this.isBoligRowNumberCorrect = function() {
        var deferred = protractor.promise.defer();
        boligTab().click();
        boligTableRowNumber().getText().then(function(rowNo) {
            if (rowNo > 20) {
                lastPageButtonBolig().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonBolig(), housingTable(), 20).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                    firstPageButtonBolig().click();
                });
            }
            else {
                utilities.isLessRowNumberCorrect(rowNo, housingTable()).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };

    //check the search results of Bolig table are correct
    this.isHousingResultsDisplayed = function(keyWord, tag) {
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(boligTableRowNumber(), housingTableLocator(), nextPageButtonBolig(), tag, 20).then(function(rowContent) {
            if (rowContent.length > 20) { firstPageButtonBolig().click(); }
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

    //search and click a row from bolig table by address
    this.clickBoligRowByAddress = function(address) {
        boligTab().click();
        searchHousingBox().sendKeys(address);
        boligRowByAddress(address).click();

        return require('./PropertyPage/PropertyDetailPage.js');
    };

}
module.exports = new propertyTabPage();