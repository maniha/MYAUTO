var propertyDevicePage = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------device tab elements-----------------------------------------------

    var devicesTab = function() {
        return element(by.ngClick('setTab(4)'));
    };

    var nextPageButtonDocument = function() {
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };

    var documentTableRowNumber = function() {
        return element.all(by.tagName('strong')).first();
    };

    var noTableDataFoundText = function() {
        return element(by.css('.resultatet-teller-red'));
    };

    var lastPageButtonDocument = function() {
        return element(by.ngClick('setCurrent(pagination.last)'));
    };

    var firstPageButton = function() {
        return element(by.ngClick('setCurrent(1)'));
    };

    var selectedPageButtonDocument = function() {
        return element(by.css('.ng-scope.active'));
    };

    var deviceSearchBox = function() {
        return element(by.id('devicesSearch'));
    };

    var deviceTableLocator = function() {
        return "device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'";
    };

    var devicesTable = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'"));
    };

    var deviceNameHeader = function() {
        return element(by.linkText('Navn på enhet'));
    };

    var deviceUnitNameHeader = function() {
        return element(by.linkText('Rom'));
    };

    var deviceCodeHeader = function() {
        return element(by.linkText('Varenummer'));
    };

    var deviceWarrantyHeader = function() {
        return element(by.linkText('Garanti'));
    };

    var deviceInstalledYearHeader = function() {
        return element(by.linkText('Installert år'));
    };

    var deviceInstalledByHeader = function() {
        return element(by.linkText('Installert av'));
    };

    var deviceNameColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.ProductName'));
    };

    var deviceUnitNameColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.PropertyUnitName'));
    };

    var deviceCodeColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.ProductCode'));
    };

    var deviceWarrantyColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.WarrentyDuration'));
    };

    var deviceInstalledYearColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.InstallationYear'));
    };

    var deviceInstalledByColumn = function() {
        return element.all(by.repeater("device in devices| orderBy:predicate:reverse|devicesFilter:devicesSearch | itemsPerPage: 10 : 'plantDevicesPage'").column('device.CreatedCompany'));
    };

    //-----------------------------------------------device tab controllers-----------------------------------------------

    //search the Device table
    this.searchDeviceTable = function(searchKey) {
        devicesTab().click();
        utilities.enterText(deviceSearchBox(), searchKey);
    };

    //check the search results of Device table are correct
    this.isDeviceResultsDisplayed = function(keyWord, tag) {
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(documentTableRowNumber(), deviceTableLocator(), nextPageButtonDocument(), tag, 10).then(function(rowContent) {
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

    //check all the headers of device table is present
    this.isDeviceColumsDisplayed = function() {
        devicesTab().click();
        var deferred = protractor.promise.defer();
        deviceNameHeader().isPresent().then(function(imagePre) {
            if (imagePre) {
                deviceUnitNameHeader().isPresent().then(function(PDFPre) {
                    if (PDFPre) {
                        deviceCodeHeader().isPresent().then(function(titlePre) {
                            if (titlePre) {
                                deviceWarrantyHeader().isPresent().then(function(lastPre) {
                                    if (lastPre) {
                                        deviceInstalledYearHeader().isPresent().then(function(byPre) {
                                            if (byPre) {
                                                deviceInstalledByHeader().isPresent().then(function(noPre) {
                                                    if (byPre) {
                                                        deferred.fulfill(true);
                                                    } else { deferred.fulfill(false); }
                                                });
                                            } else { deferred.fulfill(false); }
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

    //check if no data found for Device search
    this.isNoDeviceResultsDisplayed = function() {
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), devicesTable()).then(function(resultsDisplayed) {
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };

    //check the number of rows in Document table is correct
    this.isDevicesRowNumberCorrect = function() {
        var deferred = protractor.promise.defer();
        devicesTab().click();
        documentTableRowNumber().getText().then(function(rowNo) {
            if (rowNo > 10) {
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), devicesTable(), 10).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else {
                utilities.isLessRowNumberCorrect(rowNo, devicesTable()).then(function(isCorrect) {
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };

    //sort the Device table by Name
    this.sortByDeviceName_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceNameHeader().getWebElement());
    };

    //sort the Device table by Unit Name
    this.sortByDeviceUnitName_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceUnitNameHeader().getWebElement());
    };

    //sort the Device table by Code
    this.sortByDeviceCode_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceCodeHeader().getWebElement());
    };

    //sort the Device table by Warranty
    this.sortByDeviceWarranty_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceWarrantyHeader().getWebElement());
    };

    //sort the Device table by Installed Year
    this.sortByDeviceInstalledYear_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceInstalledYearHeader().getWebElement());
    };

    //sort the Device table by Installed By
    this.sortByDeviceInstalledBy_A2Z = function() {
        devicesTab().click();
        browser.driver.executeScript("arguments[0].click()", deviceInstalledByHeader().getWebElement());
    };

    //check the Device table is sorted by Name A to Z
    this.isSortedByDeviceName_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(deviceNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Name Z to A
    this.isSortedByDeviceName_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(deviceNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Unit Name A to Z
    this.isSortedByDeviceUnitName_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(deviceUnitNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Unit Name Z to A
    this.isSortedByDeviceUnitName_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(deviceUnitNameColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Code A to Z
    this.isSortedByDeviceCode_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(deviceCodeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Code Z to A
    this.isSortedByDeviceCode_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(deviceCodeColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Warranty A to Z
    this.isSortedByDeviceWarranty_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_A2Z(deviceWarrantyColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Warranty Z to A
    this.isSortedByDeviceWarranty_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_Z2A(deviceWarrantyColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Installed Year A to Z
    this.isSortedByDeviceInstalledYear_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_A2Z(deviceInstalledYearColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Installed Year Z to A
    this.isSortedByDeviceInstalledYear_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_Z2A(deviceInstalledYearColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Installed By A to Z
    this.isSortedByDeviceInstalledBy_A2Z = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(deviceInstalledByColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //check the Device table is sorted by Installed By Z to A
    this.isSortedByDeviceInstalledBy_Z2A = function() {
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(deviceInstalledByColumn()).then(function(isSorted) {
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

}
module.exports = new propertyDevicePage();