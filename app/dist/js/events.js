(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

//toggle deatailed info on event page
$(document).ready(function () {
    $('.main-info').on('click', function () {
        $(this).siblings('.details').toggle();
    });
    $('.details:first').css('display', 'flex')
});

//filtering events by click on the input with such id and hiding others
$(document).ready(function () {
    function filtrationEvent(inputId, elementClass) {
        $('input#' + inputId).on('click', function () {
            $('div.event-item').not('.' + elementClass).hide();
            $('div.event-item').not('.' + elementClass).removeClass('toShow');
            $('div.event-item.' + elementClass).show();
            $('div.event-item.' + elementClass).addClass('toShow');
            pagination();
        });
    }

    filtrationEvent('music', 'Music');
    filtrationEvent('food', 'Food');
    filtrationEvent('disco', 'Disco');
    filtrationEvent('games', 'Games');

    $('input#all').on('click', function () {
        $('div.event-item').removeClass('toShow');
        $('div.event-item').show();
        pagination();
    });
});
},{}]},{},[1])