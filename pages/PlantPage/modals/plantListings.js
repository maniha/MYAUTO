var plantListings = function() {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Modal elements-----------------------------------------------
    var buildingSelectButtonByNumber = function(number) {
        return element(by.xpath("//span[contains(text(),'" + number + "')]/../../div[3]/button"));
    };

    var propertySelectButtonByOwner = function(owner) {
        return element(by.xpath("//span[contains(text(),'" + owner + "')]/../../div[3]/button"));
    };

    //-----------------------------------------------Modal controllers-----------------------------------------------
    
    //to go to a building plant
    this.goToBuilding = function(number) {
        buildingSelectButtonByNumber(number).click();
        
        return require('./plantDataModal.js');
    };
    
    //to go to property plant
    this.goToPlant = function(owner) {
        propertySelectButtonByOwner(owner).click();
        
        return require('./plantDataModal.js');
    };
}
module.exports = new plantListings();