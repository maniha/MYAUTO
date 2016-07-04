describe('15.0 Document grid tests', function () {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage, projDocumentTab;
    
    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projDetailData = require('../../testData/ProjectPageData/projectDetailData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projDetailData.projectNoForDocument);
        projDocumentTab = projDetailPage.goToDocumentTab();
    });

    it('All the colums are visible', function () {
        projDocumentTab.isDocumentColumsDisplayed().then(function (visible) {
            expect(visible).toBe(true);
        });
    });

    it('Number of Document table rows are correct', function () {
        projDocumentTab.isDocumentRowNumberCorrect().then(function (isCorrect) {
            expect(isCorrect).toBe(true);
        })
    });

    describe('Document table sorting tests', function () {

        beforeAll(function () {
            projDocumentTab.beforeEachDocTest();
        });

        it('Check Document table is sorted by Title', function () {
            projDocumentTab.sortByDocTitle_A2Z();
            projDocumentTab.isSortedByDocTitle_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocTitle_A2Z();
            projDocumentTab.isSortedByDocTitle_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Last Updated', function () {
            projDocumentTab.sortByDocLastUpdated_A2Z();
            projDocumentTab.isSortedByDocLastUpdated_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocLastUpdated_A2Z();
            projDocumentTab.isSortedByDocLastUpdated_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Updated By', function () {
            projDocumentTab.sortByDocUpdatedBy_A2Z();
            projDocumentTab.isSortedByDocUpdatedBy_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocUpdatedBy_A2Z();
            projDocumentTab.isSortedByDocUpdatedBy_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Document table is sorted by Order Number', function () {
            projDocumentTab.sortByDocOrderNo_A2Z();
            projDocumentTab.isSortedByDocOrderNo_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocOrderNo_A2Z();
            projDocumentTab.isSortedByDocOrderNo_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        /*it('Check Document table is sorted by Source', function () {
            projDocumentTab.sortByDocSource_A2Z();
            projDocumentTab.isSortedByDocSource_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocSource_A2Z();
            projDocumentTab.isSortedByDocSource_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });*/

        it('Check Document table is sorted by Company', function () {
            projDocumentTab.sortByDocCompany_A2Z();
            projDocumentTab.isSortedByDocCompany_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projDocumentTab.sortByDocCompany_A2Z();
            projDocumentTab.isSortedByDocCompany_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Document table search tests', function () {
        
        it('Check, show only shared documents feature is functional', function(){
            projDocumentTab.filterBySharedDocs();
            projDocumentTab.isFilteredDocsVisible('ng-scope success').then(function(isFiltered){
                expect(isFiltered).toBe(true);
            });
        });
        
        it('Check, show only My documents feature is functional', function(){
            projDocumentTab.filterByMyDocs();
            projDocumentTab.isFilteredDocsVisible('ng-scope').then(function(isFiltered){
                expect(isFiltered).toBe(true);
            });
        });
        
        it('Check, show All documents feature is functional', function(){
            projDocumentTab.filterByAllDocs();
            projDocumentTab.isAllDocsVisible('ng-scope success', 'ng-scope').then(function(isFiltered){
                expect(isFiltered).toBe(true);
            });
        });

        it('Check chapter tag filtering works', function () {
            projDocumentTab.filterChapterTag();
            projDocumentTab.chapterTagFiltered(projDetailData.bubbleValidator, projDetailData.bubbleTag).then(function (isFiltered) {
                console.log(isFiltered);
                expect(isFiltered).toBe(true);
            });
        });

        it('Check Document table search results displayed', function () {
            projDocumentTab.resetChapterTag();
            projDocumentTab.searchDocTable(projDetailData.documentSearchTxt);
            projDocumentTab.isDocumentResultsDisplayed(projDetailData.documentSearchTxt, projDetailData.documentSearchTag).then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Document table, no search results displayed', function () {
            projDocumentTab.searchDocTable(projDetailData.errorKeyword);
            projDocumentTab.isNoDocumentResultsDisplayed().then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

    afterAll(function () {
        homePage.logOut();
    });

});