
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


$(document).ready(function () {
    menuSearchEvent('menu-item-main');
    menuSearchEvent('menu-item-dessert');
    menuSearchEvent('menu-item-starter');

    function menuSearchEvent(menuItem) {
        $("#" + menuItem + "-search").keyup(function () {

            // Retrieve the input field text and reset the count to zero
            var filter = $(this).val(), count = 0;

            // Loop through
            $("." + menuItem + " h1 b").each(function () {

                // If the list item does not contain the text phrase fade it out
                if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                    $(this).parent().parent().hide();

                    // Show the list item if the phrase matches and increase the count by 1
                } else {
                    $(this).parent().parent().show();
                    count++;
                }
            });

            // Update the count
            var numberItems = count;
            $("#filter-count").text("Number of dishes = " + count);
        });
    }
});

