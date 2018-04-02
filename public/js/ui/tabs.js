function Tabs() {

    function showPage(page) {
        $('.tab-content').hide();
        $('.tab-content').removeClass('active-content');
        $('.' + page).addClass('active-content');
        $('.' + page).show();
    }

    $('.tabs').on('click', function () {
        $('.tabs').removeClass('active');
        $(this).addClass('active');
        showPage($(this).data('page'));
    });

    showPage('first-tab');
}