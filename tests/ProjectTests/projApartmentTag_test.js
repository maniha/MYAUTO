describe('19.0 Project Apartment Tag grid tests', function() {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage, projApartmentTag, addApartmentTag;

    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projApaTagData = require('../../testData/ProjectPageData/projApaTagData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projApaTagData.projectNoForDocument);
        projApartmentTag = projDetailPage.goToApartmentTag();
    });

    it('All the colums are visible', function() {
        projApartmentTag.isColumsDisplayed().then(function(visible) {
            expect(visible).toBe(true);
        });
    });

    it('Number of Apartment Tag table rows are correct', function() {
        projApartmentTag.isRowNumberCorrect().then(function(isCorrect) {
            expect(isCorrect).toBe(true);
        })
    });

    describe('Apartment Tag table sorting tests', function() {

        beforeAll(function() {
            projApartmentTag.beforeAll();
        });

        it('Check Apartment Tag table is sorted by Tag Name', function() {
            projApartmentTag.sortByApartmentTag_A2Z();
            projApartmentTag.isSortedByApartmentTag_A2Z().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
            projApartmentTag.sortByApartmentTag_A2Z();
            projApartmentTag.isSortedByApartmentTag_Z2A().then(function(isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Apartment Tag table search tests', function() {

        it('Check Apartment Tag table search is working', function() {
            projApartmentTag.searchTable(projApaTagData.apaTagSearchTxt);
            projApartmentTag.isResultsDisplayed(projApaTagData.apaTagSearchTxt, projApaTagData.apaTagSearchTag).then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Apartment Tag table, no search results displayed', function() {
            projApartmentTag.searchTable(projApaTagData.errorKeyword);
            projApartmentTag.isNoResultsDisplayed().then(function(isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

    describe('Add / Delete Apartment Tags', function() {

        beforeAll(function() {
            projApartmentTag.beforeAll();
        });

        it('Check adding new Apartment tag is functional', function() {
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.addNewTag(projApaTagData.newApaTagName);
            projApartmentTag.isNewTagAdded(projApaTagData.newApaTagName).then(function(isAdded) {
                expect(isAdded).toContain(projApaTagData.newApaTagName);
            });
        });

        it('Check deleting Apartment tag is functional', function() {
            projApartmentTag.deleteAddedTag();
            projApartmentTag.isApaTagDeleted().then(function(deleteTxt) {
                expect(deleteTxt.toLowerCase().trim() == projApaTagData.newApaTagName).toBe(false);
            });
        });

        it('Check deleting Apartment tag in modal', function() {
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.addTwotags(projApaTagData.newApaTagName, projApaTagData.apaTagSearchTxt);
            addApartmentTag.validateTagRemove().then(function(noB4) {
                addApartmentTag.removeTag();
                addApartmentTag.validateTagRemove().then(function(noAfr) {
                    expect(parseInt(noAfr)).toBe(parseInt(noB4 - 1));
                    addApartmentTag.closeModule();
                });
            });
        });

        it('Test for mandatory field validation', function() {
            browser.driver.sleep(1500);
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.validateMandatory().then(function(validated) {
                expect(validated).toBe(true);
                addApartmentTag.closeModule();
            });
            browser.driver.sleep(1500);
        });

    });

    afterAll(function() {
        homePage.logOut();
    });

});