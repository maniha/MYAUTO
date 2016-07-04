describe('16.0 Project Room grid tests', function () {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, projectPage, projDetailPage, projRoomTab, addNewRoom;
    
    //Data files  
    var loginData = require('../../testData/loginData.json');
    var projRoomData = require('../../testData/ProjectPageData/projRoomData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        projectPage = homePage.goToProjectPage();
        projDetailPage = projectPage.goTOProject(projRoomData.projectNoForDocument);
        projRoomTab = projDetailPage.goToRoomTab();
    });

    it('All the colums are visible', function () {
        projRoomTab.isRoomColumsDisplayed().then(function (visible) {
            expect(visible).toBe(true);
        });
    });

    it('Number of Room table rows are correct', function () {
        projRoomTab.isRoomsRowNumberCorrect().then(function (isCorrect) {
            expect(isCorrect).toBe(true);
        })
    });

    describe('Room table sorting tests', function () {

        beforeAll(function () {
            projRoomTab.beforeEachRoomTest();
        });

        it('Check Room table is sorted by Name', function () {
            projRoomTab.sortByRoomName_A2Z();
            projRoomTab.isSortedByRoomName_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projRoomTab.sortByRoomName_A2Z();
            projRoomTab.isSortedByRoomName_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Room table is sorted by Type', function () {
            projRoomTab.sortByRoomType_A2Z();
            projRoomTab.isSortedByRoomType_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projRoomTab.sortByRoomType_A2Z();
            projRoomTab.isSortedByRoomType_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

        it('Check Room table is sorted by Description', function () {
            projRoomTab.sortByRoomDesc_A2Z();
            projRoomTab.isSortedByRoomDesc_A2Z().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
            projRoomTab.sortByRoomDesc_A2Z();
            projRoomTab.isSortedByRoomDesc_Z2A().then(function (isSorted) {
                expect(isSorted).toBe(true);
            });
        });

    });

    describe('Rooms table search tests', function () {

        it('Check Room table search is working', function () {
            projRoomTab.searchRoomTable(projRoomData.roomSearchTxt);
            projRoomTab.isRoomResultsDisplayed(projRoomData.roomSearchTxt, projRoomData.roomSearchTag).then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

        it('Check Room table, no search results displayed', function () {
            projRoomTab.searchRoomTable(projRoomData.errorKeyword);
            projRoomTab.isNoRoomResultsDisplayed().then(function (isSearched) {
                expect(isSearched).toBe(true);
            });
        });

    });

    describe('New Room adding tests', function () {

        /*it('Adding new room with mandotory fields', function () {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.addRoomWithMandotory(projRoomData.roomName1, projRoomData.roomType);
            projRoomTab.isNewRoomAdded().then(function (addedRoom) {
                console.log(addedRoom);
                expect(addedRoom.trim()).toBe(projRoomData.roomName1);
            });
        });

        it('Adding new room with all the fields', function () {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.addRoomWithoptional(projRoomData.roomType, projRoomData.roomName2, projRoomData.roomDesc);
            projRoomTab.isNewRoomAdded().then(function (addedRoom) {
                console.log(addedRoom);
                expect(addedRoom.trim()).toBe(projRoomData.roomName2);
            });
        });*/

        it('Test for mandatory field validation', function () {
            addNewRoom = projRoomTab.getAddNewRoomForm();
            addNewRoom.validateRoomName().then(function (isValidated) {
                expect(isValidated).toBe(true);
                addNewRoom.validateRoomType(projRoomData.valName).then(function (typevalid) {
                    expect(typevalid).toBe(true);
                    addNewRoom.closeForm();
                });
            });
            browser.driver.sleep(1500);
        });

    });

    afterAll(function () {
        homePage.logOut();
    });

});