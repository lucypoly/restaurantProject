(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var currentTable = {};
var allHours = [];
for (var k = 11; k < 24; k++) {
    allHours.push(k);
}
document.querySelectorAll('g')[2].addEventListener('click', function (event) {
    currentTable = booking[event.target.id];
    currentTable.name = event.target.id;
});
document.querySelector('#date').addEventListener('blur', function (e) {

    var selectedDate = e.target.value;
    if (Date.parse(new Date().toDateString()) > Date.parse(new Date(selectedDate).toDateString())) {
        document.getElementById('invalid-future').style.display = 'inline-block';
        document.getElementById('invalid-future').innerHTML = "Please, select a future date!";
        return;
    } else {
        document.getElementById('invalid-future').style.display = 'none';
    }


    if (currentTable.hasOwnProperty(selectedDate)) {
        var bookedHours = [];
        for (var key in currentTable[selectedDate]) {
            for (var i = currentTable[selectedDate][key].start; i < currentTable[selectedDate][key].end; i++) {
                bookedHours.push(+i);
            }
        }
        allHours = [];
        for (var k = 11; k < 24; k++) {
            allHours.push(k);
        }
        allHours = allHours.filter(function (el) {
            return bookedHours.indexOf(el) < 0;
        });
        var select = document.createDocumentFragment();
        var option = document.createElement('option');
        for (var j = 0; j < allHours.length; j++) {
            option.value = allHours[j];
            option.innerHTML = allHours[j];
            select.appendChild(option.cloneNode(true))
        }
        var myNode = document.querySelector('#start');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        myNode.appendChild(select);
    }
});

document.querySelector('#start').addEventListener('blur', function (event) {
        var select = document.createDocumentFragment();
        var option = document.createElement('option');
        var startHour = event.target.value;
        var i = 0;
        while (allHours[i + 1] - allHours[i] < 2) {
            i++;
        }
        var bookingEnd = i;

        allHours = allHours.filter(function (el, i) {
            return (el > +startHour) && i <= bookingEnd;
        });

        for (var j = 0; j < allHours.length; j++) {
            option.value = allHours[j];
            option.innerHTML = allHours[j];
            select.appendChild(option.cloneNode(true))
        }
        var myNode = document.querySelector('#end');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        myNode.appendChild(select);
    }
);
document.querySelector('#book').addEventListener('click', function (e) {
    e.preventDefault();
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
        $('.table').css('fill', 'darkcyan');
        $(evt.target).css('fill', 'gray');
    });
    $('#book').on('click', function () {
        $('.table').css('fill', 'darkcyan');
    });
});


function checkNumber(str) {
    var pattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/;
    if (!pattern.test(str)) {
        document.getElementById('invalid-number').style.display = 'inline-block';
        document.getElementById('invalid-number').innerHTML = "Please enter a valid phone number in format 0501234567";
    } else {
        document.getElementById('invalid-number').style.display = 'none';
    }
}

function checkName(str) {
    if (!str) {
        document.getElementById('invalid-name').style.display = 'inline-block';
        document.getElementById('invalid-name').innerHTML = "Please enter your name";
    } else {
        document.getElementById('invalid-name').style.display = 'none';
    }
}

function checkDate(str) {
    var pattern = /^((19|20)?[0-9]{2}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01]))*$/;
    if (!pattern.test(str)) {
        document.getElementById('invalid-date').style.display = 'inline-block';
        document.getElementById('invalid-date').innerHTML = "Please enter a valid date in format yyyy-mm-dd. ";
    } else {
        document.getElementById('invalid-date').style.display = 'none';
    }
}




},{}]},{},[1])