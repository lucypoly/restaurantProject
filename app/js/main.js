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

function menuCollapse() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}



// window.onload = function () {
//     window.scrollTo(0,0);
// };

