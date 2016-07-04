require('./propertyTabPage.js');
require('./buildingTabPage.js')

var plantDetailPage = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');

    //-----------------------------------------------plantDetailPage elements-----------------------------------------------    

    var plantGridHeader = function() {
        return element(by.css('.panel-title'));
    };

    var menuButton = function() {
        return element(by.id('menu-togglePlants'));
    };

    var anleggMenuIcon = function() {
        return element(by.ngClick("redirectToView('plant.propertyplants')"));
    };

    var boligTab = function() {
        return element.all(by.ngClick("setTabName('')")).get(0);
    };
    
    var plusButton = function(){
        return element(by.id('dropdownMenu1'));
    };
    
    var addPlant = function(){
        return element(by.xpath('//li/a[@data-target="#createPlantModal"]'));
    }

    var bygningTab = function() {
        return element.all(by.ngClick("setTabName('')")).get(1);
    };

    //-----------------------------------------------plantDetailPage controllers-----------------------------------------------

    //check user is in Anlegg page
    this.isInplantDetailPage = function() {
        return plantGridHeader();
    };
    
    //to get add plant modal
    this.goToAddPlantModal = function(){
        plusButton().click();
        addPlant().click();
        
        return require('./modals/addNewPlantModal.js');
    };

    //go to building tab
    this.goToBuilding = function() {
        bygningTab().click();

        return require('./buildingTabPage.js');
    };

    //go to property tab
    this.goToProperty = function() {
        boligTab().click();

        return require('./propertyTabPage.js');
    };

    //check Bolig tab is visible
    this.isboligTabVisible = function() {
        var deferred = protractor.promise.defer();
        boligTab().isDisplayed().then(function(isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };


    //check Bygning tab is visible
    this.isBygningTabVisible = function() {
        var deferred = protractor.promise.defer();
        bygningTab().isDisplayed().then(function(isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };

    //click view/close side menu button
    this.clickMenuButton = function() {
        menuButton().click();
        browser.driver.sleep(1000);
    };

    //check side menu is visible
    this.isMenuDisplayed = function() {
        var deferred = protractor.promise.defer();
        anleggMenuIcon().isDisplayed().then(function(isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };


}
module.exports = new plantDetailPage();