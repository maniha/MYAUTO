/// <reference path="../../typings/tsd.d.ts" />

describe('Plant adding tests', function() {

    //Pages
    var welcomePage = require('../../pages/welcomePage.js');
    var loginPage, homePage, plantDetailPage, buildingDetailPage, addPlant, plantListing, plantData;

    //Data files
    var loginData = require('../../testData/loginData.json');
    var addPlantData = require('../../testData/PlantPageData/addPlantData.json');

    beforeAll(function() {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        plantDetailPage = homePage.goToplantDetailPage();
        addPlant = plantDetailPage.goToAddPlantModal();
    });

    afterAll(function() {
        homePage.logOut();
    });


    describe('Selecting a plant by address tests', function() {

        it('Check if the manotory field validation is functional in search by address', function() {
            browser.driver.sleep(1000);
            addPlant.clickAddBtn1();
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
            addPlant.enterStreetName(addPlantData.plantStreet);
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
            addPlant.enterHouseNumber(addPlantData.houseNo);
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
        });
        
        //check if 

        it('Check if all the plants are listed in search results', function() {
            plantListing = addPlant.selectPlantByAddressMan(addPlantData.plantStreet, addPlantData.houseNo, addPlantData.postCode);
            plantData = plantListing.goToBuilding(addPlantData.uNo);
            plantData.getBoligmappaNo(addPlantData.boliNo, addPlantData.sAddre, addPlantData.knr, addPlantData.shaNo, addPlantData.uNo, addPlantData.pType, addPlantData.mNo, addPlantData.longi).then(function(txt) {
                expect(txt).toBe(true);
            });
        });

    });

    /*describe('', function() {

        it('Check if the manotory field validation is functional in search by boligmappa no', function() {
            addPlant.showHideAdvanceSearch();
            addPlant.clickAddBtn2();
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
        });

        it('Check if the manotory field validation is functional in search by matrikkel', function() {
            addPlant.clickAddBtn3();
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
            addPlant.enterKnr('12');
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
            addPlant.enterGnr('12');
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
            addPlant.enterBnr('12');
            addPlant.isModalVisible().then(function(isVisi) {
                expect(isVisi).toBe(true);
            });
        });

    });*/



});