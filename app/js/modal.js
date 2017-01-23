$(document).ready(function () {
    $('#galleryPage').click(function (event) {
        var src = $(event.target).attr('src');

        //window opened in current position of the user
        var position = $(window).scrollTop();
        var height = $( window ).height();
        var width = $( window ).width();

        //added current to the modal window by path
        $('#imgModal').html('<img src="' + src + '"/>');
        $('#imgModal').css('display', 'block');
        event.preventDefault();

        //modal window displayed at the current position
        $('#overlay').css('display', 'block');
        $('#modal_form').css({opacity: 1, display: 'block', top: position,'max-width': width});
    });

    //closing modal window
    $('#modal_close, #overlay').click(function () {
        $('#modal_form').css('display', 'none');
        $('#overlay').css('display', 'none');
        $('#imgModal').css('display', 'none');
    });
});