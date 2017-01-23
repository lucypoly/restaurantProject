
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