describe('20.0 Project page tests', function() {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage;

    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projectData = require('../../testData/ProjectPageData/projectData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
    });

    beforeEach(function() {
        projectPage.beforeEach()
    })

    describe('Project page loaded', function() {
        it('Construction page loaded', function() {
            projectPage.isInProjectPage().then(function(headerTxt) {
                expect(headerTxt.trim()).toBe(projectData.headerTxt);
            });
        });
    });

    describe('Menu button test', function() {
        it('Menu button test', function() {
            expect(projectPage.isMenuDisplayed()).toBe(true);
            projectPage.clickMenuButton();
            expect(projectPage.isMenuDisplayed()).toBe(false);
            projectPage.clickMenuButton();
            expect(projectPage.isMenuDisplayed()).toBe(true);
        });
    });

    describe('Grid tests', function() {

        describe('Project table tests', function() {

            it('Number of Project table rows are correct', function() {
                projectPage.isProjectRowNumberCorrect().then(function(isCorrect) {
                    expect(isCorrect).toBe(true);
                })
            });

            it('All the colums are visible', function() {
                projectPage.isProjectColumsDisplayed().then(function(visible) {
                    expect(visible).toBe(true);
                });
            });

            describe('Project table search tests', function() {

                it('Check Project table search results displayed', function() {
                    projectPage.searchTable(projectData.searchTxt);
                    projectPage.isSearchResultsDisplayed(projectData.searchTxt, projectData.projectSearchTag).then(function(isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

                it('Check Project table, no search results displayed', function() {
                    projectPage.searchTable(projectData.errorKeyword);
                    projectPage.isNoSearchResultsDisplayed().then(function(isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

            });

            describe('Project table sorting tests', function () {

                it('Check Project table is sorted by Code', function () {
                    projectPage.sortByProjCode_A2Z();
                    projectPage.isSortedByProjCode_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjCode_A2Z();
                    projectPage.isSortedByProjCode_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Name', function () {
                    projectPage.sortByProjName_A2Z();
                    projectPage.isSortedByProjName_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjName_A2Z();
                    projectPage.isSortedByProjName_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Address', function () {
                    projectPage.sortByProjAddress_A2Z();
                    projectPage.isSortedByProjAddress_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjAddress_A2Z();
                    projectPage.isSortedByProjAddress_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Company', function () {
                    projectPage.sortByProjCompany_A2Z();
                    projectPage.isSortedByProjCompany_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjCompany_A2Z();
                    projectPage.isSortedByProjCompany_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Status', function () {
                    projectPage.sortByProjStatus_A2Z();
                    projectPage.isSortedByProjStatus_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjStatus_A2Z();
                    projectPage.isSortedByProjStatus_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Project table is sorted by Updated Date', function () {
                    projectPage.sortByProjUpdateDate_A2Z();
                    projectPage.isSortedByProjUpdateDate_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    projectPage.sortByProjUpdateDate_A2Z();
                    projectPage.isSortedByProjUpdateDate_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

            });

        });

    });

    afterAll(function() {
        homePage.logOut();
    });

});