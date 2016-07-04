var plantDataModal = function () {

    //-----------------------------------------------helpers-----------------------------------------------
    var utilities = require('../../../helper/utilities.js');

    //-----------------------------------------------Modal elements-----------------------------------------------

    var errorPlantAlreadyExist = function () {
        return element(by.xpath('//div[@class="alert alert-danger ng-binding" and @ng-show="selectedProperty.isPlantAlreadyCreated" and @role="alert"]'))
    };

    var boligmappaNo = function () {
        return element.all(by.binding('selectedProperty.BoligmappaNumber')).first();
    };

    var StreetAddress = function () {
        return element.all(by.binding('selectedProperty.StreetAddress')).last();
    };

    var MatrikkelKnr = function () {
        return element.all(by.binding('selectedProperty.Matrikkel.Knr')).last();
    };

    var MatrikkelGnr = function () {
        return element.all(by.binding('selectedProperty.Matrikkel.Gnr')).last();
    };

    var MatrikkelBnr = function () {
        return element.all(by.binding('selectedProperty.Matrikkel.Bnr')).last();
    };

    var MatrikkelFnr = function () {
        return element.all(by.binding('selectedProperty.Matrikkel.Fnr')).last();
    };

    var MatrikkelSnr = function () {
        return element.all(by.binding('selectedProperty.Matrikkel.Snr')).last();
    };

    var ShareNumber = function () {
        return element.all(by.binding('selectedProperty.ShareNumber')).last();
    };

    var UnitNumber = function () {
        return element.all(by.binding('selectedProperty.UnitNumber')).last();
    };

    var PropertyType = function () {
        return element.all(by.binding('selectedProperty.PropertyType')).last();
    };

    var MainBuildingNumber = function () {
        return element.all(by.binding('selectedProperty.MainBuildingNumber')).last();
    };

    var Longitude = function () {
        return element.all(by.binding('selectedProperty.Longitude')).last();
    };

    var Latitude = function () {
        return element.all(by.binding('selectedProperty.Latitude')).last();
    };

    var closeBtn = function () {
        return element(by.xpath('//button[@class="btn btn-default"]'));
    };

    //-----------------------------------------------Modal controllers-----------------------------------------------

    this.getBoligmappaNo = function (boliNo, sAddre, knr, shaNo, uNo, pType, mNo, longi, lati) {
        var deferred = protractor.promise.defer();
        boligmappaNo().getText().then(function (txt) {
            if (txt == boliNo) {
                console.log(txt);
                StreetAddress().getText().then(function (txt) {
                    if (txt == sAddre) {
                        console.log(txt);
                        MatrikkelKnr().getText().then(function (txt) {
                            if (txt == knr) {
                                console.log(txt);
                                ShareNumber().getText().then(function (txt) {
                                    if (txt.trim() == shaNo) {
                                        console.log(txt);
                                        UnitNumber().getText().then(function (txt) {
                                            if (txt == uNo) {
                                                console.log(txt);
                                                PropertyType().getText().then(function (txt) {
                                                    if (txt == pType) {
                                                        console.log(txt);
                                                        MainBuildingNumber().getText().then(function (txt) {
                                                            if (txt == mNo) {
                                                                console.log(txt);
                                                                Longitude().getText().then(function (txt) {
                                                                    if (txt == longi) {
                                                                        deferred.fulfill(true);
                                                                    } else { deferred.fulfill(false); }
                                                                });
                                                            } else { deferred.fulfill(false); }
                                                        });
                                                    } else { deferred.fulfill(false); }
                                                });
                                            } else { deferred.fulfill(false); }
                                        });
                                    } else { deferred.fulfill(false); }
                                });
                            } else { deferred.fulfill(false); }
                        });
                    } else { deferred.fulfill(false); }
                });
            } else { deferred.fulfill(false); }
        });
        closeBtn().click();
        return deferred.promise;
    };
    
    
}
module.exports = new plantDataModal();