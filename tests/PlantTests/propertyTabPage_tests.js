describe('4.0 PropertyTabPage_tests', function () {
    
    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, plantDetailPage;

    //Data files  
    var loginData = require('../../testData/loginData.json');
    var plantData = require('../../testData/PlantPageData/plantData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        plantDetailPage = homePage.goToplantDetailPage();
        propertyTab = plantDetailPage.goToProperty();
    });

        describe('Bolig table tests', function () {

            beforeAll(function () {
                propertyTab.beforeAllBolig();
            });

            it('Number of Bolig table rows are correct', function () {
                propertyTab.isBoligRowNumberCorrect().then(function (correct) {
                    expect(correct).toBe(true);
                });
            });

            it('Check Bolig table search is working', function () {
                propertyTab.searchHousing(plantData.boligSearchTxt);
                propertyTab.isHousingResultsDisplayed(plantData.boligSearchTxt, plantData.boligSearchTag).then(function (isSearched) {
                    expect(isSearched).toBe(true);
                });
            });

            describe('Bolig table sort tests', function () {

                beforeAll(function () {
                    propertyTab.beforeAllBolig();
                });

                it('Check Bolig table is sorted by Address', function () {
                    propertyTab.sortByAddress_A2Z();
                    propertyTab.isSortedByAddress_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    propertyTab.sortByAddress_A2Z();
                    propertyTab.isSortedByAddress_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Bolig table is sorted by Kunde', function () {
                    propertyTab.sortByKunde_A2Z();
                    propertyTab.isSortedByKunde_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    propertyTab.sortByKunde_A2Z();
                    propertyTab.isSortedByKunde_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Bolig table is sorted by Matrikkel', function () {
                    propertyTab.sortByMatrikkel_A2Z();
                    propertyTab.isSortedByMatrikkel_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    propertyTab.sortByMatrikkel_A2Z();
                    propertyTab.isSortedByMatrikkel_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Bolig table is sorted by Bruksenhet', function () {
                    propertyTab.sortByBruksenhet_A2Z();
                    propertyTab.isSortedByBruksenhet_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    propertyTab.sortByBruksenhet_A2Z();
                    propertyTab.isSortedByBruksenhet_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

            });

        });


       afterAll(function () {
            homePage.logOut();
        });

    });







