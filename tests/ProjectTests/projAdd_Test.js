/// <reference path="../../typings/tsd.d.ts" />

describe('21.0 Project add/edit/delete tests', function() {

    var fs = require('fs');
    var path = require('path');

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, newProjectModal, projDetailPage, projDocumentTab, addDocModal;

    //Data files  
    var dataFile = './testData/ProjectPageData/projAddData.json';
    var loginData = require('../../testData/loginData.json');
    var projAddData = require('../../testData/ProjectPageData/projAddData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
    });

    afterAll(function() {
        homePage.logOut();
    });

    it('Add project with mandotory fields only', function() {
        newProjectModal = projectPage.addNewProject();
        newProjectModal.addProjectWithMandotory(projAddData.proj1Name, projAddData.proj1Contact, projAddData.proj1Email);
        projectPage.isProjectAdded().then(function(innerTxt) {
            expect(innerTxt).toContain(projAddData.proj1Name);
        });
        projectPage.getAddedProjNo().then(function(projNo) {
            projAddData.proj1No = projNo;
            fs.writeFileSync(dataFile, JSON.stringify(projAddData))
        });
    });

    it('Add project with all fields', function() {
        newProjectModal = projectPage.addNewProject();
        newProjectModal.addProjectWithOptional(projAddData.proj2Name, projAddData.proj2Desc, projAddData.proj2Contact, projAddData.proj2ContNo, projAddData.proj2Email);
        projectPage.isProjectAdded().then(function(innerTxt) {
            expect(innerTxt).toContain(projAddData.proj2Name);
        });
        projectPage.getAddedProjNo().then(function(projNo) {
            projAddData.proj2No = projNo;
            fs.writeFileSync(dataFile, JSON.stringify(projAddData))
        });
    });

    it('Test for mandatory field validation', function() {
        newProjectModal = projectPage.addNewProject();
        newProjectModal.validateProjectName().then(function(isValidated) {
            expect(isValidated).toBe(true);
            newProjectModal.validateContact(projAddData.projValName).then(function(typevalid) {
                expect(typevalid).toBe(true);
                newProjectModal.validateEmail(projAddData.projValContact).then(function(emailVal) {
                    expect(emailVal).toBe(true);
                    newProjectModal.closeForm();
                })
            });
        });
        browser.driver.sleep(1500);
    });

    describe('Project status changing test', function() {

        it("Check if the project is in 'Not Started' status", function() {
            projectPage.isProjInCorrectStatus(projAddData.activeDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it("Change project status 'Not Started' --> 'In Progress'", function() {
            projectPage.changeProjStatus(projAddData.proj1No, projAddData.projStatus2);
            projectPage.isProjInCorrectStatus(projAddData.inactiveDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it("Change project status 'In Progress' --> 'Closed'", function() {
            projectPage.changeProjStatus(projAddData.proj1No, projAddData.projStatus3);
            projectPage.isProjInCorrectStatus(projAddData.inactiveDelete, projAddData.inactiveEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it("Change project status 'Closed' --> 'In Progress'", function() {
            projectPage.changeProjStatus(projAddData.proj1No, projAddData.projStatus2);
            projectPage.isProjInCorrectStatus(projAddData.inactiveDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it("Change project status 'In Progress' --> 'Not Started'", function() {
            projectPage.changeProjStatus(projAddData.proj1No, projAddData.projStatus1);
            projectPage.isProjInCorrectStatus(projAddData.activeDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it('Check deletion of Not started project with no documents', function() {
            projectPage.deleteProject(projAddData.proj1No);
            projectPage.isProjDeleted(projAddData.proj1No).then(function(isDeleted) {
                expect(isDeleted).toBe(true);
            });
        });

    });

    describe('Project document upload tests', function() {

        it("Document upload test for 'Not Started' project", function() {
            var filePath = path.resolve(__dirname, projAddData.docPath1);
            projDetailPage = projectPage.goTOProject(projAddData.proj2No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            addDocModal = projDocumentTab.getAddDocModal();
            addDocModal.uploadWithMandatory(filePath, projAddData.doc1Name, projAddData.doc1Type, projAddData.doc1Tag);
            projDocumentTab.isDocumentUploaded(projAddData.doc1Name).then(function(no) {
                expect(no).toBe('1');
            });
        });

        it("Check if the project can be deleted after uploading a document", function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.searchTable(projAddData.proj2No);
            projectPage.isProjInCorrectStatus(projAddData.inactiveDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
        });

        it("Document upload test for 'In Progress' project", function() {
            var filePath = path.resolve(__dirname, projAddData.docPath2);
            projectPage.changeProjStatus(projAddData.proj2No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj2No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.deleteAllCocuments();
            addDocModal = projDocumentTab.getAddDocModal();
            addDocModal.uploadWithMandatory(filePath, projAddData.doc2Name, projAddData.doc2Type, projAddData.doc2Tag);
            projDocumentTab.isDocumentUploaded(projAddData.doc2Name).then(function(no) {
                expect(no).toBe('1');
            });
        });

        it("Check if the project can be deleted after uploading a document", function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.searchTable(projAddData.proj2No);
            projectPage.isProjInCorrectStatus(projAddData.inactiveDelete, projAddData.activeEdit).then(function(InProgress) {
                expect(InProgress).toBe(true);
            });
            projDetailPage = projectPage.goTOProject(projAddData.proj2No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.deleteAllCocuments();
        });

        it("Check if files can be uploaded for 'Closed' project", function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj2No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj2No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.isFileUploadAvailable().then(function(isAvailable) {
                expect(isAvailable).toContain(projAddData.plusButton);
            });
        });

        it("Delete project in 'Not Started' status without documents test", function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj2No, projAddData.projStatus2);
            projectPage.changeProjStatus(projAddData.proj2No, projAddData.projStatus1);
            projectPage.deleteProject(projAddData.proj2No);
            projectPage.isProjDeleted(projAddData.proj2No).then(function(isDeleted) {
                expect(isDeleted).toBe(true);
            });
        });

    });



});
