var projApartmentTag = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Apartment Tag Elements-----------------------------------------------
    var apartmentTagHeader = function(){
        return element(by.ngClick("order('ApartmentTag')"));
    };
    
    var projectMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var searchBox = function(){
        return element(by.id('projectApartmentTagSearch'));
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var lastPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.last)'));
    };
    
    var nextPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };
    
    var selectedPageButton = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var tableLocator = function(){
        return "apartmentTag in apartmentTags| orderBy:predicate:reverse|ProjectApartmentTagsFilter:projectApartmentTagSearch | itemsPerPage: 10 : 'projectApartmentTagPag'";
    };
    
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first(); 
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var appartmentTagTable = function(){
        return element.all(by.repeater("apartmentTag in apartmentTags| orderBy:predicate:reverse|ProjectApartmentTagsFilter:projectApartmentTagSearch | itemsPerPage: 10 : 'projectApartmentTagPag'"));
    };
    
    var apartmentTagColumn = function(){
        return element.all(by.repeater("apartmentTag in apartmentTags| orderBy:predicate:reverse|ProjectApartmentTagsFilter:projectApartmentTagSearch | itemsPerPage: 10 : 'projectApartmentTagPag'").column('apartmentTag.ApartmentTag'));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle.ng-scope'));
    };
    
    var addNewApartmentTag = function(){
        return element(by.linkText('Opprett Bruksenhet'));
    };
    
    var addedTag = function(){
        return element.all(by.repeater("apartmentTag in apartmentTags| orderBy:predicate:reverse|ProjectApartmentTagsFilter:projectApartmentTagSearch | itemsPerPage: 10 : 'projectApartmentTagPag'").column('apartmentTag.ApartmentTag')).first();
    };
    
    var addedTagDeleteBtn = function(){
        return element.all(by.repeater("apartmentTag in apartmentTags| orderBy:predicate:reverse|ProjectApartmentTagsFilter:projectApartmentTagSearch | itemsPerPage: 10 : 'projectApartmentTagPag'")).first().element(by.tagName('a'));
    };
    
    var confirmDeleteBtn = function(){
        return element.all(by.repeater('button in dialog.buttons')).get(1);
    };
    
    var plusButtonContainer = function(){
        return element(by.xpath('//div[@class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"]/div[@class="dropdown"]'))
    };
    
    //-----------------------------------------------Apartment Tag Controllers-----------------------------------------------
    this.beforeAll = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            utilities.enterText(searchBox(), "z");
            utilities.clearText(searchBox());
        });
    };
    
    //to check if the file adding is disabled
    this.isApaTagAddingEnabled = function(){
        var deferred = protractor.promise.defer();
        plusButtonContainer().getOuterHtml().then(function(innerHtml){
            console.log(innerHtml);
            deferred.fulfill(innerHtml);
        });
        return deferred.promise;
    };
    
    //go back to project page
    this.goToProjectPage = function(){
        projectMenuIcon().click();
        
        return require('./projectPage.js');
    };
    
    //search the Apartment Tag table
    this.searchTable = function(searchKey){
        utilities.enterText(searchBox(), searchKey);
    };
    
    //check the search results of Apartment Tag table are correct
    this.isResultsDisplayed = function(keyWord, tag){
        var deferred = protractor.promise.defer();
        utilities.tableAllToArray(tableRowNumber(), tableLocator(), nextPageButton(), tag, 10).then(function(rowContent){
            if(rowContent.length > 10){firstPageButton().click();}
            for(var i = 0; i < rowContent.length; i++){
                if(rowContent[i].toString().toLowerCase().indexOf(keyWord) >= 0){
                    deferred.fulfill(true);}
                else{
                    deferred.fulfill(false);
                    break;
                }
            }
        });
         return deferred.promise;
    };
    
    //check if no data found for Apartment Tag search
    this.isNoResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), appartmentTagTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check the number of rows in Apartment Tag table is correct
    this.isRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), appartmentTagTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, appartmentTagTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //check all the headers of Apartment Tag table is present
    this.isColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        apartmentTagHeader().isPresent().then(function(apaTag){
            if(apaTag){
                deferred.fulfill(true);
            }else{deferred.fulfill(false);}
        });
        return deferred.promise;
    };
    
    //to add a new apartment tag
    this.getAddNewTagModal = function(){
        plusButton().click();
        addNewApartmentTag().click();
        browser.driver.sleep(1000);
        
        return require('./Modals/addApartmentTag.js');
    };
    
    //check if the new apartment tag is added
    this.isNewTagAdded = function(tagName){
        var deferred = protractor.promise.defer();
        addedTag().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //to delete the added apartment tag
    this.deleteAddedTag = function(){
        addedTagDeleteBtn().click();
        browser.driver.sleep(1000);
        confirmDeleteBtn().click();
    };
    
    //check if the added tag is deleted
    this.isApaTagDeleted = function(){
        var deferred = protractor.promise.defer();
        addedTag().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //sort the Apartment Tag table by Tag Name
    this.sortByApartmentTag_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", apartmentTagHeader().getWebElement());        
    };
    
    //check the Apartment Tag table is sorted by Tag Name A to Z
    this.isSortedByApartmentTag_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(apartmentTagColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Apartment Tag table is sorted by Tag Name Z to A
    this.isSortedByApartmentTag_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(apartmentTagColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
}
module.exports = new projApartmentTag();