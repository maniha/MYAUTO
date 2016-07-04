var addNewDevice = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------addNewDevice modal elements-----------------------------------------------

    var deviceName = function() {
        return element(by.model('device.DeviceName'));
    };

    var deviceDesc = function() {
        return element(by.model('device.DeviceDescription'));
    };

    var deviceType = function(type) {
        return element(by.model('device.DeviceTypeId')).$('[label="' + type + '"]');
    };

    var manufactureName = function() {
        return element(by.model('device.ManufactureName'));
    };

    var codeType = function(type) {
        return element(by.model('device.ProductCodeType')).$('[value="' + type + '"]');
    };

    var productCode = function() {
        return element(by.model('device.ProductCode'));
    };

    var gtinNumber = function() {
        return element(by.model('device.LifeExpectancy'));
    };

    var lifeExpectancy = function() {
        return element(by.model('device.LifeExpectancy'));
    };

    var warrantyDuration = function() {
        return element(by.model('device.WarrantyDuration'));
    };

    var buildingElementId = function(type) {
        return element(by.model('device.BuildingElementId')).$('[label="' + type + '"]');
    };

    var installationYear = function(type) {
        return element(by.model('device.InstallationYear')).$('[value="' + type + '"]');
    };

    var roomId = function(type) {
        return element(by.model('device.RoomId')).$('[label="' + type + '"]');
    };

    var manual = function() {
        return element(by.model('UserManual'));
    };

    var submitNewDeviceBtn = function() {
        return element(by.css('.btn.btn-primary.btn-default'));
    };

    var cancelBtn = function() {
        return element(by.ngClick('clearAddDeviceModal()'));
    };
    
    //-----------------------------------------------addNewDevice modal elements-----------------------------------------------

    this.addDeviceWithMandotory = function(Name, Type) {
        utilities.enterText(deviceName(), Name);
        deviceType(Type).click();
        submitNewDeviceBtn().click();
        //browser.driver.sleep(1000);
    };

    this.addDeviceWithOptional = function(Name, desc, deviceTyp, manufacture, codeTyp, productCod, gtinNumbe, lifeExpectanc, warrantyDuratio, buildingElementI, installationYea, roomI, filePath) {
        utilities.enterText(deviceName(), Name);
        utilities.enterText(deviceDesc(), desc);
        deviceType(deviceTyp).click();
        utilities.enterText(manufactureName(), manufacture);
        codeType(codeTyp).click();
        utilities.enterText(productCode(), productCod);
        //utilities.enterText(gtinNumber(), gtinNumbe);
        utilities.enterText(lifeExpectancy(), lifeExpectanc);
        utilities.enterText(warrantyDuration(), warrantyDuratio);
        buildingElementId(buildingElementI).click();
        installationYear(installationYea).click();
        roomId(roomI).click();
        manual().sendKeys(filePath);
        submitNewDeviceBtn().click();
        //browser.driver.sleep(1000);
    };

    this.validateDeviceName = function() {
        var deferred = protractor.promise.defer();
        submitNewDeviceBtn().click().then(function() {
            deviceName().isDisplayed().then(function(isPre) {
                deferred.fulfill(isPre);
                console.log(isPre);
            });
        });
        return deferred.promise;
    };

    this.validateDeviceType = function(Name) {
        var deferred = protractor.promise.defer();
        utilities.enterText(deviceName(), Name);
        submitNewDeviceBtn().click().then(function() {
            deviceName().isDisplayed().then(function(isPre) {
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
module.exports = new addNewDevice();