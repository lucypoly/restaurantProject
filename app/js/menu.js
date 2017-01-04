function openMenu(evt, menuName) {
    var i, x, tabs;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tabs = document.getElementsByClassName("menu-category");
    for (i = 0; i < x.length; i++) {
        tabs[i].className = tabs[i].className.replace(" blue", "");
    }
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " blue";
}
document.getElementById("selected").click();