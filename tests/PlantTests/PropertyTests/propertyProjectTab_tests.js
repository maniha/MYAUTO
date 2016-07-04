describe('7.0 Project Tab tests', function () {

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
        deviceTab = propetyDetailPage.goToProject();
    });

            it('All the colums are visible', function () {
                deviceTab.isProjectColumsDisplayed().then(function (isCorrect) {
                    expect(isCorrect).toBe(true);
                });
            });

            it('Number of Project table rows are correct', function () {
                deviceTab.isProjectRowNumberCorrect().then(function (isCorrect) {
                    expect(isCorrect).toBe(true);
                });
            });

            describe('Project table sorting tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    deviceTab = propetyDetailPage.goToProject();
                });

                it('Check Project table is sorted by Number', function () {
                    deviceTab.sortByProjectNo_A2Z();
                    deviceTab.isSortedByProjectNo_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByProjectNo_A2Z();
                    deviceTab.isSortedByProjectNo_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Name', function () {
                    deviceTab.sortByProjectName_A2Z();
                    deviceTab.isSortedByProjectName_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByProjectName_A2Z();
                    deviceTab.isSortedByProjectName_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Manager', function () {
                    deviceTab.sortByProjectManager_A2Z();
                    deviceTab.isSortedByProjectManager_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByProjectManager_A2Z();
                    deviceTab.isSortedByProjectManager_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Last Updated', function () {
                    deviceTab.sortByProjectLastUpdated_A2Z();
                    deviceTab.isSortedByProjectLastUpdated_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByProjectLastUpdated_A2Z();
                    deviceTab.isSortedByProjectLastUpdated_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Status', function () {
                    deviceTab.sortByProjectStatus_A2Z();
                    deviceTab.isSortedByProjectStatus_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    deviceTab.sortByProjectStatus_A2Z();
                    deviceTab.isSortedByProjectStatus_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

            });

            describe('Project table search tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    deviceTab = propetyDetailPage.goToProject();
                });

                it('Check Project table search is working', function () {
                    deviceTab.searchProjectTable(plantData.projectSearchTxt);
                    deviceTab.isProjectResultsDisplayed(plantData.projectSearchTxt, plantData.projectSearchTag).then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

                it('Check Project table, no search results displayed', function () {
                    deviceTab.searchProjectTable(plantData.errorKeyword);
                    deviceTab.isNoProjectResultsDisplayed().then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

            });
            
            afterAll(function () {
                homePage.logOut();
            });

        });