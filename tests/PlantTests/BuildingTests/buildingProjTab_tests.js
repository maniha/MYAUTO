describe('12.0 Building Project Tab tests', function () {
    
    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, buildingDetailPage, buildingProjPage, buildingTab;
    
    //Data files  
    var loginData = require('../../../testData/loginData.json');
    var buildingProjectData = require('../../../testData/PlantPageData/BuildingTabData/buildingProjectData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToplantDetailPage();
        buildingTab = constructionPage.goToBuilding();
        buildingDetailPage = buildingTab.goToBuildingByAddress(buildingProjectData.buildingName);
        buildingProjPage = buildingDetailPage.goToProject();
    });

    afterAll(function () {
        homePage.logOut();
    });

    it('Check all the headers of the table is displaying', function () {
        buildingProjPage.isColumsDisplayed().then(function (isDisplayed) {
            expect(isDisplayed).toBe(true);
        });
    });

    it('Check if the number of rows is correct', function () {
        buildingProjPage.isRowNumberCorrect().then(function (rowNo) {
            expect(rowNo).toBe(true);
        });
    })

    describe('Project table sorting tests', function () {
        
        beforeAll(function(){
            buildingProjPage.beforeAll();
        });

        it('Check Project table is sorted by Code', function () {
            buildingProjPage.sortByCode();
            buildingProjPage.isSortedByCode_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingProjPage.sortByCode();
            buildingProjPage.isSortedByCode_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Project table is sorted by Name', function () {
            buildingProjPage.sortByName();
            buildingProjPage.isSortedByName_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingProjPage.sortByName();
            buildingProjPage.isSortedByName_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Project table is sorted by Company', function () {
            buildingProjPage.sortByCompany();
            buildingProjPage.isSortedByCompany_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingProjPage.sortByCompany();
            buildingProjPage.isSortedByCompany_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Project table is sorted by Updated Date', function () {
            buildingProjPage.sortByOrderNo();
            buildingProjPage.isSortedBylastUpdatedastUpdated_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingProjPage.sortByOrderNo();
            buildingProjPage.isSortedBylastUpdatedastUpdated_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Project table is sorted by Status', function () {
            buildingProjPage.sortByStatus();
            buildingProjPage.isSortedByStatus_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingProjPage.sortByStatus();
            buildingProjPage.isSortedByStatus_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Project table search tests', function () {

        beforeAll(function () {
            buildingProjPage.beforeAll();
        });

        it('Check Project table search results displayed', function () {
            buildingProjPage.searchTable(buildingProjectData.searchTxt);
            buildingProjPage.isResultsDisplayed(buildingProjectData.searchTxt, buildingProjectData.searchTag).then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Project table, no search results displayed', function () {
            buildingProjPage.searchTable(buildingProjectData.errorKeyword);
            buildingProjPage.isNoResultsDisplayed().then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

});