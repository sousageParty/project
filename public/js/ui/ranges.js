function Ranges(options) {

    options = (options instanceof Object) ? options : {};
    var SELECTORS = options.SELECTORS;

    function setValue(param, value) {
        $('.' + param).html(value);
    }

    SELECTORS.sliders.on('input', function () {
        setValue($(this).data('value'), $(this).val());
    });

    function init() {
        for(var i = 0; i < SELECTORS.sliders.length; i++) {
            setValue($(SELECTORS.sliders[i]).data('value'), $(SELECTORS.sliders[i]).val());
        }
    }
    init();
}