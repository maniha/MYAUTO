describe('14.0 Project Detail page tests', function () {
    
    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage;
    
    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projDetailData = require('../../testData/ProjectPageData/projectDetailData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projDetailData.projectNoForDocument);
    });

    describe('Project detail page element tests', function () {

        it('Check if the user is in project detail page', function () {
            projDetailPage.isInProjDetailpage().then(function (inProjDetailPage) {
                expect(inProjDetailPage).toBe(true);
            });
        });

        it('Menu button test on project Detail page', function () {
            projDetailPage.clickMenuButton();
            projDetailPage.isMenuDisplayed().then(function (notDisplayed) {
                expect(notDisplayed).toBe(false);
                projDetailPage.clickMenuButton();
                projDetailPage.isMenuDisplayed().then(function (displayed) {
                    expect(displayed).toBe(true);
                });
            });
        });

    });
    
    afterAll(function () {
        homePage.logOut();
    });

});