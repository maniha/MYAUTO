require('../ProjectPage/projectDetailPage.js');

var projectPage = function(){
    
    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../helper/utilities.js');
    
    //-----------------------------------------------Project Page elements-----------------------------------------------    
    var projectMenuItem = function(){
        return element.all(by.ngClick("redirectToView('project')")).first();
    };
    
    var menuButton = function(){
        return element(by.id('menu-toggleProjects'));
    };
    
    var homeMenuIcon = function(){
        return element.all(by.ngClick("redirectToView('home')")).first();
    };
    
    var projectPageHeader = function(){
        return element(by.css('.panel-title'));
    };
    
    var tableSearchBox = function(){
        return element(by.id('projsSearch'));
    };
    
    var tableRowNumber = function(){
        return element(by.tagName('strong'));
    };
    
    var projectTable = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'"));
    };
    
    var tableLocator = function(){
        return "proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'";
    };
    
    var firstPageButton = function(){
        return element.all(by.ngClick('setCurrent(1)')).last();
    };
    
    var previousPageButton = function(){
        return element.all(by.ngClick('setCurrent(pagination.current - 1)')).last();
    };
    
    var nextPageButton = function(){
        return element.all(by.ngClick('setCurrent(pagination.current + 1)')).last();
    };
    
    var lastPageButton = function(){
        return element.all(by.ngClick('setCurrent(pagination.last)')).last();
    };
    
    var selectedPageButton = function(){
        return element.all(by.css('.ng-scope.active')).last();
    };
    
    var noTableDataFoundText = function(){
        return element(by.css('.resultatet-teller-red'));
    };
    
    var projectCodeHeader = function(){
        return element(by.ngClick("order('code')"));
    };
    
    var projectNameHeader = function(){
        return element(by.ngClick("order('name')"));
    };
    
    var projectAddressHeader = function(){
        return element(by.ngClick("order('address')"));
    };
    
    var projectCompanyHeader = function(){
        return element(by.ngClick("order('company')"));
    };
    
    var projectStatusHeader = function(){
        return element(by.ngClick("order('status')"));
    };
    
    var projectUpdateDateHeader = function(){
        return element(by.ngClick("order('updatedDate')"));
    };
    
    var projectCodeColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.code'));
    };
    
    var projectNameColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.name'));
    };
    
    var projectAddressColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.address'));
    };
    
    var projectCompanyColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.company'));
    };
    
    var projectStatusColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.status'));
    };
    
    var projectUpdatedDateColumn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.updatedDate.split(" ")[0] | date:"dd.MM.yyyy"'));
    };
    
    var projectRowByProjNo = function(projNo){
        return element(by.linkText(projNo));
    };
    
    var plusButton = function(){
        return element(by.css('.btn.btn-default.dropdown-toggle'));
    };
    
    var addNewProjectIcon = function(){
        return element(by.linkText('Nytt midlertidig prosjekt'));
    };
    
    var topRow = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'")).get(0).all(by.tagName('a'));
    };
    
    var addedProjectNo = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'").column('proj.code')).get(0); 
    };
    
    var projectStatus = function(type) {
        return element(by.model('proj.selectedStatus')).$('[label="' + type + '"]');
    };
    
    var projDeleteBtn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'")).get(0).all(by.tagName('td')).get(1);
    };
    
    var projEditBtn = function(){
        return element.all(by.repeater("proj in projList | orderBy:predicate:reverse | projectsFilter:projsSearch | itemsPerPage:10 : 'projsPage'")).get(0).all(by.tagName('td')).get(0);
    };
    
    var projRemoveBtn = function(){
        return element(by.ngClick('deleteProject(proj)'));
    };
    
    var confirmDelete = function(){
        return element.all(by.css('.btn.btn-warning.button.right.small')).last();
    };
    
    //-----------------------------------------------Project Page controllers-----------------------------------------------    
    
    //to change project status
    this.changeProjStatus = function(projNo, status){
        utilities.enterText(tableSearchBox(), projNo);
        projectStatus(status).click();
    };
    
    //to check if the project status changed to In Progress
    this.isProjInCorrectStatus = function(delExpClass, editExpClass){
        var deferred = protractor.promise.defer();
        projDeleteBtn().getAttribute('class').then(function(delClass){
            projEditBtn().getAttribute('class').then(function(editClass){
                if(delClass == delExpClass && editClass == editExpClass){
                    deferred.fulfill(true);}
                else{deferred.fulfill(false);}
            });
        });
        return deferred.promise;
    };
    
    //to delete a project
    this.deleteProject = function(projNo){
        utilities.enterText(tableSearchBox(), projNo);
        projRemoveBtn().click();
        browser.driver.executeScript("arguments[0].click()", confirmDelete().getWebElement());
    };
    
    //to check if a project is deleted
    this.isProjDeleted = function(projNo){
        var deferred = protractor.promise.defer();
        utilities.enterText(tableSearchBox(), projNo);
        noTableDataFoundText().isDisplayed().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //get the newly added project no
    this.getAddedProjNo = function(){
        var deferred = protractor.promise.defer();
        addedProjectNo().getText().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //check if the added document is visible
    this.isProjectAdded = function(){
        var deferred = protractor.promise.defer();
        topRow().getInnerHtml().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //check if the project is visible
    this.isProjectAdded2 = function(projNo){
        var deferred = protractor.promise.defer();
        utilities.enterText(tableSearchBox(), projNo);
        tableRowNumber().getText().then(function(txt){
            deferred.fulfill(txt);
        });
        return deferred.promise;
    };
    
    //go to add new project modal
    this.addNewProject = function(){
        plusButton().click();
        addNewProjectIcon().click();
        
        return require('./Modals/addNewProject.js');
    };
    
    //Search by project number and go to project
    this.goTOProject = function(projNo){
        utilities.enterText(tableSearchBox(), projNo);
        projectRowByProjNo(projNo).click();
        
        return require('./projectDetailPage.js');
    };
    
    //check user is in Project page
    this.isInProjectPage = function(){
        var deferred = protractor.promise.defer();
        projectPageHeader().getText().then(function(headerTxt){
            deferred.fulfill(headerTxt);
        });
        return deferred.promise;
    };
    
    //check side menu is visible
    this.isMenuDisplayed = function(){
        var deferred = protractor.promise.defer();
        homeMenuIcon().isDisplayed().then(function(isVisible){
            deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };
    
    //click view/close side menu button
    this.clickMenuButton = function(){
        menuButton().click();
        browser.driver.sleep(1000);
    };
    
    //search the bygning table
    this.searchTable = function(searchKey){
        utilities.enterText(tableSearchBox(), searchKey);
    };
    
    //runs before each it block
    this.beforeEach = function(){
        projectMenuItem().click();
        utilities.enterText(tableSearchBox(), 'z');
        utilities.clearText(tableSearchBox());
    };
    
    //check the search results of Bygning table are correct
    this.isSearchResultsDisplayed = function(keyWord, tag){
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
    
    //check if no data found for project search
    this.isNoSearchResultsDisplayed = function(){
        var deferred = protractor.promise.defer();
        utilities.isNoSearchResultsDisplayed(noTableDataFoundText(), projectTable()).then(function(resultsDisplayed){
            deferred.fulfill(resultsDisplayed);
        });
        return deferred.promise;
    };

    //check the number of rows in bygning table is correct
    this.isProjectRowNumberCorrect = function(){
        var deferred = protractor.promise.defer();
        tableRowNumber().getText().then(function(rowNo){
            if(rowNo > 10){
                lastPageButton().click();
                utilities.isLargeRowNumberCorrect(rowNo, selectedPageButton(), projectTable(), 10).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                    firstPageButton().click();
                });
            }
            else{
                utilities.isLessRowNumberCorrect(rowNo, projectTable()).then(function(isCorrect){
                    deferred.fulfill(isCorrect);
                });
            }
        });
        return deferred.promise;
    };
    
    //sort the Project table by Code
    this.sortByProjCode_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectCodeHeader().getWebElement());        
    };
    
    //sort the Project table by Name
    this.sortByProjName_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectNameHeader().getWebElement());        
    };
    
    //sort the Project table by Address
    this.sortByProjAddress_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectAddressHeader().getWebElement());        
    };
    
    //sort the Project table by Company
    this.sortByProjCompany_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectCompanyHeader().getWebElement());        
    };
    
    //sort the Project table by Status
    this.sortByProjStatus_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectStatusHeader().getWebElement());        
    };
            
    //sort the Project table by Updated Date
    this.sortByProjUpdateDate_A2Z = function(){
        browser.driver.executeScript("arguments[0].click()", projectUpdateDateHeader().getWebElement());        
    };
    
    //check the Project table is sorted by Code A to Z
    this.isSortedByProjCode_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Code Z to A
    this.isSortedByProjCode_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectCodeColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Name A to Z
    this.isSortedByProjName_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Name Z to A
    this.isSortedByProjName_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectNameColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Address A to Z
    this.isSortedByProjAddress_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectAddressColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Address Z to A
    this.isSortedByProjAddress_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectAddressColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Company A to Z
    this.isSortedByProjCompany_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectCompanyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Company Z to A
    this.isSortedByProjCompany_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectCompanyColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Status A to Z
    this.isSortedByProjStatus_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_A2Z(projectStatusColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Status Z to A
    this.isSortedByProjStatus_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnSorted_Z2A(projectStatusColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Updated Date A to Z
    this.isSortedByProjUpdateDate_A2Z = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_A2Z(projectUpdatedDateColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check the Project table is sorted by Updated Date Z to A
    this.isSortedByProjUpdateDate_Z2A = function(){
        var deferred = protractor.promise.defer();
        utilities.isColumnDateSorted_Z2A(projectUpdatedDateColumn()).then(function(isSorted){
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };
    
    //check all the headers of project table is present
    this.isProjectColumsDisplayed = function(){
        var deferred = protractor.promise.defer();
        projectCodeHeader().isDisplayed().then(function(imagePre){
            if(imagePre){
                projectNameHeader().isDisplayed().then(function(PDFPre){
                    if(PDFPre){
                        projectAddressHeader().isDisplayed().then(function(titlePre){
                            if(titlePre){
                                projectCompanyHeader().isDisplayed().then(function(lastPre){
                                    if(lastPre){
                                        projectStatusHeader().isDisplayed().then(function(byPre){
                                            if(byPre){
                                                projectUpdateDateHeader().isDisplayed().then(function(datePre){
                                                    deferred.fulfill(true);
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
    
}
module.exports = new projectPage();