//require('../pages/docUploadPage.js');

var propertyDetailPage = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------plant detail page elements-----------------------------------------------

    var plantTitle = function() {
        return element(by.css('.panel-title.ng-binding'));
    };

    var homeMenuIcon = function() {
        return element(by.ngClick("redirectToView('home')"));
    };

    var menuButton = function() {
        return element(by.id('menu-toggleInsidePlants'));
    };

    var documentTab = function() {
        return element(by.ngClick('setTab(1)'));
    };

    var roomsTab = function() {
        return element(by.ngClick('setTab(2)'));
    };

    var projectTab = function() {
        return element(by.ngClick('setTab(3)'));
    };

    var devicesTab = function() {
        return element(by.ngClick('setTab(4)'));
    };

    var noTableDataFoundText = function() {
        return element(by.css('.resultatet-teller-red'));
    };

    var toolsDropdown = function() {
        return element(by.id('dropdownMenu1'));
    };

    var uploadDocumentLink = function() {
        return element(by.linkText('Last opp dokuments'));
    };

    var docSearchBox = function() {
        return element(by.id('plantDocumentsSearch'));
    };

    //-----------------------------------------------plant detail page controllers-----------------------------------------------

    this.isUserInplantPage = function(plantName) {
        var deferred = protractor.promise.defer();
        plantTitle().getText().then(function(text) {
            deferred.fulfill(text == plantName);
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
        homeMenuIcon().isDisplayed().then(function(isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };

    this.beforeEach = function() {
        browser.driver.executeScript("arguments[0].click()", documentTab().getWebElement());
        utilities.enterText(docSearchBox(), 'z');
        utilities.clearText(docSearchBox());
    };

    //go to device Tab
    this.goToDevice = function() {
        devicesTab().click();
        return require('./propertyDevicePage.js');
    };

    //go to document Tab
    this.goToDocument = function() {
        documentTab().click();
        return require('./propertyDocTab.js');
    };

    //go to project Tab
    this.goToProject = function() {
        projectTab().click();
        return require('./propertyProjTab.js');
    };

    //go to room Tab
    this.goToRoom = function() {
        roomsTab().click();
        return require('./propertyRoomTab.js');
    };

    //-----------------------------------------------Document upload window controllers-----------------------------------------------

    /* this.getDocumentUpload = function(){
         toolsDropdown().click();
         uploadDocumentLink().click();
         
         return require('./docUploadPage.js');
     };
     
     this.selectFiles = function(filePath){
         browser.driver.sleep(1000);
         browseButton().sendKeys(filePath);
     };*/
}
module.exports = new propertyDetailPage();