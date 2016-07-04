var utilities = function() {

    //fill a textBox
    this.enterText = function(txtBox, text) {
        txtBox.clear();
        txtBox.sendKeys(text);
    };

    //clear a textbox
    this.clearText = function(textBox) {
        textBox.clear();
    };

    //to check a table column is sorted A-Z
    this.isColumnSorted_A2Z = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(txt.trim().toLowerCase());
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData = sortedcolumnData.sort();
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check a table column is sorted Z-A
    this.isColumnSorted_Z2A = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(txt.trim().toLowerCase());
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData.sort();
            sortedcolumnData.reverse();
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check a table column is sorted A-Z by Date
    this.isColumnDateSorted_A2Z = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(txt.trim().toLowerCase());
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData.sort(function(a, b) {
                var a1 = a.split('.');
                var b1 = b.split('.');
                return new Date(a1[2], a1[1], a1[0]).getTime() - new Date(b1[2], b1[1], b1[0]).getTime();
            });
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check a table column is sorted Z-A by Date
    this.isColumnDateSorted_Z2A = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(txt.trim().toLowerCase());
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData.sort(function(a, b) {
                var a1 = a.split('.');
                var b1 = b.split('.');
                return new Date(a1[2], a1[1], a1[0]).getTime() - new Date(b1[2], b1[1], b1[0]).getTime();
            });
            sortedcolumnData.reverse();
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check a table column is sorted A-Z Number wise
    this.isColumnNumberSorted_A2Z = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(Number(txt.trim().toLowerCase()));
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData = sortedcolumnData.sort(function(a, b) { return a - b });
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check a table column is sorted Z-A Number wise
    this.isColumnNumberSorted_Z2A = function(column) {
        var deferred = protractor.promise.defer();
        column.then(function(data) {
            var columnData = [];
            for (var i = 0; i < data.length; i++) {
                data[i].getText().then(function(txt) {
                    columnData.push(Number(txt.trim().toLowerCase()));
                });
            };
            return columnData;
        }).then(function(columnData) {
            var sortedcolumnData = columnData.slice();
            sortedcolumnData.sort(function(a, b) { return b - a });
            var isSorted = arraysEqual(columnData, sortedcolumnData);
            deferred.fulfill(isSorted);
        });
        return deferred.promise;
    };

    //to check the number of rows in a table is correct (for tables containing more than 20 rows)
    this.isLargeRowNumberCorrect = function(allRows, selectedPage, table, rowsPerpage) {
        var deferred = protractor.promise.defer();
        //console.log(rows);
        var numberOfPages = Math.ceil(allRows / rowsPerpage);
        var lastPageRows = allRows % rowsPerpage;
        if (lastPageRows == 0) { lastPageRows = rowsPerpage; };
        selectedPage.getText().then(function(page) {
            console.log(page);
            console.log(numberOfPages);
            if (numberOfPages == page) {
                table.then(function(table) {
                    console.log(table.length)
                    //browser.pause();
                    if (lastPageRows == table.length) {
                        console.log(table.length)
                        deferred.fulfill(true);
                    }
                    else {
                        console.log('--1')
                        deferred.fulfill(false);
                    }
                });
            }
            else {
                console.log('--2')
                deferred.fulfill(false);
            }
        });
        return deferred.promise;
    };

    //to check the number of rows in a table is correct (for tables containing less than 20 rows)
    this.isLessRowNumberCorrect = function(allRows, table) {
        var deferred = protractor.promise.defer();
        table.then(function(table) {
            if (allRows == table.length) {
                deferred.fulfill(true);
            }
            else {
                deferred.fulfill(false);
            }
        });
        return deferred.promise;
    };

    //to get all table rows to an array
    this.tableAllToArray = function(noOfRows, repeater, nextPage, tag, rowsPerpage) {
        var deferred = protractor.promise.defer();
        noOfRows.getText().then(function(rows) {
            var pageNo = Math.ceil(rows / rowsPerpage);
            var rowContent = [];
            var j = 0;
            do {
                j++;
                var table = element.all(by.repeater(repeater));
                table.then(function(table) {
                    for (var i = 0; i < table.length; i++) {
                        var tableRow = element.all(by.repeater(repeater)).get(i).all(by.tagName(tag));
                        tableRow.getInnerHtml().then(function(txt) {
                            rowContent.push(txt);
                        });
                    }
                })
                if (pageNo > 1) { nextPage.click(); }
            } while (j < pageNo)
            return rowContent;
        }).then(function(rowContent) {
            deferred.fulfill(rowContent);
        });
        return deferred.promise;
    };

    //to get a selected attribute of all the rows of a table to an array
    this.tableAllAttributeToArray = function(noOfRows, repeater, nextPage, attribute, rowsPerpage) {
        var deferred = protractor.promise.defer();
        noOfRows.getText().then(function(rows) {
            var pageNo = Math.ceil(rows / rowsPerpage);
            var rowContent = [];
            var j = 0;
            do {
                j++;
                var table = element.all(by.repeater(repeater));
                table.then(function(table) {
                    for (var i = 0; i < table.length; i++) {
                        var tableRow = element.all(by.repeater(repeater)).get(i);
                        tableRow.getAttribute(attribute).then(function(txt) {
                            rowContent.push(txt);
                        });
                    }
                })
                if (pageNo > 1) { nextPage.click(); }
            } while (j < pageNo)
            return rowContent;
        }).then(function(rowContent) {
            deferred.fulfill(rowContent);
        });
        return deferred.promise;
    };

    //to get innerHTML of selected elements to an array
    this.elemetAllToArrayInnerHTML = function(elements) {
        var deferred = protractor.promise.defer();
        var rowContent = [];
        elements.then(function(ele) {
            for (var i = 0; i < ele.length; i++) {
                var tableRow = ele[i];
                tableRow.getInnerHtml().then(function(txt) {
                    rowContent.push(txt);
                });
            };
            deferred.fulfill(rowContent);
        });
        return deferred.promise;
    };

    //to get all table rows to an array
    this.chapterTagsToArray = function(noOfRows, bubbleCss, nextPage, tag, rowsPerpage) {
        var deferred = protractor.promise.defer();
        noOfRows.getText().then(function(rows) {
            var pageNo = Math.ceil(rows / rowsPerpage);
            var rowContent = [];
            var j = 0;
            do {
                j++;
                var table = element.all(by.css(bubbleCss));
                table.then(function(table) {
                    for (var i = 0; i < table.length; i++) {
                        var tableRow = element.all(by.css(bubbleCss)).get(i).all(by.tagName(tag));
                        tableRow.getInnerHtml().then(function(txt) {
                            console.log(txt);
                            rowContent.push(txt);
                        });
                    }
                })
                if (pageNo > 1) { nextPage.click(); }
            } while (j < pageNo)
            return rowContent;
        }).then(function(rowContent) {
            deferred.fulfill(rowContent);
        });
        return deferred.promise;
    };

    //check if no data found for search
    this.isNoSearchResultsDisplayed = function(noDataText, table) {
        var deferred = protractor.promise.defer();
        noDataText.isDisplayed().then(function(isPresent) {
            if (isPresent) {
                table.then(function(table) {
                    if (table.length == 0) {
                        deferred.fulfill(true);
                    }
                    else { deferred.fulfill(false) };
                })
            }
            else { deferred.fulfill(false) };
        });
        return deferred.promise;
    };

    //to check two arrays are similar 
    var arraysEqual = function(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    };



}
module.exports = new utilities();