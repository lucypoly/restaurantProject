(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function () {
    $('#galleryPage').click(function (event) {
        var src = $(event.target).attr('src');

        //window opened in current position of the user
        var position = $(window).scrollTop();
        var width = $( window ).width();

        //added current img to the modal window by path
        $('#imgModal').html('<img src="' + src + '"/>');
        $('#imgModal').css('display', 'block');
        event.preventDefault();

        //modal window displayed at the current position
        $('#overlay').css('display', 'block');
        $('#modal_form').css({opacity: 1, display: 'block', top: position,'max-width': width});
    });

    //closing modal window
    $('#modal_close, #overlay').click(function () {
        $('#modal_form').css('display', 'none');
        $('#overlay').css('display', 'none');
        $('#imgModal').css('display', 'none');
    });
});
},{}]},{},[1])