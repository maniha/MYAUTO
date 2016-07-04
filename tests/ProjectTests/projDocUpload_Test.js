/// <reference path="../../typings/tsd.d.ts" />

describe('24.0 File upload tests for created project', function() {

    var fs = require('fs');
    var path = require('path');

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, newProjectModal, projRoomTab, projDetailPage, projDocumentTab, addDocModal, addNewRoom, addNewDevice, projDeviceTab, addApartmentTag, projApartmentTag, projCompanyTab, addNewCompany;

    //Data files
    var dataFile = './testData/ProjectPageData/projAddData.json';
    var loginData = require('../../testData/loginData.json');
    var projAddData = require('../../testData/ProjectPageData/projAddData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
        projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus1);
        projDetailPage = projectPage.goTOProject(projAddData.proj3No);
        projDocumentTab = projDetailPage.goToDocumentTab();
    });

    afterAll(function() {
        homePage.logOut();
    });

    it('check if the number of rooms in file upload is correct', function() {
        var filePath = path.resolve(__dirname, projAddData.docPath1);
        addDocModal = projDocumentTab.getAddDocModal();
        addDocModal.uploadFile(filePath);
        addDocModal.validateNoOfRooms().then(function(roomNo) {
            expect(roomNo).toBe(parseInt(projAddData.noOfRooms));
        });
        addDocModal.vailateRoomNames().then(function(roomNames) {
            expect(roomNames.toString().toLowerCase()).toContain(projAddData.roomName1.toLowerCase());
            expect(roomNames.toString().toLowerCase()).toContain(projAddData.roomName2.toLowerCase());
            expect(roomNames.toString().toLowerCase()).toContain(projAddData.roomName3.toLowerCase());
        });
    });

    it('check if the number of apartment tags in file upload is correct', function() {
        addDocModal.validateNoOfApaTags().then(function(apaTagNo) {
            expect(apaTagNo).toBe(parseInt(projAddData.noOfApaTags));
        });
        addDocModal.vailateApaTagNames().then(function(apaTagNames) {
            expect(apaTagNames.toString().toLowerCase()).toContain(projAddData.newApaTagName1.toLowerCase());
            expect(apaTagNames.toString().toLowerCase()).toContain(projAddData.newApaTagName2.toLowerCase());
        });
        addDocModal.closeModal();
        browser.driver.sleep(2000);
    });

    it('Single file upload with mandotory fields in "Not Started" project', function() {
        var filePath = path.resolve(__dirname, projAddData.docPath1);
        addDocModal = projDocumentTab.getAddDocModal();
        addDocModal.uploadWithMandatory(filePath, projAddData.doc1Name, projAddData.doc1Type, projAddData.doc1Tag);
        projDocumentTab.isDocumentUploaded(projAddData.doc1Name).then(function(no) {
            expect(no).toBe('1');
        });
    });

    it('Single file upload with mandotory fields and Optional fields in "Not Started" project', function() {
        var filePath = path.resolve(__dirname, projAddData.docPath4);
        addDocModal = projDocumentTab.getAddDocModal();
        addDocModal.uploadWithOptional(filePath, projAddData.docOrderNo, projAddData.doc4Name, projAddData.docIndustry, projAddData.doc2Type, projAddData.docDesc, projAddData.deviceName1, projAddData.roomName1, projAddData.doc2Tag, projAddData.newApaTagName1);
        projDocumentTab.isDocumentUploaded(projAddData.doc4Name).then(function(no) {
            expect(no).toBe('1');
        });
    });

    it('Test for mandatory field validation', function() {
        var filePath = path.resolve(__dirname, projAddData.docPath1);
        addDocModal = projDocumentTab.getAddDocModal();
        addDocModal.validateDocPath().then(function(isVal1) {
            expect(isVal1).toBe('true');
        });
        addDocModal.uploadFile(filePath);
        addDocModal.validateFileName().then(function(isVal2) {
            expect(isVal2).toBe(true);
        });
        addDocModal.validateFileType(projAddData.doc1Name).then(function(isVal3) {
            expect(isVal3).toBe(true);
        });
        addDocModal.validateChapTag(projAddData.doc1Type).then(function(isVal4) {
            expect(isVal4).toBe(true);
        });
        projDocumentTab = addDocModal.closeModal();
        browser.driver.sleep(2000);
        projDocumentTab.goToProjectPage();
    });


    describe('Multiple file upload in "In Progress" project', function() {

        beforeAll(function() {
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.deleteAllCocuments();
        });

        it('check if the all files are selected', function() {
            var fileMul1 = path.resolve(__dirname, projAddData.docPath1);
            var fileMul2 = path.resolve(__dirname, projAddData.docPath2);
            var fileMul3 = path.resolve(__dirname, projAddData.docPath3);
            var fileMul4 = path.resolve(__dirname, projAddData.docPath4);
            var fileMul = fileMul1 + "\n" + fileMul2 + "\n" + fileMul3 + "\n" + fileMul4;
            addDocModal = projDocumentTab.getAddDocModal();
            addDocModal.selectFiles(fileMul);
            addDocModal.isSelectedDocNoCorrect().then(function(noOfDocs) {
                expect(noOfDocs).toContain('4');
            });
        });

        it('document detail modal pagination', function() {
            addDocModal.clickUpload();
            addDocModal.goToLastPage();
            addDocModal.isInCorrectPage().then(function(pageNo1) {
                expect(pageNo1).toBe(projAddData.mulUploadLastPage);
            });
            addDocModal.goToFirstPage();
            addDocModal.isInCorrectPage().then(function(pageNo2) {
                expect(pageNo2).toBe(projAddData.mulUploadFirstPage);
            });
            addDocModal.goToNextPage();
            addDocModal.isInCorrectPage().then(function(pageNo3) {
                expect(pageNo3).toBe(projAddData.mulUploadNextPage);
            });
            addDocModal.goToPreviousPage();
            addDocModal.isInCorrectPage().then(function(pageNo4) {
                expect(pageNo4).toBe(projAddData.mulUploadFirstPage);
            });
        });

        it('document removal test from modal', function() {
            addDocModal.removeFile();
            addDocModal.isInCorrectPage().then(function(pageNo) {
                expect(pageNo).toBe(projAddData.mulUploadAfterRemoval);
            });
        });

        it('validate use for all checkboxes tests', function() {
            addDocModal.enterMandorotyForMulFiles(projAddData.doc4Name, projAddData.doc4Type, projAddData.doc4Tag);
            addDocModal.isMandotoryAddedForEach(projAddData.doc3Name).then(function(arr) {
                expect(arr[0]).toBe('4');
                expect(arr[1]).toBe('1 kapitler');
            });
            addDocModal.isMandotoryAddedForEach(projAddData.doc2Name).then(function(arr) {
                expect(arr[0]).toBe('4');
                expect(arr[1]).toBe('1 kapitler');
            });
        });

        it('multiple files upload test, check if all the files are uploaded', function() {
            addDocModal.clickFileUploadBtn();
            projDocumentTab.numberOfDocs().then(function(noOfDocs) {
                expect(noOfDocs).toBe('3');
            });
        });

    });

    describe('File delete tests in a created projeect', function() {

        it('check if the files can be deleted in a "closed" project', function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.isFileUploadAvailable().then(function(canAdd) {
                expect(canAdd.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
            });
        });

        it('check if single file can be deleted in a "In Progress" project', function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.searchDocTable(projAddData.doc4Name);
            projDocumentTab.deleteAllCocuments();
            projDocumentTab.searchDocTable(projAddData.doc4Name);
            projDocumentTab.isDocumentDeleted().then(function(isDeleted) {
                expect(isDeleted).toBe(true);
            });
        });

        it('check if all files can be deleted in a "Not Started" project', function() {
            projectPage = projDocumentTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus1);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDocumentTab = projDetailPage.goToDocumentTab();
            projDocumentTab.deleteAllCocuments();
            projDocumentTab.isDocumentDeleted().then(function(isDeleted) {
                expect(isDeleted).toBe(true);
            });
        });

    });
});