/// <reference path="../../typings/tsd.d.ts" />

describe('25.0 Company adding tests for a project', function() {
    
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
        projDetailPage = projectPage.goTOProject(projAddData.proj3No);
        projCompanyTab = projDetailPage.goToCompanyTab();
    });

    afterAll(function() {
        homePage.logOut();
    });

        it('check suggestion company list is visible', function() {
            addNewCompany = projCompanyTab.getNewCompanyModal();
            addNewCompany.searchCompanyName('test');
            addNewCompany.isSuggestionsVisible().then(function(isVisible) {
                expect(isVisible).toBe(true);
            });
        });

        it('check if the suggestions are correct', function() {
            addNewCompany.isSearchCorrect('test').then(function(isCorrect) {
                expect(isCorrect).toBe(true);
            });
        });

        it('adding company by name to the table test', function() {
            addNewCompany.selectCompanyFromDD('test123]');
            addNewCompany.allAddedCompanyNames().then(function(addedCompanies) {
                expect(addedCompanies.toString().toLowerCase()).toContain('test123]');
            });
        });

        it('removing company from the table test', function() {
            addNewCompany.removeTableRow(1);
            addNewCompany.allAddedCompanyNames().then(function(addedCompanies) {
                var isDeleted = addedCompanies.toString().toLowerCase().indexOf('test123]') > -1;
                expect(isDeleted).toBe(false);
            });
        });

        it('email validation for the selected company', function() {
            addNewCompany.selectCompanyFromDD('test123]');
            addNewCompany.addCompanyToProject();
            addNewCompany.isEmailEmpty().then(function(isEmpty) {
                expect(isEmpty).toBe(true);
            });
            addNewCompany.enterEmail(1, projAddData.valName);
            addNewCompany.addCompanyToProject();
            addNewCompany.isInvaildEmailErrorDisplayed().then(function(isDisplayed) {
                expect(isDisplayed).toBe(true);
            });
        });

        it('adding a company to a "Not Sarted" project test', function() {
            addNewCompany.enterEmail(1, projAddData.proj2Email);
            addNewCompany.addCompanyToProject();
            projCompanyTab.isCompanyAdded('test123]').then(function(isAdded) {
                expect(isAdded).toBe('1');
            });
        });

        it('deleting added company from a "Not Started" project test', function() {
            projCompanyTab.deleteCompany('test123]');
            projCompanyTab.isCompanyDeleted('test123]').then(function(isDeleted) {
                expect(isDeleted).toBe(true);
            });
        });

        it('adding a company to a "In Progress" project test', function() {
            projectPage = projCompanyTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projCompanyTab = projDetailPage.goToCompanyTab();
            addNewCompany = projCompanyTab.getNewCompanyModal();
            addNewCompany.selectCompanyFromDD('test123]');
            addNewCompany.enterEmail(1, projAddData.proj2Email);
            addNewCompany.addCompanyToProject();
            projCompanyTab.isCompanyAdded('test123]').then(function(isAdded) {
                expect(isAdded).toBe('1');
            });
        });

        it('adding a company to a "Closed" project test', function() {
            projectPage = projCompanyTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projCompanyTab = projDetailPage.goToCompanyTab();
            projCompanyTab.isPlusBtnVisible().then(function(canAdded) {
                expect(canAdded.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
            });
        });

        describe('Testing the project from the added company side', function() {

            beforeAll(function() {
                projectPage = projCompanyTab.goToProjectPage();
                projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
                welcomePage = homePage.logOut();
                loginPage = welcomePage.signinAsHayndverk();
                homePage = loginPage.successLogin(loginData.username2, loginData.correctPw);
                projectPage = homePage.goToProjectPage();
            });

            it('check if the project is visible from the added company side', function() {
                projectPage.isProjectAdded2(projAddData.proj3No).then(function(isVis) {
                    expect(isVis).toBe('1');
                });
            });

            it('adding room to project from the added company test', function() {
                projDetailPage = projectPage.goTOProject(projAddData.proj3No);
                projRoomTab = projDetailPage.goToRoomTab();
                addNewRoom = projRoomTab.getAddNewRoomForm();
                addNewRoom.addRoomWithMandotory(projAddData.companyRoomName, projAddData.companyRoomType);
                projRoomTab.isNewRoomAdded(projAddData.companyRoomName).then(function(addedRoom) {
                    expect(addedRoom.trim()).toBe(projAddData.companyRoomName);
                });
            });

            it('adding device to project from the added company test', function() {
                projDeviceTab = projDetailPage.goToDeviceTab();
                addNewDevice = projDeviceTab.getAddNewDeviceForm();
                addNewDevice.addDeviceWithMandotory(projAddData.companyDeviceName, projAddData.deviceType);
                projDeviceTab.isNewDeviceAdded(projAddData.companyDeviceName).then(function(addedDevice) {
                    console.log(addedDevice);
                    expect(addedDevice.trim()).toBe(projAddData.companyDeviceName);
                });
            });

            it("adding Document1 to project from the added company test", function() {
                var filePath = path.resolve(__dirname, projAddData.docPath1);
                projDocumentTab = projDetailPage.goToDocumentTab();
                addDocModal = projDocumentTab.getAddDocModal();
                addDocModal.uploadWithMandatory(filePath, projAddData.companyDocName1, projAddData.doc1Type, projAddData.doc1Tag);
                projDocumentTab.isDocumentUploaded(projAddData.companyDocName1).then(function(no) {
                    expect(no).toBe('1');
                });
            });

            it("adding Document2 to project from the added company test", function() {
                var filePath = path.resolve(__dirname, projAddData.docPath2);
                projDocumentTab = projDetailPage.goToDocumentTab();
                addDocModal = projDocumentTab.getAddDocModal();
                addDocModal.uploadWithMandatory(filePath, projAddData.companyDocName2, projAddData.doc2Type, projAddData.doc2Tag);
                projDocumentTab.isDocumentUploaded(projAddData.companyDocName2).then(function(no) {
                    expect(no).toBe('1');
                });
            });

            it('deleting document added from the assigned company test', function() {
                projDocumentTab.searchDocTable(projAddData.companyDocName2);
                projDocumentTab.deleteAllCocuments();
                projDocumentTab.isDocumentDeleted(projAddData.companyDocName2).then(function(isDeleted) {
                    expect(isDeleted).toBe(true);
                });
            });
            
            it('check if the companies can be added from the added company', function(){
                projCompanyTab = projDetailPage.goToCompanyTab();
                projCompanyTab.isPlusBtnVisible().then(function(canAdded) {
                    expect(canAdded.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
                });
            });
            
            it('check if the apartment tags can be added from the added company', function(){
                projApartmentTag = projDetailPage.goToApartmentTag();
                projApartmentTag.isApaTagAddingEnabled().then(function(canAdded) {
                    expect(canAdded.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
                });
            });

            describe('verify al the added items from the original owner of the project', function() {

                beforeAll(function() {
                    welcomePage = homePage.logOut();
                    loginPage = welcomePage.signinAsHayndverk();
                    homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
                    projectPage = homePage.goToProjectPage();
                    projDetailPage = projectPage.goTOProject(projAddData.proj3No);
                });

                it('check if the added room is visible for original owner of the project', function() {
                    projRoomTab = projDetailPage.goToRoomTab();
                    projRoomTab.isNewRoomAdded(projAddData.companyRoomName).then(function(addedRoom) {
                        expect(addedRoom.trim()).toBe(projAddData.companyRoomName);
                    });
                });

                it('check if the added device is visible for original owner of the project', function() {
                    projDeviceTab = projDetailPage.goToDeviceTab();
                    projDeviceTab.isNewDeviceAdded(projAddData.companyDeviceName).then(function(addedDevice) {
                        expect(addedDevice.trim()).toBe(projAddData.companyDeviceName);
                    });
                });

                it("adding Document2 to project from the added company test", function() {
                    projDocumentTab = projDetailPage.goToDocumentTab();
                    projDocumentTab.isDocumentUploaded(projAddData.companyDocName1).then(function(no) {
                        expect(no).toBe('1');
                    });
                });

                it("check if the documents added from other companies can be deleted from original user test", function() {
                    projDocumentTab.canDocDelete(projAddData.companyDocName1).then(function(clas) {
                        expect(clas).toContain('disabled');
                    });
                });

                afterAll(function() {
                    welcomePage = homePage.logOut();
                    loginPage = welcomePage.signinAsHayndverk();
                    homePage = loginPage.successLogin(loginData.username2, loginData.correctPw);
                    projectPage = homePage.goToProjectPage();
                    projDetailPage = projectPage.goTOProject(projAddData.proj3No);
                    projDocumentTab = projDetailPage.goToDocumentTab();
                    projDocumentTab.searchDocTable(projAddData.companyDocName1);
                    projDocumentTab.deleteAllCocuments();
                    welcomePage = homePage.logOut();
                    loginPage = welcomePage.signinAsHayndverk();
                    homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
                    projectPage = homePage.goToProjectPage();
                    projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus1);
                    projectPage.deleteProject(projAddData.proj3No);
                });

            });

        });

    });