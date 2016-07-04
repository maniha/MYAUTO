/// <reference path="../../../typings/tsd.d.ts" />

var projectConnectModal = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Modal elements-----------------------------------------------
    var searchBox = function() {
        return element(by.id('associateBolig'));
    };

    var tableRows = function() {
        return element.all(by.repeater('project in anonymousProjects |PlantProjectsAssociateBoligFilter:associateBolig'));
    };

    var firstRowBtn = function() {
        return element.all(by.id('myButton')).first();
    };
    
    var confirmConnectYes = function(){
        return element(by.xpath("//button[@ng-click='associateAnonymousProject()']"));
    };

    //-----------------------------------------------Modal controllers-----------------------------------------------

    this.checkIfProjectIsAvailable = function(projNo) {
        utilities.enterText(searchBox(), projNo);
        var deferred = protractor.promise.defer();
        tableRows().count().then(function(rowNo) {
            deferred.fulfill(rowNo);
        });
        return deferred.promise;
    };

    this.connectProject = function(projNo) {
        utilities.enterText(searchBox(), projNo);
        firstRowBtn().click();
        confirmConnectYes().click();
        
        return require('../PropertyPage/propertyProjTab.js');
    };
}
module.exports = new projectConnectModal();

