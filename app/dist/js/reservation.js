(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function checkStartTime(date) {
    var startHours = [];

    if (startHours.length == 0){
        document.getElementById('invalid-table').style.display = 'inline-block';
        document.getElementById('invalid-table').innerHTML = "This table is not available! Please select another one!";
    } else {
        document.getElementById('invalid-table').style.display = 'none';
    }

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
    } else {
        startHours = availableHours.slice();
        startHours.pop();
    }
    fillHours(startHours, '#start');
}


document.querySelector('#date').addEventListener('blur', function () {
    checkStartTime(document.querySelector('#date').value);
});


document.querySelector('#start').addEventListener('blur', function (event) {

        var startHour = +event.target.value;
        var bookingEnd = availableHours.indexOf(startHour);
        while (availableHours[bookingEnd + 1] - availableHours[bookingEnd] < 2) {
            bookingEnd++;
        }

        var endHours = availableHours.filter(function (el, k) {
            return (el > +startHour) && k <= bookingEnd;
        });

        fillHours(endHours, '#end');
    }
);


document.querySelector('#book').addEventListener('click', function (e) {

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


    if (booking[currentTable.name][document.querySelector('#date').value]) {
        booking[currentTable.name][document.querySelector('#date').value].push(currentBooking);
    } else {
        booking[currentTable.name][document.querySelector('#date').value] = [];
        booking[currentTable.name][document.querySelector('#date').value].push(currentBooking);
    }

    localStorage.setItem('booking', JSON.stringify(booking));
    alert('success');
    window.location.reload();
});


$(document).ready(function () {
    $('.table').on('click', function (evt) {
        $('.table').css('fill', '#004d4d');
        $(evt.target).css('fill', 'gray');
        $('input[type="date"]').prop("disabled", false);

    });
    // $('#book').on('click', function () {
    //     $('.table').css('fill', '#004d4d');
    // });
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




},{}]},{},[1])