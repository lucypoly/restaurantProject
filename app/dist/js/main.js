(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function () {
    $('.main-info').on('click', function (evt) {
        $(this).siblings('.details').toggle();
    });
    $('.details:first').css('display', 'flex')
});


$(document).ready(function () {
    var current = location.pathname.split('/');
    current = current[current.length - 1].split('.');
    var id = current[0];
    $('#' + id).addClass('highlight_stay');
});


$(document).ready(function () {
    $('input#music').on('click', function () {
        $('div.event-item').not('.Music').hide();
        $('div.event-item').not('.Music').removeClass('toShow');
        $('div.event-item.Music').show();
        $('div.event-item.Music').addClass('toShow');
        pagination();
    });
    $('input#food').on('click', function () {
        $('div.event-item').not('.Food').hide();
        $('div.event-item').not('.Food').removeClass('toShow');
        $('div.event-item.Food').show();
        $('div.event-item.Food').addClass('toShow');
        pagination();
    });
    $('input#disco').on('click', function () {
        $('div.event-item').not('.Disco').hide();
        $('div.event-item').not('.Disco').removeClass('toShow');
        $('div.event-item.Disco').show();
        $('div.event-item.Disco').addClass('toShow');
        pagination();
    });
    $('input#games').on('click', function () {
        $('div.event-item').not('.Games').hide();
        $('div.event-item').not('.Games').removeClass('toShow');
        $('div.event-item.Games').show();
        $('div.event-item.Games').addClass('toShow');
        pagination();
    });
    $('input#all').on('click', function () {
        $('div.event-item').removeClass('toShow');
        $('div.event-item').show();
        pagination();
    });
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


},{}]},{},[1])