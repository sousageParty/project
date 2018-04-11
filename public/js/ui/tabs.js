function Tabs(options) {

    options = (options instanceof Object) ? options : {};
    var SELECTORS = options.SELECTORS;

    function showPage(page) {
        SELECTORS.tabContent.hide();
        SELECTORS.tabContent.removeClass('active-content');
        SELECTORS.errorBlock.empty();
        $('.' + page).addClass('active-content');
        $('.' + page).show();
    }

    SELECTORS.tabs.on('click', function () {
        SELECTORS.tabs.removeClass('active');
        $(this).addClass('active');
        showPage($(this).data('page'));
    });

    showPage('first-tab');
}