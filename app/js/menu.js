
function sortingEvent (comparisonParameter) {
    var $elements = [$('.menu-item-starter'), $('.menu-item-main'), $('.menu-item-dessert')];
    var $target = $('#starter, #main, #dessert');

    for (var i = 0; i < $elements.length; i++) {
        $elements[i].sort(function (a, b) {
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
        $elements[i].detach().appendTo($target[i]);
    }
}

$(document).ready(function () {
    $("#selected").click().children().removeClass('black').addClass('blue');
});


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
