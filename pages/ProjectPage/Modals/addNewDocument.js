var addNewDocument = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------addNewDocument tab Elements-----------------------------------------------
    var browseBtn = function() {
        return element(by.id('files'));
    };

    var uploadBtn = function() {
        return element(by.ngClick('goStep2();'));
    };

    var closeBtn = function() {
        return element(ngClick('clearUploadForm()'));
    };

    var orderNo = function() {
        return element(by.id('orderNoTxtBox'));
    };

    var fileName = function() {
        return element(by.id('fileNameTxtBox'));
    };

    var industrySubject = function(type) {
        return element(by.id('professionName')).$('[label="' + type + '"]');
    };

    var docType = function(type) {
        return element(by.model('selectedDocumentType')).$('[label="' + type + '"]');
    };

    var selectedType = function() {
        return element(by.model('selectedDocumentType'));
    };

    var description = function() {
        return element(by.id('descriptionTxtBox'));
    };

    var devices = function(type) {
        return element(by.model('selDeviceTags')).$('[label="' + type + '"]');
    };

    var chapterTagDD = function() {
        return element.all(by.ngClick('toggleDropdown()')).get(1);
    };

    var chapterTags = function(tag) {
        return element.all(by.xpath('(//ul[@class="dropdown-menu dropdown-menu-form"])[2]/li[@ng-repeat="option in options | filter: searchFilter"]'));
    };

    var submittBtn = function() {
        return element(by.buttonText('Lagre'));
    };

    var closeButton = function() {
        return element(by.xpath('//form[@name="uploadfilesform"]/div[@class="modal-footer"]/button[@ng-click="clearUploadForm()"]'));
    };

    var roomNameDD = function() {
        return element.all(by.ngClick('toggleDropdown()')).get(0);
    };

    var roomnameSelect = function(room) {
        return element(by.xpath('(//ul[@class="dropdown-menu dropdown-menu-form"])[1]/li/a[contains(text(), "' + room + '") and @ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))"]'))
    };

    var roomNames = function(room) {
        return element.all(by.xpath('(//ul[@class="dropdown-menu dropdown-menu-form"])[1]/li/a[@ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))"]'));
    };

    var appartmentTagDD = function() {
        return element.all(by.ngClick('toggleDropdown()')).get(2);
    };

    var appartmentTags = function() {
        return element.all(by.xpath('(//ul[@class="dropdown-menu dropdown-menu-form"])[3]/li[@ng-repeat="option in options | filter: searchFilter"]'));
    };

    var appartmentTagSelect = function(tag) {
        return element(by.xpath('(//ul[@class="dropdown-menu dropdown-menu-form"])[3]/li[@ng-repeat="option in options | filter: searchFilter"]/a[contains(text(), "' + tag + '")]'));
    };

    var noOfFiles = function() {
        return element(by.xpath('//input[@ng-model="NoFiles"]'));
    };

    var pageNo = function() {
        return element(by.xpath('//div[@class="modal-footer"]/div[@class="text-center"]/label[@class="ng-binding"]'));
    };

    var firstPage = function() {
        return element(by.ngClick('moveFirstFile();'));
    };

    var lastPage = function() {
        return element(by.ngClick('moveLastFile();'));
    };

    var nextPage = function() {
        return element(by.ngClick('moveNextFile();'));
    };

    var previousPage = function() {
        return element(by.ngClick('movePreviousFile();'));
    };

    var docRemoveBtn = function() {
        return element(by.ngClick('removeFile();'));
    };

    var selectAllType = function() {
        return element(by.id('docTypeCheckBox'));
    };

    var selectAllChapterTags = function() {
        return element(by.id('chapterTagCheckBox'));
    };

    //-----------------------------------------------addNewDocument tab Controlles-----------------------------------------------

    //to close upload modal 
    this.closeModal = function() {
        closeButton().click();

        return require('../projDocumentTab.js');
    };

    //remove a file in multiple file upload modal
    this.removeFile = function() {
        docRemoveBtn().click();
    };

    //go To Next Page in multiple file upload
    this.goToNextPage = function() {
        nextPage().click();
    };

    //go To Previous Page in multiple file upload
    this.goToPreviousPage = function() {
        previousPage().click();
    };

    //go To Last Page in multiple file upload
    this.goToLastPage = function() {
        lastPage().click();
    };

    //go To First Page in multiple file upload
    this.goToFirstPage = function() {
        firstPage().click();
    };

    //to check if in the correct page
    this.isInCorrectPage = function() {
        var deferred = protractor.promise.defer();
        pageNo().getText().then(function(txt) {
            deferred.fulfill(txt.trim());
        });
        return deferred.promise;
    };

    //to enter mandotory fields for multiple file upload
    this.enterMandorotyForMulFiles = function(docName, docTyp, docTag) {
        utilities.enterText(fileName(), docName);
        docType(docTyp).click();
        chapterTagDD().click();
        chapterTags().get(docTag).click();
        chapterTagDD().click();
        selectAllType().click();
        selectAllChapterTags().click();
    };

    //to check mandotory fields are selected for each document
    this.isMandotoryAddedForEach = function(docName) {
        var deferred = protractor.promise.defer();
        var arr = [];
        nextPage().click();
        utilities.enterText(fileName(), docName);
        selectedType().getAttribute('value').then(function(type) {
            arr.push(type.trim());
            chapterTagDD().getText().then(function(tag) {
                arr.push(tag.trim());
                deferred.fulfill(arr);
            });
        });
        return deferred.promise;
    };

    //to upload a document with mandatory fields
    this.uploadWithMandatory = function(docPath, docName, docTyp, docTag) {
        this.uploadFile(docPath);
        utilities.enterText(fileName(), docName);
        docType(docTyp).click();
        chapterTagDD().click();
        chapterTags().get(docTag).click();
        submittBtn().click();
    };

    //to upload a document with all fields
    this.uploadWithOptional = function(docPath, oNo, docName, inSuj, docTyp, desc, unit, room, docTag, tag) {
        this.uploadFile(docPath);
        utilities.enterText(orderNo(), oNo);
        utilities.enterText(fileName(), docName);
        industrySubject(inSuj).click();
        docType(docTyp).click();
        utilities.enterText(description(), desc);
        devices(unit).click();
        roomNameDD().click();
        roomnameSelect(room).click();
        roomNameDD().click();
        chapterTagDD().click();
        chapterTags().get(docTag).click();
        chapterTagDD().click();
        appartmentTagDD().click();
        appartmentTagSelect(tag).click();
        appartmentTagDD().click();
        submittBtn().click();
    };

    //to check document path field validation
    this.validateDocPath = function() {
        var deferred = protractor.promise.defer();
        uploadBtn().getAttribute('disabled').then(function(isDis) {
            deferred.fulfill(isDis);
        });
        return deferred.promise;
    };
    
    //to click file upload
    this.clickFileUploadBtn = function(){
        submittBtn().click();
    };

    //to check file name field validation
    this.validateFileName = function() {
        var deferred = protractor.promise.defer();
        utilities.clearText(fileName());
        submittBtn().click().then(function() {
            orderNo().isDisplayed().then(function(isDis) {
                deferred.fulfill(isDis);
            });
        });
        return deferred.promise;
    };

    //to check file type field validation
    this.validateFileType = function(name) {
        var deferred = protractor.promise.defer();
        utilities.enterText(fileName(), name);
        submittBtn().click().then(function() {
            orderNo().isDisplayed().then(function(isDis) {
                deferred.fulfill(isDis);
            });
        });
        return deferred.promise;
    };

    //to check chapter tag field validation
    this.validateChapTag = function(docTyp) {
        var deferred = protractor.promise.defer();
        //docType(docTyp).click();
        submittBtn().click().then(function() {
            orderNo().isDisplayed().then(function(isDis) {
                deferred.fulfill(isDis);
            });
        });
        return deferred.promise;
    };

    //to select files to upload
    this.selectFiles = function(docPath) {
        browseBtn().sendKeys(docPath);
    };

    //to click upload button
    this.clickUpload = function() {
        uploadBtn().click();
    };

    //to check the number of documents
    this.isSelectedDocNoCorrect = function() {
        var deferred = protractor.promise.defer();
        noOfFiles().getAttribute('value').then(function(docNo) {
            console.log(docNo);
            deferred.fulfill(docNo);
        });
        return deferred.promise;
    };

    //get yhe file upload modal
    this.uploadFile = function(docPath) {
        browseBtn().sendKeys(docPath);
        uploadBtn().click();
    };

    //check if the room names are correct
    this.validateNoOfRooms = function() {
        var deferred = protractor.promise.defer();
        roomNameDD().click();
        roomNames().count().then(function(roomNo) {
            deferred.fulfill(roomNo);
        });
        roomNameDD().click();
        return deferred.promise;
    };

    //check if the number of rooms are correct
    this.vailateRoomNames = function() {
        var deferred = protractor.promise.defer();
        roomNameDD().click();
        roomNames().getInnerHtml().then(function(txt) {
            console.log(txt);
            deferred.fulfill(txt);
        });
        roomNameDD().click();
        return deferred.promise;
    };

    //check if the Apartment tag names are correct
    this.validateNoOfApaTags = function() {
        var deferred = protractor.promise.defer();
        appartmentTagDD().click();
        appartmentTags().count().then(function(roomNo) {
            deferred.fulfill(roomNo);
        });
        appartmentTagDD().click();
        return deferred.promise;
    };

    //check if the number of Apartment tags are correct
    this.vailateApaTagNames = function() {
        var deferred = protractor.promise.defer();
        appartmentTagDD().click();
        appartmentTags().getInnerHtml().then(function(txt) {
            console.log(txt);
            deferred.fulfill(txt);
        });
        appartmentTagDD().click();
        return deferred.promise;
    };

    //check if the number of apartment tags are correct
    this.vailateApaTags = function() {
        var deferred = protractor.promise.defer();
        appartmentTags().count().then(function(apaTags) {
            deferred.fulfill(apaTags);
        });
        return deferred.promise;
    };



}
module.exports = new addNewDocument();