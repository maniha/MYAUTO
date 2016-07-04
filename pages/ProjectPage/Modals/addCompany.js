/// <reference path="../../../typings/tsd.d.ts" />

var addCompany = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Add Company Elements-----------------------------------------------
    var companyName = function() {
        return element(by.id('typedCompanyName'));
    };

    var companyNo = function() {
        return element(by.id('organizationNumber'));
    };

    var companyNameList = function() {
        return element.all(by.xpath('//li/span[@class="highlight"]'));
    };
    
    var companyList = function(){
        return element(by.xpath('//ul[@ng-show="completing && (suggestions | filter:searchFilter).length > 0"]'));
    };
    
    var firstCompanyName = function(){
        return element.all(by.repeater("suggestion in suggestions | filter:searchFilter | orderBy:'toString()' track by $index")).first();
    };
    
    var firstRowRemove = function(row){
        return element.all(by.xpath('(//button[@ng-click="removeCompanyFromTable(company.OrganizationNumber)"])[' + row + ']'));
    };
    
    var firstRowEmail = function(row){
        return element(by.xpath('(//input[@ng-model="company.ContactPersonEmail"])[' + row + ']'))
    };
    
    var allCompanyNamesInTable = function(){
        return element.all(by.xpath('(//td[@ng-bind="company.CompanyName"])'));
    };
    
    var addToTableBtn = function(){
        return element(by.ngClick('addCompanyToTable(inviteCompanyContext.companyToBeAdded)'));
    };
    
    var invalidEmailError = function(){
        return element(by.xpath('//div[@ng-bind="company.Status"]'));
    };
    
    var addToProjectBtn = function(){
        return element(by.id('btnCreate'));
    };

    //-----------------------------------------------Add Company Controllers-----------------------------------------------
    //to search by company name
    this.searchCompanyName = function(keyWord) {
        utilities.enterText(companyName(), keyWord + '1');
        companyName().sendKeys(protractor.Key.BACK_SPACE);
        browser.driver.sleep(1000);
    };

    //to check if the search results are correct
    this.isSearchCorrect = function(keyWord) {
        var deferred = protractor.promise.defer();
        utilities.elemetAllToArrayInnerHTML(companyNameList()).then(function(arrayInner) {
            for(var i = 0; i < arrayInner.length; i++){
                if(arrayInner[i].toString().toLowerCase() == keyWord){
                    deferred.fulfill(true);}
                else{
                    deferred.fulfill(false);
                    break;}
            };
        });
        return deferred.promise;
    };
    
    //to enter email for selected company
    this.enterEmail = function(row, email){
        utilities.enterText(firstRowEmail(row), email);
    };
    
    //to check if empty email field is validated
    this.isEmailEmpty = function(){
        var deferred = protractor.promise.defer();
        addToProjectBtn().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    //to check if invalid email is validated
    this.isInvaildEmailErrorDisplayed = function(){
        var deferred = protractor.promise.defer();
        invalidEmailError().isDisplayed().then(function(visible){
            deferred.fulfill(visible);
        });
        return deferred.promise;
    };
    
    //to add selected company to project
    this.addCompanyToProject = function(){
        addToProjectBtn().click();
    };
    
    //to check if the suggestion list is visible
    this.isSuggestionsVisible = function(){
        var deferred = protractor.promise.defer();
        companyList().isDisplayed().then(function(isDisplayed){
            deferred.fulfill(isDisplayed);
        });
        return deferred.promise;
    };
    
    //to select a company from dropdown
    this.selectCompanyFromDD = function(keyWord){
        utilities.enterText(companyName(), keyWord + '1');
        companyName().sendKeys(protractor.Key.BACK_SPACE);
        browser.driver.sleep(1000);
        firstCompanyName().click();
        addToTableBtn().click();
    };

    //to remove a column from the tableFirstRow
    this.removeTableRow = function(rowNo){
        firstRowRemove(rowNo).click();
    };
    
    //to get all the added company names to table
    this.allAddedCompanyNames = function(){
        var deferred = protractor.promise.defer();
        allCompanyNamesInTable().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };

}
module.exports = new addCompany();