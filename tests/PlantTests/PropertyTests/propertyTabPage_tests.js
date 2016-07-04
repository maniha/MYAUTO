describe('9.0 Plant page tests', function () {
    
    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, propetyDetailPage, plantPage, docTab, roomTab;
    
    //Data files   
    var loginData = require('../../../testData/loginData.json');
    var plantData = require('../../../testData/PlantPageData/PropertyTabData/propertyData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToplantDetailPage();
        plantPage = constructionPage.goToProperty()
        propetyDetailPage = plantPage.clickBoligRowByAddress(plantData.plantName);
    });

    beforeEach(function () {
        browser.executeScript('window.scrollTo(0,0);')
    });

    describe('Plant page load', function () {
        it('Check if the plant name correct', function () {
            propetyDetailPage.isUserInplantPage(plantData.plantName).then(function (isInPlant) {
                expect(isInPlant).toBe(true);
            });
        });
    });

    describe('Menu button test on plant page', function () {
        it('Menu button test', function () {
            propetyDetailPage.clickMenuButton();
            propetyDetailPage.isMenuDisplayed().then(function (displayed2) {
                expect(displayed2).toBe(false);
                propetyDetailPage.clickMenuButton();
                propetyDetailPage.isMenuDisplayed().then(function (displayed3) {
                    expect(displayed3).toBe(true);
                });
            });
        });
    });

    afterAll(function () {
        homePage.logOut();
    });

});