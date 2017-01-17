$(document).ready(function () {
    $('.main-info').on('click', function (evt) {
        $(this).siblings('.details').toggle();
    });
    $('.details:first').css('display', 'flex')
});