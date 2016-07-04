describe('6.0 Document Tab tests', function () {

            //Pages
            var welcomePage = require('../../../pages/welcomePage.js');
            var loginPage, homePage, constructionPage, propetyDetailPage, plantPage, docTab;

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
                docTab = propetyDetailPage.goToDocument();
            });

            it('All the colums are visible', function () {
                docTab.isDocumentColumsDisplayed().then(function (visible) {
                    expect(visible).toBe(true);
                });
            });

            it('Number of Document table rows are correct', function () {
                docTab.isDocumentRowNumberCorrect().then(function (isCorrect) {
                    expect(isCorrect).toBe(true);
                })
            });

            describe('Document table sorting tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    docTab = propetyDetailPage.goToDocument();
                });

                it('Check Document table is sorted by Title', function () {
                    docTab.sortByDocTitle_A2Z();
                    docTab.isSortedByDocTitle_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    docTab.sortByDocTitle_A2Z();
                    docTab.isSortedByDocTitle_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Document table is sorted by Last Updated', function () {
                    docTab.sortByDocLastUpdated_A2Z();
                    docTab.isSortedByDocLastUpdated_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    docTab.sortByDocLastUpdated_A2Z();
                    docTab.isSortedByDocLastUpdated_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Document table is sorted by Updated By', function () {
                    docTab.sortByDocUpdatedBy_A2Z();
                    docTab.isSortedByDocUpdatedBy_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    docTab.sortByDocUpdatedBy_A2Z();
                    docTab.isSortedByDocUpdatedBy_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

                it('Check Document table is sorted by Order Number', function () {
                    docTab.sortByDocOrderNo_A2Z();
                    docTab.isSortedByDocOrderNo_A2Z().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                    docTab.sortByDocOrderNo_A2Z();
                    docTab.isSortedByDocOrderNo_Z2A().then(function (isSorted) {
                        expect(isSorted).toBe(true);
                    });
                });

            });

            describe('Document table search tests', function () {

                beforeAll(function () {
                    propetyDetailPage.beforeEach();
                    docTab = propetyDetailPage.goToDocument();
                });

                it('Check Document table search results displayed', function () {
                    docTab.searchDocTable(plantData.documentSearchTxt);
                    docTab.isDocumentResultsDisplayed(plantData.documentSearchTxt, plantData.documentSearchTag).then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

                it('Check Document table, no search results displayed', function () {
                    docTab.searchDocTable(plantData.errorKeyword);
                    docTab.isNoDocumentResultsDisplayed().then(function (isSearched) {
                        expect(isSearched).toBe(true);
                    });
                });

            });
            
            afterAll(function () {
                homePage.logOut();
            });

        });