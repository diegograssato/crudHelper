/**
 * @file crudHelper.js
 * @name crudHelper
 * @author Diego Pereira Grassato
 * @site http://diegograssato.wordpress.com
 * @version 1.1 beta
 * @description
 */

$(document).ready(function() {
    /**
     * Variaveis padrão do plugin
     * @type {{msg: string, default: string, active: string, filtro: string, controller: string}}
     */
    var defaults = {
        msg: "O campos deve ser preenchido!",
        class: '.default',
        filtro: '.filtro',
        controller: '/default',
        busca: '#busca'

    }
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

        createModal : function() {
            /** Cria o modal utilizando bootstrap personalizavel segundo as informacoes em defaultsDelete  */
            var html  = '<div class="modal fade" id='+ defaultsDelete.idModal.replace('#', '') +'>';
            html += '<div class="modal-header">';
            html += '<a class="close" data-dismiss="modal">×</a>';
            html += '<h3>'+ defaultsDelete.title +'</h3></div>';
            html += '<div class="modal-body"><p>'+ defaultsDelete.body +'</p>';
            html += '<p id="legend"></p></div>';
            html += '<div class="modal-footer">';
            html += '<a class="btn btn-danger" id="'+ defaultsDelete.idDelete +'" href="#"><i class="icon-trash icon-white"></i> '+ defaultsDelete.deleteButton +'</a>';
            html += '<a href="#" data-dismiss="modal" class="btn"> '+ defaultsDelete.deleteCancel +'</a>';
            html += '</div>';
            html += '</div>';
            return html;
        },

        initDelete : function() {
            /**  Cria o modal utilizando bootstrap e anexa ao body */
            $("body").append(methods.createModal());
        },

        createAlert : function(elemento) {
            /** Div de display para a mensagem  */
            var html  = '<div class="alert" style="display: none;margin-top: 20px"></div>';
            if(elemento != null){
                $(elemento).append(html);
            }else{
                $("fieldset:first").append(html);
            }
        },

        /**
         * Função que obtem os elementos que são membros da classe ".filtro"
         * @returns {string}
         */
        findElements :  function( classFiltro ) {
            var url = new String();
            $(classFiltro).each(function (index)
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
        msg : function (msg)
        {
            this.createAlert();
            jQuery(".alert").empty().fadeIn("slow")
                .append('<button type="button" class="close" data-dismiss="alert">&times;</button>')
                .append("<b><span>" + msg + "</span></b>");
                setTimeout(function () {
                    jQuery(".alert").fadeOut('slow').delay(100).remove();
            }, 3200);
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
     */
    jQuery.fn.buscaTxt = function( settings ){
        var $this = jQuery( this );
        settings = jQuery.extend(defaults, settings);
        $this.keydown(function(e)
        {
            if (e.keyCode == 13)
            {
                if (this.value)
                {
                    location.assign( settings.controller  + "/" + methods.findElements(settings.filtro)).trim();
                } else {
                    methods.msg(settings.msg);
                    $($this).focus();
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
            if ($(settings.busca).val())
            {
                location.href = settings.controller  + "/" + methods.findElements(settings.filtro);
            } else {
                methods.msg(settings.msg);
                $($this).focus();
            }

        });

        return $this;
    }

    /**
     * Plugin para realizar remocao com Modal do bootstrap
     */
    jQuery.fn.delete = function( settings ){

        var $this = jQuery( this );
        settings = jQuery.extend(defaultsDelete, settings);
        methods.initDelete();

          $(this).click(function(e){
            e.preventDefault();

            if($(this).attr('title')){
                var title = $(this).attr('title');
                $("#legend").html(title);
            }
            if($(this).attr('href')){
                var link = $(this).attr('href');
                $(settings.idDelete).removeAttr( "href" ).attr({ 'href': link});
                $(settings.idModal).modal('show');
            }

        });

        return $this;
    }



});
