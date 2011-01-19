(function($){
    $.fn.statusbar = function(settings) {
        
        var defaults_settings = {
            wrapper: '',
        };
        var settings = $.extend(defaults_settings, settings);
        
            this.addMessage = function(message) {
                //$message = $(settings.wrapper).html('coucou');
                //$this.append($message);
            }
            
        statusbar = this;
        
        return this.each(function(statusbar) {
            var $this = $(this);
            $this
        });
    }
})(jQuery);
