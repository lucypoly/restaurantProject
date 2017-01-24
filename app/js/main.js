
//highlighting link of current page
$(document).ready(function () {
    var current = location.pathname.split('/');
    current = current[current.length - 1].split('.');
    var id = current[0];
    if ((id == 'contacts')||(id =='menu')||(id == 'reservation')||(id == 'events')){
        $('#clients-href').addClass('highlight_stay');
    } else  $('#' + id).addClass('highlight_stay');
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


//avoid scrolling to the bootom of rhe
window.onload = function () {
    window.scrollTo(0,0);
};

