var projRoomTab = function(){
          
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Rooms tab elements-----------------------------------------------
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first(); 
    };
    
    var projectMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var lastPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.last)'));
    };
    
    var nextPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };
    
    var selectedPageButton = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var roomNameHeader = function(){
        return element(by.linkText('Navn på rom'));
    };
    
    var roomSearchBox = function(){
        return element(by.id('projectpropertyUnitsSearch'));
    };
    
    var roomTypeHeader = function(){
        return element(by.linkText('Type rom'));
    };
    
    var roomDescriptionHeader = function(){
        return element(by.linkText('Beskrivelse'));
    };
    
    var roomsTableLocator = function(){
        return "propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'"
    };
    
    var roomsTable = function(){
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'"));
    };
    
    var roomNameColumn = function(){
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'").column('propertyUnit.Name'));
    };
    
    var roomTypeColumn = function(){
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'").column('propertyUnit.PropertyUnitType'));
    };
    
    var roomDescColumn = function(){
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'").column('propertyUnit.Description'));
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle.ng-scope'));
    };
    
    var addNewRoom = function(){
        return element(by.linkText('Nytt rom'));
    };
    
    var addedRoomName = function(){
        return element.all(by.repeater("propertyUnit in propertyUnits| orderBy:[predicate, 'Name']:reverse|ProjectPropertyUnitsFilter:projectPropertyUnitsSearch | itemsPerPage: 10 : 'projectProUnitsPag'").column('propertyUnit.Name')).first();
    };
    
    var plusButtonContainer = function(){
        return element(by.xpath('//div[@class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"]/div[@class="dropdown"]'))
    };
    
    //-----------------------------------------------Rooms tab controllers-----------------------------------------------
    
    this.beforeEachRoomTest = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            utilities.enterText(roomSearchBox(), "z");
            utilities.clearText(roomSearchBox());
        });
    };
    
    //go back to project page
    this.goToProjectPage = function(){
        projectMenuIcon().click();
        
        return require('./projectPage.js');
    };
    
    //to check if the file adding is disabled
    this.isFileAddingEnabled = function(){
        var deferred = protractor.promise.defer();
        plusButtonContainer().getOuterHtml().then(function(innerHtml){
            console.log(innerHtml);
            deferred.fulfill(innerHtml);
        });
        return deferred.promise;
    };
    
    //to get add room window
    this.getAddNewRoomForm = function(){
        plusButton().click();
        addNewRoom().click();
        browser.driver.sleep(1000);
        
        return require('./Modals/addNewRoom.js');
    };
    
    //to validate if the new room is added
    this.isNewRoomAdded = function(searchKey){
        var deferred = protractor.promise.defer();
        utilities.enterText(roomSearchBox(), searchKey);
        addedRoomName().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //search the Room table
    this.searchRoomTable = function(searchKey){
        utilities.enterText(roomSearchBox(), searchKey);
    };
    
    //check the search results of Room table are correct    
    this.isRoomResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(tableRowNumber(), roomsTableLocator(), nextPageButton(), tag, 10).then(function(rowContent){
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
    
    //check if no data found for Room search
    this.isNoRoomResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), roomsTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of Room table is present
    this.isRoomColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        roomNameHeader().isPresent().then(function(imagePre){
            if(imagePre){
                roomTypeHeader().isPresent().then(function(PDFPre){
                    if(PDFPre){
                        roomDescriptionHeader().isPresent().then(function(desc){
                            deferred.fulfill(true);
                        });
                    }else{deferred.fulfill(false);}
                });
            }else{deferred.fulfill(false);}
        });
        return deferred.promise;
    };
    
    //check the number of rows in Room table is correct
    this.isRoomsRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), roomsTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, roomsTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Room table by Name
    this.sortByRoomName_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", roomNameHeader().getWebElement());        
    };
    
    //sort the Room table by type
    this.sortByRoomType_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", roomTypeHeader().getWebElement());        
    };
    
    //sort the Room table by description
    this.sortByRoomDesc_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", roomDescriptionHeader().getWebElement());        
    };
    
    //check the Room table is sorted by name A to Z
    this.isSortedByRoomName_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(roomNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Room table is sorted by name Z to A
    this.isSortedByRoomName_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(roomNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Room table is sorted by type A to Z
    this.isSortedByRoomType_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(roomTypeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Room table is sorted by type Z to A
    this.isSortedByRoomType_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(roomTypeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Room table is sorted by Description A to Z
    this.isSortedByRoomDesc_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(roomDescColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Room table is sorted by Description Z to A
    this.isSortedByRoomDesc_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(roomDescColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
}
module.exports = new projRoomTab()