describe('17.0 Project Device grid tests', function() {

    var path = require('path');

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage, projDeviceTab, addNewDevice;

    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projDeviceData = require('../../testData/ProjectPageData/projDeviceData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projDeviceData.projectNoForDocument);
        projDeviceTab = projDetailPage.goToDeviceTab();
    });

    it('All the colums are visible', function() {
        projDeviceTab.isDeviceColumsDisplayed().then(function(visible) {
            expect(visible).toBe(true);
        });
    });

    it('Number of Device table rows are correct', function() {
        projDeviceTab.isDeviceRowNumberCorrect().then(function(isCorrect) {
            expect(isCorrect).toBe(true);
        })
    });

    describe('Device table sorting tests', function() {

        beforeAll(function() {
            projDeviceTab.beforeEachDeviceTest();
        });

        it('Check Device table is sorted by Name', function() {
            projDeviceTab.sortByDeviceName_A2Z();
            projDeviceTab.isSortedByDeviceName_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceName_A2Z();
            projDeviceTab.isSortedByDeviceName_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Device table is sorted by Code', function() {
            projDeviceTab.sortByDeviceCode_A2Z();
            projDeviceTab.isSortedByDeviceCode_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceCode_A2Z();
            projDeviceTab.isSortedByDeviceCode_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Device table is sorted by Room', function() {
            projDeviceTab.sortByDeviceRoom_A2Z();
            projDeviceTab.isSortedByDeviceRoom_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceRoom_A2Z();
            projDeviceTab.isSortedByDeviceRoom_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Device table is sorted by Warranty', function() {
            projDeviceTab.sortByDeviceWarranty_A2Z();
            projDeviceTab.isSortedByDeviceWarranty_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceWarranty_A2Z();
            projDeviceTab.isSortedByDeviceWarranty_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Device table is sorted by Installed Year', function() {
            projDeviceTab.sortByDeviceInstalledYear_A2Z();
            projDeviceTab.isSortedByDeviceInstalledYear_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceInstalledYear_A2Z();
            projDeviceTab.isSortedByDeviceInstalledYear_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Device table is sorted by Created By', function() {
            projDeviceTab.sortByDeviceCreatedBy_A2Z();
            projDeviceTab.isSortedByDeviceCreatedBy_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projDeviceTab.sortByDeviceCreatedBy_A2Z();
            projDeviceTab.isSortedByDeviceCreatedBy_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Device table search tests', function() {

        it('Check Device table search is working', function() {
            projDeviceTab.searchDeviceTable(projDeviceData.deviceSearchTxt);
            projDeviceTab.isDeviceResultsDisplayed(projDeviceData.deviceSearchTxt, projDeviceData.deviceSearchTag).then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Device table, no search results displayed', function() {
            projDeviceTab.searchDeviceTable(projDeviceData.errorKeyword);
            projDeviceTab.isNoDeviceResultsDisplayed().then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

    describe('New Device adding tests', function() {

        beforeAll(function() {
            projDeviceTab.beforeEachDeviceTest();
        });

        /*it('Adding new device with mandotory fields', function() {
            projDeviceTab.getNumberOfRows().then(function(noBfore) {
                var rowNo = parseInt(noBfore);
                addNewDevice = projDeviceTab.getAddNewDeviceForm();
                addNewDevice.addDeviceWithMandotory(projDeviceData.deviceName1, projDeviceData.deviceType);
                projDeviceTab.getNumberOfRows().then(function(noAfter) {
                    expect(parseInt(noAfter)).toBe(rowNo + 1);
                });
            });
        });

        it('Adding new device with all the fields', function() {
            projDeviceTab.getNumberOfRows().then(function(noBfore) {
                var rowNo = parseInt(noBfore);
                var filePath = path.resolve(__dirname, projDeviceData.manualPath);
                addNewDevice = projDeviceTab.getAddNewDeviceForm();
                addNewDevice.addDeviceWithOptional(projDeviceData.deviceName2, projDeviceData.deviceDesc, projDeviceData.deviceType, projDeviceData.manufacture, projDeviceData.codeType, projDeviceData.productCode, projDeviceData.gtinNumber, projDeviceData.lifeExpectancy, projDeviceData.warrantyDuration, projDeviceData.buildingElementId, projDeviceData.installationYear, projDeviceData.roomId, filePath);
                projDeviceTab.getNumberOfRows().then(function(noAfter) {
                    expect(parseInt(noAfter)).toBe(rowNo + 1);
                });
            });
        });*/

        it('Test for mandatory field validation', function() {
            addNewDevice = projDeviceTab.getAddNewDeviceForm();
            addNewDevice.validateDeviceName().then(function(isValidated) {
                expect(isValidated).toBe(true);
                addNewDevice.validateDeviceType(projDeviceData.valName).then(function(typevalid) {
                    expect(typevalid).toBe(true);
                    addNewDevice.closeForm();
                });
            });
            browser.driver.sleep(1500);
        });
    });

    afterAll(function() {
        homePage.logOut();
    });

});