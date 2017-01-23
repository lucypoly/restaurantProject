
//highlighting link of current page
$(document).ready(function () {
    var current = location.pathname.split('/');
    current = current[current.length - 1].split('.');
    var id = current[0];
    $('#' + id).addClass('highlight_stay');
});


//trigger menu in the case of mobile version
function menuCollapse() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


//avoid scrolling to the bottom of rhe page
window.onload = function () {
    window.scrollTo(0,0);
};

