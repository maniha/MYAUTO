/// <reference path="../../typings/tsd.d.ts" />

describe('22.0 connecting tempory projects to the plants tests', function() {

    var fs = require('fs');
    var path = require('path');

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, newProjectModal, projDetailPage, proProjectTab, constructionPage, plantPage, propetyDetailPage, connectProjModal;

    //Data files  
    var dataFile = './testData/ProjectPageData/projAddData.json';
    var loginData = require('../../testData/loginData.json');
    var projAddData = require('../../testData/ProjectPageData/projAddData.json');
    var plantData = require('../../testData/PlantPageData/PropertyTabData/propertyData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        newProjectModal = projectPage.addNewProject();
        newProjectModal.addProjectWithMandotory(projAddData.proj4Name, projAddData.proj4Contact, projAddData.proj4Email);
        projectPage.getAddedProjNo().then(function(projNo) {
            projAddData.proj4No = projNo;
            fs.writeFileSync(dataFile, JSON.stringify(projAddData))
        });
        constructionPage = homePage.goToplantDetailPage();
        plantPage = constructionPage.goToProperty()
        propetyDetailPage = plantPage.clickBoligRowByAddress(plantData.plantName);
        proProjectTab = propetyDetailPage.goToProject();
    });

    afterAll(function() {
        homePage.logOut();
    });

    it('check if the added project is listed in the modal', function() {
        connectProjModal = proProjectTab.getConnectProjModal();
        connectProjModal.checkIfProjectIsAvailable(projAddData.proj4No).then(function(rowNo) {
            expect(rowNo).toBe(1);
        });
    });

    it('check if the connected project is visible in the plant', function() {
        proProjectTab = connectProjModal.connectProject(projAddData.proj4No);
        proProjectTab.checkIfProjAdded(projAddData.proj4No).then(function(rowNo) {
            expect(rowNo).toBe(1);
        });
    });

    it('check if the connected project can be deleted', function() {
        projectPage = homePage.goToProjectPage();
        projectPage.deleteProject(projAddData.proj4No);
        projectPage.isProjDeleted(projAddData.proj4No).then(function(isDeleted) {
            expect(isDeleted).toBe(true);
        });
    });

});