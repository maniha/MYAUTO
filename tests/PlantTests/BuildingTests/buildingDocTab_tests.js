describe('11.0 Building Documentation Tab tests', function() {

    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, plantDetailPage, buildingDetailPage, buildingDocPage, buildingTab;

    //Data files  
    var loginData = require('../../../testData/loginData.json');
    var buildingDocumentData = require('../../../testData/PlantPageData/BuildingTabData/buildingDocumentData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        plantDetailPage = homePage.goToplantDetailPage();
        buildingTab = plantDetailPage.goToBuilding();
        buildingDetailPage = buildingTab.goToBuildingByAddress(buildingDocumentData.buildingName);
        buildingDocPage = buildingDetailPage.goToDocument();
    });

    afterAll(function() {
        homePage.logOut();
    });

    it('Check all the headers of the table is displaying', function() {
        buildingDocPage.isDocumentColumsDisplayed().then(function(isDisplayed) {
            expect(isDisplayed).toBe(true);
        });
    });

    it('Check if the number of rows is correct', function() {
        buildingDocPage.isDocumentRowNumberCorrect().then(function(rowNo) {
            expect(rowNo).toBe(true);
        });
    });

    describe('Document table sorting tests', function() {

        beforeAll(function() {
            buildingDocPage.beforeAll();
        });

        it('Check Document table is sorted by Title', function() {
            buildingDocPage.sortByTitle();
            buildingDocPage.isSortedByTitle_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingDocPage.sortByTitle();
            buildingDocPage.isSortedByTitle_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Last Updated', function() {
            buildingDocPage.sortByLastUpdated();
            buildingDocPage.isSortedByLastUpdated_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingDocPage.sortByLastUpdated();
            buildingDocPage.isSortedByLastUpdated_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Updated By', function() {
            buildingDocPage.sortByUpdatedBy();
            buildingDocPage.isSortedByUpdatedBy_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingDocPage.sortByUpdatedBy();
            buildingDocPage.isSortedByUpdatedBy_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Order Number', function() {
            buildingDocPage.sortByOrderNo();
            buildingDocPage.isSortedByOrderNo_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingDocPage.sortByOrderNo();
            buildingDocPage.isSortedByOrderNo_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        /*it('Check Document table is sorted by Source', function() {
            buildingDocPage.sortBySource();
            buildingDocPage.isSortedBySource_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            buildingDocPage.sortBySource();
            buildingDocPage.isSortedBySource_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });*/

    });

    describe('Document table search tests', function() {

        beforeAll(function() {
            buildingDocPage.beforeAll();
        });

        it('Check Document table search results displayed', function() {
            buildingDocPage.searchTable(buildingDocumentData.searchTxt);
            buildingDocPage.isResultsDisplayed(buildingDocumentData.searchTxt, buildingDocumentData.searchTag).then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Document table, no search results displayed', function() {
            buildingDocPage.searchTable(buildingDocumentData.errorKeyword);
            buildingDocPage.isNoResultsDisplayed().then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check all the headers of the table is displaying', function() {
            buildingDocPage.beforeAll();
            buildingDocPage.filterChapterTag();
            buildingDocPage.chapterTagFiltered(buildingDocumentData.bubbleValidator, buildingDocumentData.bubbleTag).then(function(isFiltered) {
                console.log(isFiltered);
                expect(isFiltered).toBe(true);
            });
        });

    });

});