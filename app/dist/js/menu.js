(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


//price sorting in the menu
function sortingEvent (comparisonParameter) {
    var elements = [$('.menu-item-starter'), $('.menu-item-main'), $('.menu-item-dessert')];
    var target = $('#starter, #main, #dessert');

    for (var i = 0; i < elements.length; i++) {
        elements[i].sort(function (a, b) {
            var an = $(a).find('span').text(),
                bn = $(b).find('span').text();

            if(comparisonParameter == '>') {
                if (+an > +bn) {
                    return -1;
                } else {
                    return 1;
                }
            } else if (comparisonParameter == '<'){
                if (+an < +bn) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
        elements[i].detach().appendTo(target[i]);
    }
}


//current tab is blue
$(document).ready(function () {
    $("#selected").click().children().removeClass('black').addClass('blue');
});


//tabs opened by displaying and hiding other content
function openMenu(evt, menuName) {
    var i, x, tabs;
    x = $(".menu");
    for (i = 0; i < x.length; i++) {
        $(x[i]).css('display', "none");
    }
    tabs = $(".menu-category");
    for (i = 0; i < x.length; i++) {
        $(tabs[i]).removeClass(" blue").addClass('black');
    }
    $("body").find('#' + menuName).css('display', 'block');
    $(evt.currentTarget).children().removeClass('black').addClass('blue');
}


//search by menu items in each tab
$(document).ready(function () {
    menuSearchEvent('menu-item-main');
    menuSearchEvent('menu-item-dessert');
    menuSearchEvent('menu-item-starter');

    function menuSearchEvent(menuItem) {
        $("#" + menuItem + "-search").keyup(function () {

            var filter = $(this).val(), count = 0;

            $("." + menuItem + " h1 b").each(function () {

                // If the list item does not contain the text phrase fade it out
                if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                    $(this).parent().parent().hide();

                } else {
                    $(this).parent().parent().show();
                    count++;
                }
            });
        });
    }
});


},{}]},{},[1])