/**
 * @file crudHelper.js
 * @name crudHelper
 * @author Diego Pereira Grassato
 * @site http://diegograssato.wordpress.com
 * @version 1.1 beta
 * @description Plugin feito para melhorar acessibilidade e elegância em cruds em ZF2 com bootstrap.
 * @subDescription Conta com recursos como janela modal e busca com URL's amigáveis.
 */

(function($){

    /**
     * Variaveis padrão do plugin
     * @type {{msg: string, class: string, filtro: string, controller: string, busca: string, validacao: boolean, alertClass: alert-info, alert-success, alert-error  }
     */
    var defaults = {
        msg: "O campos deve ser preenchido!",
        class: '.default',
        filtro: '.filtro',
        controller: '/default',
        busca: '#busca',
        validacao: false,
        alertClass: "alert-danger"
    }

    /**
     * Variaveis padrão do plugin
     * @type {{title: string, body: string, deleteButton: string, deleteCancel: string, idModal: string, class: string, idDelete: string}}
     */
    var defaultsDelete = {
        title: "Excluir item?",
        body: "Deseja realmente excluir este item?",
        deleteButton: "Apagar",
        deleteCancel: "Cancelar",
        idModal: "#delete-confirm",
        class: '.delete-confirm',
        idDelete: '#deleteDTuX'
    }

    var methods = {
        init : function( options ) {
            console.log("TuX");
        },

        /**
         * Cria o modal utilizando bootstrap personalizavel segundo as informações em defaultsDelete
         * @returns {string}
         */
        createModal2 : function() {
            var html  = '<div class="modal fade" id='+ defaultsDelete.idModal.replace('#', '') +'>';
            html += '<div class="modal-header">';
            html += '<a class="close" data-dismiss="modal">×</a>';
            html += '<h3>'+ defaultsDelete.title +'</h3></div>';
            html += '<div class="modal-body"><p>'+ defaultsDelete.body +'</p>';
            html += '<p id="legend"></p></div>';
            html += '<div class="modal-footer">';
            html += '<a class="btn btn-danger" id="'+ defaultsDelete.idDelete.replace('#', '') +'" href="#"><i class="icon-trash icon-white"></i> '+ defaultsDelete.deleteButton +'</a>';
            html += '<a href="#" data-dismiss="modal" class="btn"> '+ defaultsDelete.deleteCancel +'</a>';
            html += '</div>';
            html += '</div>';
            return html;
        },
        createModal : function() {
            var html  = '<div class="modal fade" id='+ defaultsDelete.idModal.replace('#', '') +'  role="dialog" aria-labelledby="'+ defaultsDelete.title +'" aria-hidden="true">';
            html += '   <div class="modal-dialog">';
            html += '        <div class="modal-content">';
            html += '            <div class="modal-header">';
            html += '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '                <h4 class="modal-title">'+ defaultsDelete.title +'</h4>';
            html += '            </div>';
            html += '            <div class="modal-body">';
            html += '            <p>'+ defaultsDelete.body +'</p>';
            html += '            <p id="legend"></p>';
            html += '            </div>';
            html += '            <div class="modal-footer">';
            html += '               <a class="btn btn-danger" id="'+ defaultsDelete.idDelete.replace('#', '') +'" href="#"><i class="glyphicon glyphicon-remove"></i> '+ defaultsDelete.deleteButton +'</a>';
            html += '               <a href="#" data-dismiss="modal" class="btn  btn-default"> '+ defaultsDelete.deleteCancel +'</a>';
            html += '           </div>';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';
            return html;
        },


        /**
         * Inicializa o modal utilizando bootstrap
         */
        initDelete : function() {
            $("body").append(methods.createModal());
        },

        /**
         * Div de display para a mensagem
         * @param elemento
         */
        createAlert : function(elemento) {
            var html  = '<div id="alert" style="margin-top: 5px;margin-bottom: 2px" class="alert '+ defaults.alertClass +'"></div>';
            //var html  = '<div class="alert alert-dismissable"></div>';
            if(elemento != null){
                $(elemento).append(html);
            }else{
                $("fieldset:first").append(html);
            }
        },

        /**
         * Função que obtem os elementos que são membros da classe ".filtro"
         * @param classFiltro(filtro para boter o elemento para busca de valores)
         * @returns {string}
         */
        findElements :  function( classFiltro ) {
            var url = new String();
            $(classFiltro).each(function ()
            {
                valorID = $(this).attr("id");
                valorTxt = $(this).val();
                if(valorTxt != ""){
                    url +=  valorID + "/" + valorTxt + "/";
                }
            });
            return url.slice(0, -1);
        },

        /**
         *  Função que exibe mensagem personlizadas, é necessário uma div com class "alert"
         * @param msg
         */
        alert : function (msg)
        {
            this.createAlert();
            if($(".alert").text() != msg){
                jQuery(".alert").empty().fadeIn("slow")
                    .append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>')
                    .append("<b><span>" + msg + "</span></b>");
                jQuery(".alert").delay(2000).fadeOut('slow');
                setTimeout(function () {
                    jQuery(".alert").remove();
                }, 3500);
            }

        },

        /**
         * Limpa elementos
         * @param str
         * @returns {XML|string|void}
         */
        trim : function (str)
        {
            return str.replace(/^\s+|\s+$/g,"");
        }
    };

    /**
     * Plugin para realizar busca, funcionar com input's
     * @param settings(configurações basicas, OPCIONAL)
     */
    jQuery.fn.buscaTxt = function( settings ){
        var $this = jQuery( this );
        settings = jQuery.extend(defaults, settings);
        $this.keydown(function(e)
        {
            if (e.keyCode == 13)
            {
                if (this.value.length > 0)
                {
                    location.assign( settings.controller  + "/" + methods.findElements(settings.filtro).trim());
                } else {
                    if(settings.validacao){
                        methods.alert(settings.msg,settings.alertClass);
                        $($this).focus();
                    }else{
                        location.assign( settings.controller);
                    }
                }
            }
        });
        return $this;
    }

    /**
     * Plugin para realizar busca, funcionar com button
     */
    jQuery.fn.buscaBtn = function( settings ){
        var $this = jQuery( this );
        settings = jQuery.extend(defaults, settings);
        $this.click(function(e)
        {
            if ($(settings.busca).val().length > 0)
            {
                location.assign( settings.controller  + "/" + methods.findElements(settings.filtro).trim());
            } else {
                if(settings.validacao){
                    methods.alert(settings.msg,settings.alertClass);
                    $($this).focus();
                }else{
                    location.assign( settings.controller);
                }
            }
        });
        return $this;
    }

    jQuery.fn.delete = function(arrayFilds, settings ){
        settings = jQuery.extend(defaultsDelete, settings);
        methods.initDelete();
        $(this).click(function(e){
            e.preventDefault();
            if(arrayFilds){
                var str = " ";
                for(var i = 0; i < arrayFilds.length; i++){
                    var fild = $(this).attr(arrayFilds[i]);
                    if(fild != ""){
                        var fildName = arrayFilds[i].replace('data-', '');
                        str += fildName.charAt(0).toUpperCase() + fildName.slice(1).toLowerCase()+ ": " + fild + " - ";
                    }
                }
                $("#legend").html(str.slice(0, -2));
            }
            if($(this).attr('href').length > 0){
                var link = $(this).attr('href');
                $(settings.idDelete).removeAttr( "href" ).attr({ 'href': link});
                $(settings.idModal).modal('show');
            }
        });
    }

}(jQuery));


