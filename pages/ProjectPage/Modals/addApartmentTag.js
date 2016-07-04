var addApartmentTag = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Add Apartment Tag Elements-----------------------------------------------

    var newApartmentTagName = function() {
        return element(by.model('newTag.text'));
    };

    var addApartmentTagBtn = function() {
        return element(by.xpath('//form[@name="addApartmentTagsForm"]/div[2]/button[2]'));
    };

    var cancelBtn = function() {
        return element(by.ngClick("clearAddApartmentsForm()"));
    };

    var apaTagRemoveBtnModal = function() {
        return element.all(by.cssContainingText('.remove-button.ng-binding.ng-scope', '×')).first();
    };

    var allAddedTags = function() {
        return element.all(by.repeater('tag in tagList.items track by track(tag)'));
    };

    var modalHeader = function() {
        return element(by.id('myModalLabel'));
    };

    //-----------------------------------------------Add Apartment Tag Controllers-----------------------------------------------

    //to add a new apartment tag
    this.addNewTag = function(tagName) {
        utilities.enterText(newApartmentTagName(), tagName);
        newApartmentTagName().sendKeys(protractor.Key.ENTER);
        addApartmentTagBtn().click();
    };

    //add two tags to the module
    this.addTwotags = function(tagName1, tagName2) {
        utilities.enterText(newApartmentTagName(), tagName1);
        newApartmentTagName().sendKeys(protractor.Key.ENTER);
        utilities.enterText(newApartmentTagName(), tagName2);
        newApartmentTagName().sendKeys(protractor.Key.ENTER);
    };

    //to remove an added tag
    this.removeTag = function() {
        apaTagRemoveBtnModal().click();
    };

    //to validate whether the tag is removed
    this.validateTagRemove = function() {
        var deferred = protractor.promise.defer();
        allAddedTags().count().then(function(countNo) {
            deferred.fulfill(countNo);
        });
        return deferred.promise;
    };

    //to close the modal
    this.closeModule = function() {
        cancelBtn().click();
    };

    //to validate mandatory fields
    this.validateMandatory = function() {
        var deferred = protractor.promise.defer();
        addApartmentTagBtn().click();
        addApartmentTagBtn().isDisplayed().then(function(displayed) {
            deferred.fulfill(displayed);
            cancelBtn().click();
        });
        return deferred.promise;
    };

}
module.exports = new addApartmentTag();