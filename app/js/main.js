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

