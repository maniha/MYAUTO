describe('18.0 Project Company grid tests', function () {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage, projCompanyTab;
    
    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projDetailData = require('../../testData/ProjectPageData/projectDetailData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projDetailData.projectNoForDocument);
        projCompanyTab = projDetailPage.goToCompanyTab();
    });

    it('All the colums are visible', function () {
        projCompanyTab.isCompanyColumsDisplayed().then(function (visible) {
            expect(visible).toBe(true);
        });
    });

    it('Number of Company table rows are correct', function () {
        projCompanyTab.isCompanyRowNumberCorrect().then(function (isCorrect) {
            expect(isCorrect).toBe(true);
        })
    });

    describe('Company table sorting tests', function () {

        beforeAll(function () {
            projCompanyTab.beforeEachCompanyTest();
        });

        it('Check Company table is sorted by No', function () {
            projCompanyTab.sortByCompanyNo_A2Z();
            projCompanyTab.isSortedByCompanyNo_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortByCompanyNo_A2Z();
            projCompanyTab.isSortedByCompanyNo_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by Name', function () {
            projCompanyTab.sortByCompanyName_A2Z();
            projCompanyTab.isSortedByCompanyName_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortByCompanyName_A2Z();
            projCompanyTab.isSortedByCompanyName_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by Address', function () {
            projCompanyTab.sortByCompanyAddress_A2Z();
            projCompanyTab.isSortedByCompanyAddress_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortByCompanyAddress_A2Z();
            projCompanyTab.isSortedByCompanyAddress_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by Professions', function () {
            projCompanyTab.sortBycompanyProfessions_A2Z();
            projCompanyTab.isSortedBycompanyProfessions_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortBycompanyProfessions_A2Z();
            projCompanyTab.isSortedBycompanyProfessions_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by DocumentCount', function () {
            projCompanyTab.sortBycompanyDocumentCount_A2Z();
            projCompanyTab.isSortedBycompanyDocumentCount_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortBycompanyDocumentCount_A2Z();
            projCompanyTab.isSortedBycompanyDocumentCount_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by Contact Person', function () {
            projCompanyTab.sortByCompanyConPerson_A2Z();
            projCompanyTab.isSortedByCompanyContactPerson_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortByCompanyConPerson_A2Z();
            projCompanyTab.isSortedByCompanyContactPerson_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Company table is sorted by Email', function () {
            projCompanyTab.sortByCompanyEmail_A2Z();
            projCompanyTab.isSortedByCompanyEmail_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projCompanyTab.sortByCompanyEmail_A2Z();
            projCompanyTab.isSortedByCompanyEmail_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Company table search tests', function () {

        it('Check Company table search is working', function () {
            projCompanyTab.searchCompanyTable(projDetailData.companySearchTxt);
            projCompanyTab.isCompanyResultsDisplayed(projDetailData.companySearchTxt, projDetailData.companySearchTag).then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Company table, no search results displayed', function () {
            projCompanyTab.searchCompanyTable(projDetailData.errorKeyword);
            projCompanyTab.isNoCompanyResultsDisplayed().then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

    afterAll(function () {
        homePage.logOut();
    });

});