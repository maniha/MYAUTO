describe('3.0 PlantDetailPage_tests', function () {
    
    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, palntDetailPage;
    
    //Data files  
    var loginData = require('../../testData/loginData.json');
    var plantData = require('../../testData/PlantPageData/plantData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        plantDetailPage = homePage.goToplantDetailPage();
    });

    it('Plant page loaded', function () {
        plantDetailPage.isInplantDetailPage().getText().then(function (headerTxt) {
            expect(headerTxt.trim()).toBe(plantData.headerTxt);
        });
    });

    it('Menu button test', function () {
        plantDetailPage.isMenuDisplayed().then(function (displayed1) {
            expect(displayed1).toBe(true);
            plantDetailPage.clickMenuButton();
            plantDetailPage.isMenuDisplayed().then(function (displayed2) {
                expect(displayed2).toBe(false);
                plantDetailPage.clickMenuButton();
                plantDetailPage.isMenuDisplayed().then(function (displayed3) {
                    expect(displayed3).toBe(true);
                });
            });
        });
    });

    it('Bolig and Bygning tab visible', function () {
        plantDetailPage.isboligTabVisible().then(function (isVisible) {
            expect(isVisible).toBe(true);
        });
        plantDetailPage.isBygningTabVisible().then(function (isVisible) {
            expect(isVisible).toBe(true);
        });
    });

 afterAll(function () {
        homePage.logOut();
    });

});