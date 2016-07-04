describe('5.0 Device Tab Tests', function () {

    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, propetyDetailPage, plantPage, docTab, deviceTab;
    
    //Data files
    var loginData = require('../../../testData/loginData.json');
    var plantData = require('../../../testData/PlantPageData/PropertyTabData/propertyData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToplantDetailPage();
        plantPage = constructionPage.goToProperty()
        propetyDetailPage = plantPage.clickBoligRowByAddress(plantData.plantName);
        propetyDetailPage.beforeEach();
        deviceTab = propetyDetailPage.goToDevice();
    });
            it('All the colums are visible', function () {
                deviceTab.isDeviceColumsDisplayed().then(function (isCorrect) {
                    expect(isCorrect).toBe(true);
                });
            });

            it('Number of Devices table rows are correct', function () {
                deviceTab.isDevicesRowNumberCorrect().then(function (isCorrect) {
                    expect(isCorrect).toBe(true);
                })
            });

            describe('Device table sorting tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    deviceTab = propetyDetailPage.goToDevice();
                });

                it('Check Device table is sorted by Name', function () {
                    deviceTab.sortByDeviceName_A2Z();
                    deviceTab.isSortedByDeviceName_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceName_A2Z();
                    deviceTab.isSortedByDeviceName_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Device table is sorted by Unit Name', function () {
                    deviceTab.sortByDeviceUnitName_A2Z();
                    deviceTab.isSortedByDeviceUnitName_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceUnitName_A2Z();
                    deviceTab.isSortedByDeviceUnitName_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Device table is sorted by Code', function () {
                    deviceTab.sortByDeviceCode_A2Z();
                    deviceTab.isSortedByDeviceCode_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceCode_A2Z();
                    deviceTab.isSortedByDeviceCode_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Device table is sorted by Warranty', function () {
                    deviceTab.sortByDeviceWarranty_A2Z();
                    deviceTab.isSortedByDeviceWarranty_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceWarranty_A2Z();
                    deviceTab.isSortedByDeviceWarranty_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Device table is sorted by Installed Year', function () {
                    deviceTab.sortByDeviceInstalledYear_A2Z();
                    deviceTab.isSortedByDeviceInstalledYear_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceInstalledYear_A2Z();
                    deviceTab.isSortedByDeviceInstalledYear_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Device table is sorted by Installed By', function () {
                    deviceTab.sortByDeviceInstalledBy_A2Z();
                    deviceTab.isSortedByDeviceInstalledBy_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByDeviceInstalledBy_A2Z();
                    deviceTab.isSortedByDeviceInstalledBy_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

            });

            describe('Device table search tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    deviceTab = propetyDetailPage.goToDevice();
                });

                it('Check Device table search is working', function () {
                    deviceTab.searchDeviceTable(plantData.deviceSearchTxt);
                    deviceTab.isDeviceResultsDisplayed(plantData.deviceSearchTxt, plantData.deviceSearchTag).then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

                it('Check Device table, no search results displayed', function () {
                    deviceTab.searchDeviceTable(plantData.errorKeyword);
                    deviceTab.isNoDeviceResultsDisplayed().then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

            });

            afterAll(function () {
                homePage.logOut();
            });


        });