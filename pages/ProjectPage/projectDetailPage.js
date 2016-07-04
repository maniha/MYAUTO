require('../ProjectPage/projectPage.js');

var projectDetailPage = function () {
        
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------project detail page elements-----------------------------------------------
    
    var showMenuButton = function () {
        return element(by.id('menu-toggleInsideProjects'));
    };

    var homeMenuIcon = function () {
        return element.all(by.ngClick("redirectToView('home')")).first();
    };

    var projectMenuIcon = function () {
        return element.all(by.ngClick("redirectToView('project')")).first();
    };

    var detailTab = function () {
        return element.all(by.ngClick("setTabName('')")).get(0);
    };

    var documentTab = function () {
        return element.all(by.ngClick("setTabName('')")).get(1);
    };

    var roomTab = function () {
        return element.all(by.ngClick("setTabName('')")).get(2);
    };

    var companyTab = function () {
        return element.all(by.ngClick("setTabName('')")).get(4);
    };

    var deviceTab = function () {
        return element.all(by.ngClick("setTabName('')")).get(3);
    };
    
    var apartmentTag = function(){
        return element.all(by.ngClick("setTabName('')")).get(5);
    };

    var noTableDataFoundText = function () {
        return element(by.css('.resultatet-teller-red'));
    };

    var lastPageButtonDocument = function () {
        return element(by.ngClick('setCurrent(pagination.last)'));
    };

    var nextPageButtonDocument = function () {
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };

    var selectedPageButtonDocument = function () {
        return element(by.css('.ng-scope.active'));
    };

    var documentTableRowNumber = function () {
        return element.all(by.tagName('strong')).first();
    };
    
    //-----------------------------------------------project detail page controllers-----------------------------------------------
    
    //check if the user is in project details page
    this.isInProjDetailpage = function () {
        var deferred = protractor.promise.defer()
        showMenuButton().isPresent().then(function (isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    //click view/close side menu button
    this.clickMenuButton = function () {
        showMenuButton().click();
        browser.driver.sleep(1000);
    };
    
    //check side menu is visible
    this.isMenuDisplayed = function () {
        var deferred = protractor.promise.defer();
        homeMenuIcon().isDisplayed().then(function (isVisible) {
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    //go to project page
    this.goToProjectPage = function () {
        projectMenuIcon().click();

        return require('./projectPage.js');
    };

    this.goToDocumentTab = function () {
        documentTab().click();

        return require('./projDocumentTab.js');
    };

    this.goToRoomTab = function () {
        roomTab().click();

        return require('./projRoomTab.js');
    };

    this.goToCompanyTab = function () {
        companyTab().click();

        return require('./projCompanyTab.js');
    };

    this.goToDeviceTab = function () {
        deviceTab().click();

        return require('./projDeviceTab.js');
    };

    this.goToApartmentTag = function () {
        apartmentTag().click();

        return require('./projApartmentTag.js');
    }

}
module.exports = new projectDetailPage();