var path = require('path');

var pathHelper = function(){
    
    this.screenshotPathBuilder = function(spec, descriptions, results, capabilities){
        var monthMap = {
              "1": "Jan",
              "2": "Feb",
              "3": "Mar",
              "4": "Apr",
              "5": "May",
              "6": "Jun",
              "7": "Jul",
              "8": "Aug",
              "9": "Sep",
              "10": "Oct",
              "11": "Nov",
              "12": "Dec"
            };
            
        var currentDate = new Date(),
            //currentHoursIn24Hour = currentDate.getHours(),
            //currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
            totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900);

        return totalDateString;   
    }
    
}
module.exports = new pathHelper();