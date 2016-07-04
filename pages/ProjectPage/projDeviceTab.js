var projDeviceTab = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Device tab elements-----------------------------------------------
    var deviceTable = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'"));
    };
    
    var projectMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var deviceSearchBox = function(){
        return element(by.id('projectDevicesSearch'));
    };
    
    var deviceTableLocator = function(){
        return "dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'";
    };
    
    var productNameHeader = function(){
        return element(by.ngClick("order('ProductName')"));
    };
    
    var productCodeHeader = function(){
        return element(by.ngClick("order('ProductCode')"));
    };
    
    var productRoomHeader = function(){
        return element(by.ngClick("order('RoomName')"));
    };
    
    var productWarrantyHeader = function(){
        return element(by.ngClick("order('WarrentyDuration')"));
    };
    
    var productInstallYearHeader = function(){
        return element(by.ngClick("order('InstallationYear')"));
    };
    
    var productCreatedByHeader = function(){
        return element(by.ngClick("order('CreatedCompany')"));
    };
    
    var proNameColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.ProductName'));
    };
    
    var proCodeColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.ProductCode'));
    };
    
    var proRoomColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.RoomName'));
    };
    
    var proWarrantyColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.WarrentyDuration'));
    };
    
    var proInstalledYearColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.InstallationYear'));
    };
    
    var proCreatedByColumn = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.CreatedCompany'));
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
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first(); 
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle.ng-scope'));
    };
    
    var addNewDevice = function(){
        return element(by.linkText('Ny enhet'));
    };
    
    var addedDeviceName = function(){
        return element.all(by.repeater("dev in devlist | orderBy:predicate:reverse | filter:projectDevicesSearch | itemsPerPage: 10 : 'projDevPag'").column('dev.ProductName')).first();
    };
    
    var plusButtonContainer = function(){
        return element(by.xpath('//div[@class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"]/div[@class="dropdown"]'))
    };
    
    //-----------------------------------------------Device tab controllers-----------------------------------------------
    this.beforeEachDeviceTest = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            utilities.enterText(deviceSearchBox(), "z");
            utilities.clearText(deviceSearchBox());
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
    
    //search the Device table
    this.searchDeviceTable = function(searchKey){
        utilities.enterText(deviceSearchBox(), searchKey);
    };
    
    //get No of rows 
    this.getNumberOfRows = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(no){
            deferred.fulfill(no);
        });
        return deferred.promise;
    };
    
    //to get add Device window
    this.getAddNewDeviceForm = function(){
        plusButton().click();
        addNewDevice().click();
        browser.driver.sleep(1000);
        
        return require('./Modals/addNewDevice.js');
    };
    
    //to validate if the new Device is added
    this.isNewDeviceAdded = function(searchKey){
        var deferred = protractor.promise.defer();
        utilities.enterText(deviceSearchBox(), searchKey);
        addedDeviceName().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //check the search results of Device table are correct
    this.isDeviceResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(tableRowNumber(), deviceTableLocator(), nextPageButton(), tag, 10).then(function(rowContent){
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
    
    //check if no data found for Device search
    this.isNoDeviceResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), deviceTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of device table is present
    this.isDeviceColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        productNameHeader().isPresent().then(function(cNo){
            if(cNo){
                productCodeHeader().isPresent().then(function(cName){
                    if(cName){
                        productRoomHeader().isPresent().then(function(cAddress){
                            if(cAddress){
                                productWarrantyHeader().isPresent().then(function(cZip){
                                    if(cZip){
                                        productInstallYearHeader().isPresent().then(function(cCity){
                                            if(cCity){
                                                productCreatedByHeader().isPresent().then(function(conPer){
                                                    if(conPer){
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
        return deferred.promise;
    };
    
    //check the number of rows in Device table is correct Device
    this.isDeviceRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), deviceTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, deviceTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Device table by name
    this.sortByDeviceName_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productNameHeader().getWebElement());        
    };
    
    //sort the Device table by code
    this.sortByDeviceCode_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productCodeHeader().getWebElement());        
    };
    
    //sort the Device table by Room
    this.sortByDeviceRoom_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productRoomHeader().getWebElement());        
    };
    
    //sort the Device table by warranty
    this.sortByDeviceWarranty_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productWarrantyHeader().getWebElement());        
    };
    
    //sort the Device table by Installed year
    this.sortByDeviceInstalledYear_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productInstallYearHeader().getWebElement());        
    };
    
    //sort the Device table by Created Company
    this.sortByDeviceCreatedBy_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", productCreatedByHeader().getWebElement());        
    };
    
    //check the Device table is sorted by Name A to Z
    this.isSortedByDeviceName_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(proNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Name Z to A
    this.isSortedByDeviceName_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(proNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Code A to Z
    this.isSortedByDeviceCode_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(proCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Code Z to A
    this.isSortedByDeviceCode_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(proCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Room A to Z
    this.isSortedByDeviceRoom_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(proRoomColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Room Z to A
    this.isSortedByDeviceRoom_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(proRoomColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Warranty A to Z
    this.isSortedByDeviceWarranty_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_A2Z(proWarrantyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Warranty Z to A
    this.isSortedByDeviceWarranty_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_Z2A(proWarrantyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Installed Year A to Z
    this.isSortedByDeviceInstalledYear_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_A2Z(proInstalledYearColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Installed Year Z to A
    this.isSortedByDeviceInstalledYear_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_Z2A(proInstalledYearColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Created By A to Z
    this.isSortedByDeviceCreatedBy_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(proCreatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Device table is sorted by Created By Z to A
    this.isSortedByDeviceCreatedBy_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(proCreatedByColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
}
module.exports = new projDeviceTab();