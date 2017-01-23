(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pagination;
$(document).ready(function () {
    pagination = function () {
        var show_per_page = 5;
        var number_of_items = $('#content').children().not(':hidden').size();
        var number_of_pages = Math.ceil(number_of_items / show_per_page);

        //set the value of our hidden input fields
        $('#current_page').val(0);
        $('#show_per_page').val(show_per_page);


        var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
        var current_link = 0;

        if (number_of_pages > 10) {
            while (number_of_pages > current_link) {
                if ((current_link < number_of_pages/3) || (current_link > 2*number_of_pages/3)) {
                    navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
                }
                current_link++;
            }
        }
        else {
            while (number_of_pages > current_link) {
                navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
                current_link++;
            }
        }
        navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';


        $('#page_navigation').html(navigation_html);


        //add active_page class to the first page link
        $('#page_navigation .page_link:first').addClass('active_page');


        //hide all the elements inside content div
        $('#content').children().css('display', 'none');

        //and show the first n (show_per_page) elements
        if ($('#content').find('.toShow').length !== 0) {
            $('.toShow').slice(0, show_per_page).css('display', 'block');
        } else {
            $('#content').children().slice(0, show_per_page).css('display', 'block');
        }
    };

    pagination();

});

function previous() {

    new_page = parseInt($('#current_page').val()) - 1;

    //if there is an item before the current active link run the function
    if ($('.active_page').prev('.page_link').length == true) {
        go_to_page(new_page);
    }

}

function next() {
    new_page = parseInt($('#current_page').val()) + 1;

    //if there is an item after the current active link run the function
    if ($('.active_page').next('.page_link').length == true) {
        go_to_page(new_page);
    }

}
function go_to_page(page_num) {
    var show_per_page = parseInt($('#show_per_page').val());

    start_from = page_num * show_per_page;

    end_on = start_from + show_per_page;

    //hide all children elements of content div, get specific items and show them
    $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active_page class to it
     and remove that class from previously active page link*/
    $('.page_link[longdesc=' + page_num + ']').addClass('active_page').siblings('.active_page').removeClass('active_page');

    //update the current page input field
    $('#current_page').val(page_num);
}

},{}]},{},[1])