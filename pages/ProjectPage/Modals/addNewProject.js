/// <reference path="../../../typings/tsd.d.ts" />

var addNewProject = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');
    
    //-----------------------------------------------addNewProject Modal Elements-----------------------------------------------    
    
    var projName = function(){
        return element(by.model('createProjectContext.project.ProjectName'));
    };
    
    var projDesc = function(){
        return element(by.model('createProjectContext.project.ProjectDescription'));
    };
    
    var contactName = function(){
        return element(by.model('createProjectContext.project.ContactPersonName'));
    };
    
    var contactNo = function(){
        return element(by.model('createProjectContext.project.ContactNumber'));
    };
    
    var emailAddress = function(){
        return element(by.model('createProjectContext.project.ContactEmailAddress'));
    };
    
    var createBtn = function(){
        return element(by.id('btnCreate'));
    };
    
    var closeBtn = function(){
        return element(by.ngClick('closeModal()'));
    };
    
    //-----------------------------------------------addNewProject Modal controllers-----------------------------------------------    
    
    this.addProjectWithMandotory = function(Name, contPerson, email) {
        browser.driver.sleep(1000);
        utilities.enterText(projName(), Name);
        utilities.enterText(contactName(), contPerson);
        utilities.enterText(emailAddress(), email);
        createBtn().click();
    };

    this.addProjectWithOptional = function(Name, desc, contPerson, conNo, email) {
        browser.driver.sleep(1000);
        utilities.enterText(projName(), Name);
        utilities.enterText(projDesc(), desc);
        utilities.enterText(contactName(), contPerson);
        utilities.enterText(contactNo(), conNo);
        utilities.enterText(emailAddress(), email);
        createBtn().click();
    };

    this.validateProjectName = function() {
        var deferred = protractor.promise.defer();
        browser.driver.sleep(1000);
        createBtn().click().then(function() {
            projName().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };

    this.validateContact = function(Name) {
        var deferred = protractor.promise.defer();
        utilities.enterText(projName(), Name);
        createBtn().click().then(function() {
            projName().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };
    
    this.validateEmail = function(contact) {
        var deferred = protractor.promise.defer();
        utilities.enterText(contactName(), contact);
        createBtn().click().then(function() {
            projName().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };

    this.closeForm = function() {
        closeBtn().click();
    };
    
}
module.exports = new addNewProject();