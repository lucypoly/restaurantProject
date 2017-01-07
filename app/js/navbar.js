$(document).ready(function () {
    var current = location.pathname.split('/');
    current = current[current.length-1].split('.');
    var id = current[0];
    $('#' + id).addClass('highlight_stay');
});