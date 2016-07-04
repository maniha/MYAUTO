var projCompanyTab = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Company tab elements-----------------------------------------------
    var companySearchBox = function(){
        return element(by.id('projectCompaniesSearch'));
    };
    
    var projectMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var tableLocator = function(){
        return "company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'";
    };
    
    var companyTable = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'"));
    };
    
    var companyNumber = function(){
        return element(by.ngClick("order('OrganizationNumber')"));
    };
    
    var companyName = function(){
        return element(by.ngClick("order('Name')"));
    };
    
    var companyAddress = function(){
        return element(by.ngClick("order('Address')"));
    };
    
    var companyProfessions = function(){
        return element(by.ngClick("order('Professions')"));
    };
    
    var companyDocumentCount = function(){
        return element(by.ngClick("order('DocumentCount')"));
    };
    
    var companyContactPerson = function(){
        return element(by.ngClick("order('ContactPerson')"));
    };
    
    var companyEmail = function(){
        return element(by.ngClick("order('Email')"));
    };
    
    var comNumberColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.OrganizationNumber'));
    };
    
    var comNameColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.Name'));
    };
    
    var comAddressColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.Address'));
    };
    
    var comZipCodeColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.Professions[0].ProfessionName'));
    };
    
    var comCityColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.DocumentCount'));
    };
    
    var comContactPersonColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.ContactPerson'));
    };
    
    var comEmailColumn = function(){
        return element.all(by.repeater("company in projectCompanies| orderBy:predicate:reverse|ProjectCompaniesFilter:projectCompaniesSearch | itemsPerPage: 10 : 'projectCompaniesPag'").column('company.Email'));
    };
    
    var tableRowNumber = function(){
        return element.all(by.tagName('strong')).first(); 
    };
    
    var firstPageButton = function(){
        return element(by.ngClick('setCurrent(1)'));
    };
    
    var lastPageButtonDocument = function(){
        return element(by.ngClick('setCurrent(pagination.last)'));
    };
    
    var nextPageButton = function(){
        return element(by.ngClick('setCurrent(pagination.current + 1)'));
    };
    
    var selectedPageButtonDocument = function(){
        return element(by.css('.ng-scope.active'));
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle.ng-scope'));
    };
    
    var addCompany = function(){
        return element(by.linkText('Inviter bedrift'));
    };
    
    var deleteCompany = function(){
        return element(by.ngClick('removeCompanyFromProject()'));
    };
    
    var confirmDeleteBtn = function(){
        return element(by.xpath('//a[@class="btn btn-warning button right small"]'));
    };
    
    var selectAllCompany = function(){
        return element(by.name('globalcheckboxforcompanies'));
    };
    
    var plusButtonContainer = function(){
        return element(by.xpath('//div[@class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"]/div[@class="dropdown"]'))
    };
    
    //-----------------------------------------------Company tab controllers-----------------------------------------------
    
    this.beforeEachCompanyTest = function(){
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            utilities.enterText(companySearchBox(), "z");
            utilities.clearText(companySearchBox());
        });
    };
    
    //to go to project page 
    this.goToProjectPage = function(){
        projectMenuIcon().click();
        
        return require('./projectPage.js');
    };
    
    //to check if the companies can be added to a closed project
    this.isPlusBtnVisible = function(){
        var deferred = protractor.promise.defer();
        plusButtonContainer().getOuterHtml().then(function(innerHtml){
            console.log(innerHtml);
            deferred.fulfill(innerHtml);
        });
        return deferred.promise;
    };
    
    //to add new companies
    this.getNewCompanyModal = function(){
        plusButton().click();
        addCompany().click();
        browser.driver.sleep(1000);
        
        return require('./Modals/addCompany.js');
    };
    
    //search the Company table
    this.searchCompanyTable = function(searchKey){
        utilities.enterText(companySearchBox(), searchKey);
    };
    
    //to delete a selected company
    this.deleteCompany = function(company){
        utilities.enterText(companySearchBox(), company);
        selectAllCompany().click();
        plusButton().click();
        deleteCompany().click();
        browser.driver.sleep(500);
        confirmDeleteBtn().click();
    };
    
    //to check if a company is deleted
    this.isCompanyDeleted = function(company){
        var deferred = protractor.promise.defer();
        utilities.enterText(companySearchBox(), company);
        noTableDataFoundText().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    //to check if the company is added
    this.isCompanyAdded = function(company){
        var deferred = protractor.promise.defer();
        utilities.enterText(companySearchBox(), company);
        tableRowNumber().getText().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //check the search results of Company table are correct
    this.isCompanyResultsDisplayed = function(keyWord, tag){
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
    
    //check if no data found for Company search
    this.isNoCompanyResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), companyTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };
    
    //check all the headers of Company table is present
    this.isCompanyColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        companyNumber().isPresent().then(function(cNo){
            if(cNo){
                companyName().isPresent().then(function(cName){
                    if(cName){
                        companyAddress().isPresent().then(function(cAddress){
                            if(cAddress){
                                companyProfessions().isPresent().then(function(cZip){
                                    if(cZip){
                                        companyDocumentCount().isPresent().then(function(cCity){
                                            if(cCity){
                                                companyContactPerson().isPresent().then(function(conPer){
                                                    if(conPer){
                                                        companyEmail().isPresent().then(function(email){
                                                            if(email){
                                                                deferred.fulfill(true);
                                                            }else{deferred.fulfill(false);}
                                                        });
                                                    }else{deferred.fulfill(false);}
                                                });
                                            }else{deferred.fulfill(false);}
                                        });
                                    }else{deferred.fulfill(false);}
                                });
                            }else{deferred.fulfill(false);}
                        });
                    }else{deferred.fulfill(false);}
                });
            }else{deferred.fulfill(false);}
        });
        return deferred.promise;
    };
    
    //check the number of rows in Company table is correct
    this.isCompanyRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButtonDocument().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButtonDocument(), companyTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, companyTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Company table by No
    this.sortByCompanyNo_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyNumber().getWebElement());        
    };
    
    //sort the Company table by Name
    this.sortByCompanyName_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyName().getWebElement());        
    };
    
    //sort the Company table by Address
    this.sortByCompanyAddress_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyAddress().getWebElement());        
    };
    
    //sort the Company table by ZipCode
    this.sortBycompanyProfessions_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyProfessions().getWebElement());        
    };
    
    //sort the Company table by City
    this.sortBycompanyDocumentCount_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyDocumentCount().getWebElement());        
    };
    
    //sort the Company table by Contact Person
    this.sortByCompanyConPerson_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyContactPerson().getWebElement());        
    };
    
    //sort the Company table by Email
    this.sortByCompanyEmail_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", companyEmail().getWebElement());        
    };
    
    //check the Company table is sorted by No A to Z
    this.isSortedByCompanyNo_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comNumberColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by No Z to A
    this.isSortedByCompanyNo_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comNumberColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Name A to Z
    this.isSortedByCompanyName_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Name Z to A
    this.isSortedByCompanyName_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Address A to Z
    this.isSortedByCompanyAddress_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comAddressColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Address Z to A
    this.isSortedByCompanyAddress_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comAddressColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by ZipCode A to Z
    this.isSortedBycompanyProfessions_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comZipCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by ZipCode Z to A
    this.isSortedBycompanyProfessions_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comZipCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by City A to Z
    this.isSortedBycompanyDocumentCount_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_A2Z(comCityColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by City Z to A
    this.isSortedBycompanyDocumentCount_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnNumberSorted_Z2A(comCityColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by ContactPerson A to Z
    this.isSortedByCompanyContactPerson_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comContactPersonColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by ContactPerson Z to A
    this.isSortedByCompanyContactPerson_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comContactPersonColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Email A to Z
    this.isSortedByCompanyEmail_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(comEmailColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Company table is sorted by Email Z to A
    this.isSortedByCompanyEmail_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(comEmailColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    
}
module.exports = new projCompanyTab()