describe('10.0 Building Detail page tests', function () {
    
    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, buildingDetailPage;
    
    //Data files  
    var loginData = require('../../../testData/loginData.json');
    var buildingDocumentData = require('../../../testData/PlantPageData/BuildingTabData/buildingDocumentData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToplantDetailPage();
        buildingTab = constructionPage.goToBuilding();
        buildingDetailPage = buildingTab.goToBuildingByAddress(buildingDocumentData.buildingName);

    });

    afterAll(function () {
        homePage.logOut();
    });

    it('Building detail page title validation', function () {
        buildingDetailPage.getTitleHeader().then(function (title) {
            console.log(title);
            expect(title).toBe(buildingDocumentData.buildingName);
        });
    });

    it('Menu button test', function () {
        buildingDetailPage.clickmenuButton();
        browser.driver.sleep(1000);
        buildingDetailPage.isMenuDisplayed().then(function (isHidden) {
            expect(isHidden).toBe(false);
            buildingDetailPage.clickmenuButton();
            buildingDetailPage.isMenuDisplayed().then(function (isVisible) {
                expect(isVisible).toBe(true);
            });
        });
    });

    it('Document and Project tab visibility test', function () {
        buildingDetailPage.isDocumentTabVisible().then(function (docDisplayed) {
            expect(docDisplayed).toBe(true);
            buildingDetailPage.isProjectTabVisible().then(function (projDisplayed) {
                expect(projDisplayed).toBe(true);
            });
        });
    });

});