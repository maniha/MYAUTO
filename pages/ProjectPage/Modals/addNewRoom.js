var addNewRoom = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------AddNewRoom Form Elememts-----------------------------------------------

    var roomType = function() {
        return element(by.id('dropdownMenu1'));
    };

    var roomName = function() {
        return element(by.id('RoomName'));
    };

    var roomDescription = function() {
        return element(by.id('RoomDescription'));
    };

    var addRoomBtn = function() {
        return element(by.xpath("//form[@name='addProjectPropertyUnitForm']/div[@class='modal-footer']/button[@type='submit']"));
    };
    
    var cancelBtn = function() {
        return element(by.ngClick(' clearForm();'));
    };

    var roomTypeRow = function(roomType) {
        return element(by.xpath('//ul/li[@data-nodeid="'+ roomType +'"]'));
    };

    var addRoomHeader = function() {
        return element(by.cssContainingText('.modal-title', 'Nytt rom'));
    };

    //-----------------------------------------------AddNewRoom Form Controllers-----------------------------------------------

    this.addRoomWithMandotory = function(Name, Type) {
        //roomType().click();
        roomTypeRow(Type).click();
        utilities.enterText(roomName(), Name);
        addRoomBtn().click();
        browser.driver.sleep(1000);
    };

    this.addRoomWithoptional = function(Type, Name, roomDesc) {
        //roomType().click();
        roomTypeRow(Type).click();
        utilities.enterText(roomName(), Name);
        utilities.enterText(roomDescription(), roomDesc);
        addRoomBtn().click();
        browser.driver.sleep(1000);
    };

    this.validateRoomName = function() {
        var deferred = protractor.promise.defer();
        addRoomBtn().click().then(function() {
            addRoomHeader().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };

    this.validateRoomType = function(Name) {
        var deferred = protractor.promise.defer();
        utilities.enterText(roomName(), Name);
        addRoomBtn().click().then(function() {
            addRoomHeader().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };

    this.closeForm = function() {
        cancelBtn().click();
    };

}
module.exports = new addNewRoom();