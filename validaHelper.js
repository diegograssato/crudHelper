(function($){
    /**
     * Variaveis padrão do plugin
     * @type {{msg: string, class: string, filtro: string, controller: string, busca: string, validacao: boolean, alertClass: alert-info, alert-success, alert-error  }
     */
    var defaults = {
        type: "popover"
    }
    $ = jQuery;
    variaveis = jQuery.extend(defaults, null);
    $.fn.extend({

        validate_tux: function(options) {
            var settings;
            settings = $.extend(true, {}, this.tux_defaults, options);
            return this.validate(settings);
        },
        tux_defaults: {
            success: function(error, element) {
                this.destroy(element);
            },
            errorPlacement: function(errors, element) {
                this.destroy(element);
                var message = errors.html();
                this.show(element,message);
            },

            beforeShowError: function(message) {},
            destroy: function(element){
                if(variaveis.type=="popover"){
                    $(element).popover('destroy');
                }
                if(variaveis.type=="tooltip"){
                    $(element).tooltip('destroy');
                }
                $(element).removeClass("error").addClass("form-control");
            },
            show: function(element, message){

                if(variaveis.type=="popover"){
                    this.templatePopover(element, message);
                    $(element).popover('show');
                }
                if(variaveis.type=="tooltip"){
                    this.templateTooltip(element, message);
                    $(element).tooltip('show');
                }
                $(element).addClass("error").removeClass("form-control");
            },
            templatePopover:function(element, message){
                var _popover = $(element).popover({
                    trigger: 'manual',
                    placement: 'right',
                    content: message,
                    title: 'Validação!',
                    animation: true,
                    template:'<div class="popover fade right in" style="width: 100%;"><div class="arrow"></div><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times; </a> <h3 class="popover-title">Validação!</h3><div class="popover-content"></div></div>'
                })
            },
            templateTooltip:function(element, message){
                var _tootip = $(element).tooltip({
                    trigger: 'manual',
                    placement: 'right',
                    title: message,
                    animation: true,
                    template:'<div class="tooltip" style="width: 80%;"><div class="tooltip-inner"></div><div class="tooltip-arrow"></div></div>'
                });
            }
        }

    });

}).call(this);
