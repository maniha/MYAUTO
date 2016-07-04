describe('13.0 BuildingTabPage_tests', function () {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, plantDetailPage, buildingTab;

    //Data files  
    var loginData = require('../../testData/loginData.json');
    var plantData = require('../../testData/PlantPageData/plantData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        plantDetailPage = homePage.goToplantDetailPage();
        buildingTab = plantDetailPage.goToBuilding();
    });

    describe('Bygning table tests', function () {

        beforeAll(function () {
            buildingTab.beforeAllBygning();
        });

        it('Number of Bygning table rows are correct', function () {
            buildingTab.isBygningRowNumberCorrect().then(function (correct) {
                expect(correct).toBe(true);
            });
        });

        it('Check Bygning table search is working', function () {
            buildingTab.searchBygning(plantData.bygningSearchTxt);
            buildingTab.isBygningResultsDisplayed(plantData.bygningSearchTxt, plantData.bygningSearchTag).then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        describe('Bygning table sort tests', function () {
                
            beforeAll(function () {
                buildingTab.beforeAllBygning();
            });

            it('Check Bygning table is sorted by Address', function () {
                buildingTab.sortByAddressBygning_A2Z();
                buildingTab.isSortedByAddressBygning_A2Z().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
                buildingTab.sortByAddressBygning_A2Z();
                buildingTab.isSortedByAddressBygning_Z2A().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
            });

            it('Check Bygning table is sorted by Kunde', function () {
                buildingTab.sortByKundeBygning_A2Z();
                buildingTab.isSortedByKundeBygning_A2Z().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
                buildingTab.sortByKundeBygning_A2Z();
                buildingTab.isSortedByKundeBygning_Z2A().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
            });

            it('Check Bygning table is sorted by Bygningtype', function () {
                buildingTab.sortByBygningtypeBygning_A2Z();
                buildingTab.isSortedByBygningtypeBygning_A2Z().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
                buildingTab.sortByBygningtypeBygning_A2Z();
                buildingTab.isSortedByBygningtypeBygning_Z2A().then(function (isSorted) {
                    expect(isSorted).toBe(true);
                });
            });

        });

    });

afterAll(function () {
    homePage.logOut();
});

});

