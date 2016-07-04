require('./plantDetailPage.js');
require('./propertyTabPage.js')

var buildingTabPage = function () {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');

    //-----------------------------------------------bygning elements-----------------------------------------------
    var addressBygningHeader = function () {
        return element(by.linkText('Adresse'));
    };

    var kundeBygningHeader = function () {
        return element(by.linkText('Hjemmelshaver'));
    };

    var bygningtypeBygningHeader = function () {
        return element(by.linkText('Bygningtype'));
    };

    var addressBygningColumn = function () {
        return element.all(by.repeater("buildingPlant in buildingPlants| orderBy:predicate:reverse|BuildingPlantsFilter:buildingSearch| itemsPerPage:20 : 'buildingPag'").column('buildingPlant.FolderName'));
    };

    var kundeBygningColumn = function () {
        return element.all(by.repeater("buildingPlant in buildingPlants| orderBy:predicate:reverse|BuildingPlantsFilter:buildingSearch| itemsPerPage:20 : 'buildingPag'").column('buildingPlant.CustomerName'));
    };

    var bygningtypeBygningColumn = function () {
        return element.all(by.repeater("buildingPlant in buildingPlants| orderBy:predicate:reverse|BuildingPlantsFilter:buildingSearch| itemsPerPage:20 : 'buildingPag'").column('buildingPlant.BuildingType'));
    };

    var bygningTab = function () {
        return element.all(by.ngClick("setTabName('')")).last();
    };

    var bygningTableRowNumber = function () {
        return element.all(by.tagName('strong')).first();
    };

    var bygningTable = function () {
        return element.all(by.repeater("buildingPlant in buildingPlants| orderBy:predicate:reverse|BuildingPlantsFilter:buildingSearch| itemsPerPage:20 : 'buildingPag'"));
    };

    var bygningTableLocator = function () {
        return "buildingPlant in buildingPlants| orderBy:predicate:reverse|BuildingPlantsFilter:buildingSearch| itemsPerPage:20 : 'buildingPag'";
    };

    var firstPageButtonBygning = function () {
        return element.all(by.ngClick('setCurrent(1)')).last();
    };

    var previousPageButtonBygning = function () {
        return element.all(by.ngClick('setCurrent(pagination.current - 1)')).last();
    };

    var nextPageButtonBygning = function () {
        return element.all(by.ngClick('setCurrent(pagination.current + 1)')).last();
    };

    var lastPageButtonBygning = function () {
        return element.all(by.ngClick('setCurrent(pagination.last)')).last();
    };

    var selectedPageButtonBygning = function () {
        return element.all(by.css('.ng-scope.active')).last();
    };

    var searchBygningBox = function () {
        return element(by.id('buildingSearch'));
    };

    var bygningRowByAddress = function (address) {
        return element(by.linkText())
    };
    
    var boligRowByAddress = function (address) {
        return element(by.linkText(address));
    };
  
//-----------------------------------------------bygning tab controllers-----------------------------------------------
    
this.beforeAllBygning = function(){
    bygningTab().click();
    utilities.enterText(searchBygningBox(), 'z');
    utilities.clearText(searchBygningBox());
};
    
///search the bygning table
this.searchBygning = function(searchKey){
    bygningTab().click();
    searchBygningBox().sendKeys(searchKey);
};
    
//check the search results of Bygning table are correct
//input param :
this.isBygningResultsDisplayed = function(keyWord, tag){
    var deferred = protractor.promise.defer();
    utilities.tableAllToArray(bygningTableRowNumber(), bygningTableLocator(), nextPageButtonBygning(), tag).then(function(rowContent){
        if(rowContent.length > 20){firstPageButtonBygning().click();}
        for(var i = 0; i < rowContent.length; i++){
            if(rowContent[i].toString().toLowerCase().indexOf(keyWord) >= 0){
                deferred.fulfill(true);}
            else{
                deferred.fulfill(false);
                break; }
        }
    });
    return deferred.promise;
};

//check the number of rows in bygning table is correct
this.isBygningRowNumberCorrect = function(){
    var deferred = protractor.promise.defer();
    bygningTab().click();
    bygningTableRowNumber().getText().then(function(rowNo){
        if(rowNo > 20){
            lastPageButtonBygning().click();
            utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonBygning(), bygningTable(), 20).then(function(isCorrect){
                deferred.fulfill(isCorrect);
                firstPageButtonBygning().click();
            });
        }
        else{
            utilities.isLessRowNumberCorrect(rowNo, bygningTable()).then(function(isCorrect){
                deferred.fulfill(isCorrect);
            });
        }
    });
    return deferred.promise;
};
    
//sort the bygning table by Address
this.sortByAddressBygning_A2Z = function(){
    bygningTab().click();
    browser.driver.executeScript("arguments[0].click()", addressBygningHeader().getWebElement());        
};
    
//check the bygning table is sorted by Address A to Z
this.isSortedByAddressBygning_A2Z = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(addressBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};
    
//check the bygning table is sorted by Address Z to A
this.isSortedByAddressBygning_Z2A = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(addressBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};
    
//sort the bygning table by Kunde
this.sortByKundeBygning_A2Z = function(){
    bygningTab().click();
    browser.driver.executeScript("arguments[0].click()", kundeBygningHeader().getWebElement());        
};
    
//check the bygning table is sorted by Kunde A to Z
this.isSortedByKundeBygning_A2Z = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(kundeBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};
    
//check the bygning table is sorted by Kunde Z to A
this.isSortedByKundeBygning_Z2A = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(kundeBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};
    
//sort the bygning table by Bygningtype
this.sortByBygningtypeBygning_A2Z = function(){
    bygningTab().click();
    browser.driver.executeScript("arguments[0].click()", bygningtypeBygningHeader().getWebElement());        
};
    
//check the bygning table is sorted by Bygningtype A to Z
this.isSortedByBygningtypeBygning_A2Z = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_A2Z(bygningtypeBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};
    
//check the bygning table is sorted by Bygningtype Z to A
this.isSortedByBygningtypeBygning_Z2A = function(){
    var deferred = protractor.promise.defer();
    utilities.isColumnSorted_Z2A(bygningtypeBygningColumn()).then(function(isSorted){
        deferred.fulfill(isSorted);
    });
    return deferred.promise;
};

    //search and go to a document 
this.goToBuildingByAddress = function (address) {
    bygningTab().click();
    utilities.enterText(searchBygningBox(), address);
    boligRowByAddress(address).click();

    return require('./BuildingPage/buildingDetailPage.js');
};
}

module.exports = new buildingTabPage();

