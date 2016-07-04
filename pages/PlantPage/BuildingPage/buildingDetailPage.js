require('../BuildingPage/buildingDocTab.js');
require('../BuildingPage/buildingProjTab.js');

var buildingDetailPage = function () {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------BuildingDetail Page elements--------------------------

    var menuButton = function () {
        return element(by.id('menu-toggleInsidePlants'));
    };

    var anleggMenuIcon = function () {
        return element(by.ngClick("redirectToView('plant.propertyplants')"));
    };

    var titleHeader = function () {
        return element(by.css('.panel-title.ng-binding'));
    };

    var documentTab = function () {
        return element(by.ngClick('setTab(1)'));
    };

    var projectTab = function () {
        return element(by.ngClick('setTab(3)'));
    };

    //-----------------------------------------------Building detail controllers-----------------------------------------------    

    this.getTitleHeader = function () {
        var deferred = protractor.promise.defer();
        titleHeader().getText().then(function (title) {
            deferred.fulfill(title);
        });
        return deferred.promise;
    };

    this.isMenuDisplayed = function () {
        var deferred = protractor.promise.defer();
        anleggMenuIcon().isDisplayed().then(function (isDisplayed) {
            deferred.fulfill(isDisplayed);
        });
        return deferred.promise;
    };

    this.clickmenuButton = function () {
        menuButton().click();
    };

    this.isDocumentTabVisible = function () {
        var deferred = protractor.promise.defer();
        documentTab().isPresent().then(function (isDisplayed) {
            deferred.fulfill(isDisplayed);
        });
        return deferred.promise;
    };

    this.isProjectTabVisible = function () {
        var deferred = protractor.promise.defer();
        projectTab().isPresent().then(function (isDisplayed) {
            deferred.fulfill(isDisplayed);
        });
        return deferred.promise;
    };

    this.goToDocument = function () {
        documentTab().click();

        return require('./buildingDocTab.js');
    };

    this.goToProject = function () {
        projectTab().click();
        return require('./buildingProjTab.js');
    };

}

module.exports = new buildingDetailPage();