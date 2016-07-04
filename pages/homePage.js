require('./PlantPage/plantDetailPage.js');
require('./ProjectPage/projectPage.js');

var homePage = function () {
    var utilities = require('../helper/utilities.js');
    var loginData = require('../testData/loginData.json');
    //--------------------------------------homePage elements----------------------------------------
    var usernameText = function(){
        return element(by.binding("firstName + ' ' + lastName"));
    };
    
    var logOutButton = function(){
        return element(by.linkText('Logg av'));
    };
    
    var constructionMenuItem = function(){
        return element(by.ngClick("redirectToView('plant.propertyplants')"));
    };
    
    var projectMenuItem = function(){
        return element(by.ngClick("redirectToView('project')"));
    };
    
    var menuButton = function(){
        return element(by.id('menu-toggleHome'));
    };
    
    var homeMenuIcon = function(){
        return element(by.ngClick("redirectToView('home')"));
    };

    var searchBox = function() {
     return element(by.model('searchParam'));
    };

    var searchButton = function () {
        return element(by.ngClick('compileAddressModel()'));
    };

    var companyList = function () {
        return element(by.xpath('//ul[@ng-show="completing && (suggestions | filter:searchFilter).length > 0"]'));
    };
   
    var firstPlantName = function () {
        return element.all(by.repeater("suggestion in suggestions | filter:searchFilter | orderBy:'toString()' track by $index")).first();
    };

    var plantTitle = function () {
        return element(by.xpath('//*[@id="page-content-wrapper"]/div/ui-view/div[4]/div/div[1]/div/div/div/div[1]/h3'));
    };
    
    var plantButton = function () {
        return element(by.ngClick('viewDetails(plant)'));
    };

   
    

        
    //------------------------------------homePage controllers----------------------------------------------------
    this.isUserLoggedIn = function(){
        return usernameText();
    };

    this.logOut = function(){
        logOutButton().click();
        browser.ignoreSynchronization = true;
        
        return require('./welcomePage.js');
    };
    
    this.goToplantDetailPage = function () {
        constructionMenuItem().click();
        return require('./PlantPage/plantDetailPage.js');
    };
    
    this.goToProjectPage = function(){
        projectMenuItem().click();
        return require('./ProjectPage/projectPage.js');
    };
    
    this.isLogoutButtonClickable = function(){
        var deferred = protractor.promise.defer();
        logOutButton().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
            
    this.isMenuButtonDisplayed = function(){
        var deferred = protractor.promise.defer();
        menuButton().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    this.clickMenuButton = function(){
        menuButton().click();
        browser.driver.sleep(1000);
    };
    
    this.isMenuDisplayed = function(){
        var deferred = protractor.promise.defer();
        homeMenuIcon().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };  

   
   //this.plantListDD = function () {
   //    var deferred = protractor.promise.defer();
   //    companyList().isDisplayed().then(function (isVisi) {
   //        deferred.fulfill(isVisi);
   //    });
   //    return deferred.promise;
   //};
      

    this.isSearch = function () {
        var deferred = protractor.promise.defer();
        searchBox().isDisplayed()
         .then(function () {
             return searchBox();
         }).then(function (searchBox) {
             utilities.enterText(searchBox, loginData.enteredText);
         }),companyList().isDisplayed()
            .then(function (isVisi) {
                deferred.fulfill(isVisi);
                browser.driver.sleep(1000);
                return isVisi;
            }).then(function (isVisi) {
                  if (isVisi == true) {
                    firstPlantName().click();
                    searchButton().click();
                    browser.driver.sleep(1000);
                    plantButton().click();
                    browser.driver.sleep(1000);
                } 
              });
                        
         
        return deferred.promise;
        
    };
    this.isPlantModalDisplayed = function () {
        var deferred = protractor.promise.defer();
        plantTitle().isDisplayed().then(function (isVis) {
            deferred.fulfill(isVis);
        });
        return deferred.promise;
    };

    this.displayModaldata = function () {        
        browser.driver.sleep(1000);
        return $$('.table table-responsive tr').filter(function (row) {
            return row.$$('td').get(2).getText()
                .then(function (rowName) {
                    // Filter rows matching the name you are looking for.
                    return rowName === 'Boligmappanummer';
                });
        }).then(function (rowName) {
            console.log(rowName);
        });
        return deferred.promise;
    };
  

}
module.exports = new homePage();