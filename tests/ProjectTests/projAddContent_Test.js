/// <reference path="../../typings/tsd.d.ts" />

describe('23.0 Project add/edit/delete Room, Device, Appartment tag, Company and Document tests', function() {

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
    });

    afterAll(function() {
        homePage.logOut();
    });

    it('Add project with mandotory fields only', function() {
        newProjectModal = projectPage.addNewProject();
        newProjectModal.addProjectWithMandotory(projAddData.proj3Name, projAddData.proj3Contact, projAddData.proj3Email);
        projectPage.isProjectAdded().then(function(innerTxt) {
            expect(innerTxt).toContain(projAddData.proj3Name);
        });
        projectPage.getAddedProjNo().then(function(projNo) {
            projAddData.proj3No = projNo;
            fs.writeFileSync(dataFile, JSON.stringify(projAddData))
        });
    });

    describe('Project room adding tests', function() {

        beforeAll(function() {
            projectPage.beforeEach();
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projRoomTab = projDetailPage.goToRoomTab();
        });

        it('Adding new room with mandotory fields', function() {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.addRoomWithMandotory(projAddData.roomName1, projAddData.roomType1);
            projRoomTab.isNewRoomAdded(projAddData.roomName1).then(function(addedRoom) {
                expect(addedRoom.trim()).toBe(projAddData.roomName1);
            });
        });

        it('Adding new room with all the fields', function() {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.addRoomWithoptional(projAddData.roomType2, projAddData.roomName2, projAddData.roomDesc);
            projRoomTab.isNewRoomAdded(projAddData.roomName2).then(function(addedRoom) {
                expect(addedRoom.trim()).toBe(projAddData.roomName2);
            });
        });

        it('Test for mandatory field validation', function() {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.validateRoomName().then(function(isValidated) {
                expect(isValidated).toBe(true);
                addNewRoom.validateRoomType(projAddData.valName).then(function(typevalid) {
                    expect(typevalid).toBe(true);
                    addNewRoom.closeForm();
                });
            });
            browser.driver.sleep(1500);
        });

        it('Adding new room to a project in "In Progress" status', function() {
            projectPage = projRoomTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projRoomTab = projDetailPage.goToRoomTab();
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.addRoomWithMandotory(projAddData.roomName3, projAddData.roomType3);
            projRoomTab.isNewRoomAdded(projAddData.roomName3).then(function(addedRoom) {
                expect(addedRoom.trim()).toBe(projAddData.roomName3);
            });
        });

        it("Check if rooms can be added for 'Closed' project", function() {
            projectPage = projRoomTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projRoomTab = projDetailPage.goToRoomTab();
            projRoomTab.isFileAddingEnabled().then(function(canAdd) {
                expect(canAdd.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
            });
            projRoomTab.goToProjectPage();
        });

    });

    describe('Project device adding tests', function() {

        beforeAll(function() {
            projectPage.beforeEach();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus1);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDeviceTab = projDetailPage.goToDeviceTab();
        });

        it('Adding new device with mandotory fields', function() {
            addNewDevice = projDeviceTab.getAddNewDeviceForm();
            addNewDevice.addDeviceWithMandotory(projAddData.deviceName1, projAddData.deviceType);
            projDeviceTab.isNewDeviceAdded(projAddData.deviceName1).then(function(addedDevice) {
                console.log(addedDevice);
                expect(addedDevice.trim()).toBe(projAddData.deviceName1);
            });
        });

        it('Adding new device with all the fields', function() {
            projDeviceTab.getNumberOfRows().then(function(noBfore) {
                var rowNo = parseInt(noBfore);
                var filePath = path.resolve(__dirname, projAddData.manualPath);
                addNewDevice = projDeviceTab.getAddNewDeviceForm();
                addNewDevice.addDeviceWithOptional(projAddData.deviceName2, projAddData.deviceDesc, projAddData.deviceType, projAddData.manufacture, projAddData.codeType, projAddData.productCode, projAddData.gtinNumber, projAddData.lifeExpectancy, projAddData.warrantyDuration, projAddData.buildingElementId, projAddData.installationYear, projAddData.roomName1, filePath);
                projDeviceTab.getNumberOfRows().then(function(noAfter) {
                    expect(parseInt(noAfter)).toBe(rowNo + 1);
                });
            });
        });

        it('Test for mandatory field validation', function() {
            addNewDevice = projDeviceTab.getAddNewDeviceForm();
            addNewDevice.validateDeviceName().then(function(isValidated) {
                expect(isValidated).toBe(true);
                addNewDevice.validateDeviceType(projAddData.valName).then(function(typevalid) {
                    expect(typevalid).toBe(true);
                    addNewDevice.closeForm();
                });
            });
            browser.driver.sleep(1500);
        });

        it('Adding new device to a project in "In Progress" status', function() {
            projectPage = projDeviceTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDeviceTab = projDetailPage.goToDeviceTab();
            projDeviceTab.getNumberOfRows().then(function(noBfore) {
                var rowNo = parseInt(noBfore);
                addNewDevice = projDeviceTab.getAddNewDeviceForm();
                addNewDevice.addDeviceWithMandotory(projAddData.deviceName3, projAddData.deviceType);
                projDeviceTab.getNumberOfRows().then(function(noAfter) {
                    expect(parseInt(noAfter)).toBe(rowNo + 1);
                });
            });
        });

        it("Check if devices can be added for 'Closed' project", function() {
            projectPage = projDeviceTab.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projDeviceTab = projDetailPage.goToDeviceTab();
            projDeviceTab.isFileAddingEnabled().then(function(canAdd) {
                expect(canAdd.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
            });
            projDeviceTab.goToProjectPage();
        });

    });

    describe('Project apartment tag adding tests', function() {

        beforeAll(function() {
            projectPage.beforeEach();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus1);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projApartmentTag = projDetailPage.goToApartmentTag();
        });

        it('Check adding new Apartment tag is functional in "Not Started" status', function() {
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.addNewTag(projAddData.newApaTagName1);
            projApartmentTag.isNewTagAdded(projAddData.newApaTagName1).then(function(isAdded) {
                expect(isAdded).toContain(projAddData.newApaTagName1);
            });
        });

        it('Check deleting Apartment tag in modal', function() {
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.addTwotags(projAddData.newApaTagName1, projAddData.valName);
            addApartmentTag.validateTagRemove().then(function(noB4) {
                addApartmentTag.removeTag();
                addApartmentTag.validateTagRemove().then(function(noAfr) {
                    expect(parseInt(noAfr)).toBe(parseInt(noB4 - 1));
                });
            });
            browser.driver.sleep(1000);
            addApartmentTag.closeModule();
        });

        it('Check adding new Apartment tag is functional in "In Progress" status', function() {
            projectPage = projApartmentTag.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus2);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projApartmentTag = projDetailPage.goToApartmentTag();
            addApartmentTag = projApartmentTag.getAddNewTagModal();
            addApartmentTag.addNewTag(projAddData.newApaTagName2);
            projApartmentTag.isNewTagAdded(projAddData.newApaTagName2).then(function(isAdded) {
                expect(isAdded).toContain(projAddData.newApaTagName2);
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

        it("Check if Apartment tag can be added for 'Closed' project", function() {
            projectPage = projApartmentTag.goToProjectPage();
            projectPage.changeProjStatus(projAddData.proj3No, projAddData.projStatus3);
            projDetailPage = projectPage.goTOProject(projAddData.proj3No);
            projApartmentTag = projDetailPage.goToApartmentTag();
            projApartmentTag.isApaTagAddingEnabled().then(function(canAdd) {
                expect(canAdd.toString().toLowerCase().indexOf(projAddData.plusButton)).toBe(-1);
            });
            projApartmentTag.goToProjectPage();
        });

    });
})