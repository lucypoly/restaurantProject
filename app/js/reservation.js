'use strict';

var booking = JSON.parse(localStorage.getItem('booking')) || {
        table1: {},
        table2: {},
        table3: {},
        table4: {},
        table5: {},
        table6: {},
        table7: {},
        table8: {},
        table9: {},
        table10: {},
        table11: {},
        table12: {}
    };

//
var currentTable = {};
var availableHours = [];


document.querySelectorAll('g')[2].addEventListener('click', function (event) {
    currentTable = booking[event.target.id];
    currentTable.name = event.target.id;
    availableHours = [];
    for (var k = 11; k <= 24; k++) {
        availableHours.push(k);
    }
    if (document.querySelector('#date').value) {
        checkStartTime(document.querySelector('#date').value);
    }
});


/**
 * fill hours into select field
 * @param hours - array of hours
 * @param selector - selector of <select> field to fill
 */
function fillHours(hours, selector) {
    var select = document.createDocumentFragment();
    var option = document.createElement('option');
    for (var j = 0; j < hours.length; j++) {
        option.value = hours[j];
        option.innerHTML = hours[j];
        select.appendChild(option.cloneNode(true))
    }
    var myNode = document.querySelector(selector);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    myNode.appendChild(select);
}


/**
 * check what time reservation could be started at
 * @param date - string date
 */
function checkStartTime(date) {
    var startHours = [];

// if @param date is past
    if (Date.parse(new Date().toDateString()) > Date.parse(new Date(date).toDateString())) {
        document.getElementById('invalid-future').style.display = 'inline-block';
        document.getElementById('invalid-future').innerHTML = "Please, select a future date!";
        return;
    } else {
        document.getElementById('invalid-future').style.display = 'none';
    }

    // if current day has booked hours
    if (currentTable.hasOwnProperty(date)) {
        var bookedHours = [];
        for (var key in currentTable[date]) {
            for (var i = +currentTable[date][key].start; i < +currentTable[date][key].end; i++) {
                bookedHours.push(i);
            }
        }

        availableHours = availableHours.filter(function (el) {
            return bookedHours.indexOf(el) < 0;
        });
        startHours = availableHours.slice();
        if (availableHours.indexOf(24) > -1) {
            startHours.splice(startHours.indexOf(24), 1);
        }

        // if current day doesn't have bookings yet
    } else {
        startHours = availableHours.slice();
        startHours.pop();
    }

    fillHours(startHours, '#start');

    //if no available hours another hour should be selected

    if (startHours.length == 0) {
        document.getElementById('invalid-table').style.display = 'inline-block';
        document.getElementById('invalid-table').innerHTML = "This table is not available! Please select another one!";
    } else {
        document.getElementById('invalid-table').style.display = 'none';
    }
}


document.querySelector('#date').addEventListener('blur', function () {
    checkStartTime(document.querySelector('#date').value);
});


document.querySelector('#start').addEventListener('blur', function (event) {

        var startHour = +event.target.value;
        var bookingEndIndex = availableHours.indexOf(startHour);

        //check if there is a gap before next booking
        while (availableHours[bookingEndIndex + 1] - availableHours[bookingEndIndex] < 2) {
            bookingEndIndex++;
        }

        // fill for end hours that are after the start time, but not after next booking
        var endHours = availableHours.filter(function (el, k) {
            return (el > +startHour) && k <= bookingEndIndex;
        });

        //if the table is full
        if (endHours.length == 0) {
            document.getElementById('invalid-table').style.display = 'inline-block';
            document.getElementById('invalid-table').innerHTML = "Please, select time earlier or later";
        } else {
            document.getElementById('invalid-table').style.display = 'none';
        }

        fillHours(endHours, '#end');
    }
);


document.querySelector('#book').addEventListener('click', function (e) {

    //do only if form is valid
    e.preventDefault();
    if (!checkName(document.querySelector('#name').value) || !checkNumber(document.querySelector('#number').value) || !checkDate(document.querySelector('#date').value)) return;

    if (!currentTable.name) {
        document.getElementById('invalid-table').style.display = 'inline-block';
        document.getElementById('invalid-table').innerHTML = "Please select a table";
        return;
    } else {
        document.getElementById('invalid-table').style.display = 'none';
    }


    var currentBooking = {
        name: document.querySelector('#name').value,
        number: document.querySelector('#number').value,
        start: document.querySelector('#start').options[document.querySelector('#start').selectedIndex].text,
        end: document.querySelector('#end').options[document.querySelector('#end').selectedIndex].text
    };


    //check if there are another bookings for this date for this table
    if (booking[currentTable.name][document.querySelector('#date').value]) {
        booking[currentTable.name][document.querySelector('#date').value].push(currentBooking);
    } else {
        booking[currentTable.name][document.querySelector('#date').value] = [];
        booking[currentTable.name][document.querySelector('#date').value].push(currentBooking);
    }

    localStorage.setItem('booking', JSON.stringify(booking));

    //the end of the process of booking
    PopUpShow();
    $('.table').css('fill', '#004d4d');
    document.getElementById("reservationForm").reset();
});


//validation
function checkNumber(str) {
    var pattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/;
    if (!pattern.test(str)) {
        document.getElementById('invalid-number').style.display = 'inline-block';
        document.getElementById('invalid-number').innerHTML = "Please enter a valid phone number in format 0501234567";
        return false;
    } else {
        document.getElementById('invalid-number').style.display = 'none';
        return true;
    }
}

function checkName(str) {
    if (!str) {
        document.getElementById('invalid-name').style.display = 'inline-block';
        document.getElementById('invalid-name').innerHTML = "Please enter your name";
        return false;
    } else {
        document.getElementById('invalid-name').style.display = 'none';
        return true;
    }
}

function checkDate(str) {
    var pattern = /^((19|20)?[0-9]{2}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01]))*$/;
    if (!pattern.test(str)) {
        document.getElementById('invalid-date').style.display = 'inline-block';
        document.getElementById('invalid-date').innerHTML = "Please enter a valid date in format yyyy-mm-dd. ";
        return false;
    } else {
        document.getElementById('invalid-date').style.display = 'none';
        return true;
    }
}

//table cleaning
$(document).ready(function () {
    PopUpHide();
    $('.table').on('click', function (evt) {
        $('.table').css('fill', '#004d4d');
        $(evt.target).css('fill', 'gray');
        $('input[type="date"]').prop("disabled", false);

    });
});

//popup
function PopUpShow() {
    $("#popup1").show();
}
function PopUpHide() {
    $("#popup1").hide();
}



