function galleryPage(items, options) {
    var out = "<div id='galleryPage' class='row-wrap black container'>";

    for(var i=0, l=items.length; i<l; i++) {
        out = out + "<a href='javascript:void(0)'><img src='" + options.fn(items[i]) + "' /></a>";
    }

    return out + "</div><div id='modal_form'><span id='modal_close'>X</span><p>Hello</p><div id='overlay'></div></div>";
}