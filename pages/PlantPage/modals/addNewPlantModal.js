/// <reference path="../../../typings/tsd.d.ts" />

var addNewPlantModal = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Modal elements-----------------------------------------------

    var streetName = function() {
        return element(by.model('address.streetName'));
    };

    var houseNumber = function() {
        return element(by.model('address.houseNumber'));
    };

    var houseLetter = function() {
        return element(by.model('address.houseLetter'));
    };

    var postCode = function() {
        return element(by.model('searchParam'));
    };

    var validationError = function() {
        return element(by.xpath("//div[@ng-repeat='alert in list()']"));
    };

    var searchBtn1 = function() {
        return element(by.xpath('//form[@name="lookupByAddForm"]/button[@type="submit"]'));
    };

    var advancedSearchShow = function() {
        return element(by.id("advanced"));
    };

    var boligmappaNumber = function() {
        return element(by.model('content.boligmappaNumber'));
    };

    var searchBtn2 = function() {
        return element(by.xpath('//form[@name="lookupByBMForm"]/button[@type="submit"]'));
    };

    var knr = function() {
        return element(by.model('matrikkel.Knr'));
    };

    var gnr = function() {
        return element(by.model('matrikkel.Gnr'));
    };

    var bnr = function() {
        return element(by.model('matrikkel.Bnr'));
    };

    var fnr = function() {
        return element(by.model('matrikkel.Fnr'));
    };

    var snr = function() {
        return element(by.model('matrikkel.Snr'));
    };

    var shareNum = function() {
        return element(by.model('matrikkel.shareNum'));
    };

    var unitNum = function() {
        return element(by.model('matrikkel.unitNum'));
    };

    var searchBtn3 = function() {
        return element(by.xpath('//form[@name="lookupByMatForm"]/button[@type="submit"]'));
    };

    //-----------------------------------------------Modal controllers-----------------------------------------------

    //to enter street name
    this.enterStreetName = function(sName) {
        utilities.enterText(streetName(), sName);
        searchBtn1().click();
    };
    
    //click add plant by address button
    this.clickAddBtn1 = function() {
        searchBtn1().click();
    };

    //to enter house number
    this.enterHouseNumber = function(hNo) {
        utilities.enterText(houseNumber(), hNo);
        searchBtn1().click();
    };
    
    //to check if modal is visible
    this.isModalVisible = function() {
        var deferred = protractor.promise.defer();
        searchBtn1().isDisplayed().then(function(isDis) {
            deferred.fulfill(isDis);
        });
        return deferred.promise;
    };
    
    //to enter post code
    this.enterPostCode = function(pNo) {
        utilities.enterText(postCode(), pNo);
        searchBtn1().click();
    };

    //click add plant by boligmappa no button
    this.clickAddBtn2 = function(boligNo) {
        searchBtn2().click();
    };

    //click add plant by matrikal button
    this.clickAddBtn3 = function(boligNo) {
        searchBtn3().click();
    };

    //to enter knr
    this.enterKnr = function(kNo) {
        utilities.enterText(knr(), kNo);
        searchBtn3().click();
    };

    //to enter gnr
    this.enterGnr = function(kNo) {
        utilities.enterText(gnr(), kNo);
        searchBtn3().click();
    };

    //to enter bnr
    this.enterBnr = function(kNo) {
        utilities.enterText(bnr(), kNo);
        searchBtn3().click();
    };

    //to show/hide advance search
    this.showHideAdvanceSearch = function(){
        advancedSearchShow().click();
    };
    
    //to select a plant by address with only mandotory fields
    this.selectPlantByAddressMan = function(sName, hNo, pCode){
        utilities.enterText(streetName(), sName);
        utilities.enterText(houseNumber(), hNo);
        postCode().sendKeys(pCode);
        //utilities.enterText(postCode, pCode);
        searchBtn1().click();
        
        return require('./plantListings.js');
    };
    
    //to select a plant by address with optional fields
    this.selectPlantByAddressOptio = function(sName, hNo, pCode, hLetter){
        utilities.enterText(streetName(), sName);
        utilities.enterText(houseNumber(), hNo);
        utilities.enterText(houseLetter(), hLetter);
        utilities.enterText(postCode, pCode);
        searchBtn1().click();
        
        return require('./plantListings.js');
    };
}
module.exports = new addNewPlantModal();