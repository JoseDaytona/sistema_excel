// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

MyApp = new function () {

    var DivContener = '<div class="AppContener"></div>';

    this.AlertCallback = function (body, callback, title, type, buttonText, buttonColor) {
        title = title || 'Aviso';
        type = type || 'warning';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Aceptar';

        swal({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText,
            allowOutsideClick: false
        }).then(function (isConfirm) {
            if (isConfirm) {
                if (typeof callback === typeof Function) {
                    callback();
                }
            }
        });

        MyApp.CenterTextAlert();
    };

    this.AlertSuccessCallback = function (body, callback, title, type, buttonText, buttonColor) {
        title = title || 'Éxito';
        type = type || 'success';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Aceptar';
        Swal.fire({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText,
            allowOutsideClick: false
        }).then(function () {
            if (typeof callback === typeof Function) {
                callback();
            }
        });

        MyApp.CenterTextAlert();
    };

    this.AlertSuccess = function (body, title, type, buttonText, buttonColor) {
        title = title || 'Éxito';
        type = type || 'success';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Aceptar';

        swal({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText
        }).then(function () {
        });
        MyApp.CenterTextAlert();
    };

    this.Alert = function (body, title, type, buttonText, buttonColor) {
        title = title || 'Aviso';
        type = type || 'warning';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Aceptar';

        swal({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText
        }).then(function () {
        });
        MyApp.CenterTextAlert();
    };

    this.AlertValidationException = function (body, title, type, buttonText, buttonColor) {
        title = title || '¡Aviso!';
        type = type || 'warning';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Aceptar';

        swal({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText
        }, function (isConfirm) {
            if (isConfirm) {
                if (typeof isConfirmMethod !== 'undefined') {
                    isConfirmMethod();
                }
            }
        });

        MyApp.CenterTextAlert();
    };

    this.AlertException = function (body, title, type, buttonText, buttonColor) {
        title = title || 'Error!';
        type = type || 'error';
        buttonColor = buttonColor || '#8CD4F5';
        buttonText = buttonText || 'Ok';

        swal({
            title: title,
            text: body,
            type: type,
            confirmButtonColor: buttonColor,
            confirmButtonText: buttonText
        }, function (isConfirm) {
            if (isConfirm) {
                if (typeof isConfirmMethod !== 'undefined') {
                    isConfirmMethod();
                }
            }
        });

        $("#swal2-content").attr("style", "text-align: center !important");
    };

    this.CenterTextAlert = function () {
        var txt = $("#swal2-content").text();
        $("#swal2-content").attr("style", "text-align: center !important").text('').append('<p>' + txt + '</p>');
    };

    this.ConfirmAnswerAlert = function (setting, okCallback, cancelCallback) {
        title = setting.title || 'Confirmación';

        btnOkText = setting.btnOkText || 'Aceptar';
        btnOkColor = setting.btnOkColor || '#1976D2';//'#A5DC86';
        btnOkLoadingText = setting.btnOkLoadingText || 'Procesando...';

        btnCloseText = setting.btnCloseName || 'Cancelar';
        btnCloseClass = setting.btnCloseClass || 'btn btn-default';
        closeOnConfirm = setting.closeOnConfirm || false;
        closeOnCancel = setting.closeOnCancel || false;
        showLoaderOnConfirm = setting.showLoaderOnConfirm || true;
        showLoading = setting.showLoading || true;
        showCancelButton = setting.showCancelButton || true;
        type = setting.type || 'warning';

        Swal.fire({
            title: title,
            text: setting.body,
            type: type,
            showCancelButton: showCancelButton,
            confirmButtonColor: btnOkColor,
            confirmButtonText: btnOkText,
            cancelButtonText: btnCloseText,
            closeOnConfirm: closeOnConfirm,
            closeOnCancel: closeOnCancel,
            showLoaderOnConfirm: showLoaderOnConfirm,
            reverseButtons: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: function () {
                return new Promise(function (resolve) {
                    if (typeof okCallback === typeof Function) {
                        okCallback();
                    }
                });
            }
        }).then(function () {
            if (typeof cancelCallback === typeof Function) {
                cancelCallback();
            }
        });

        MyApp.CenterTextAlert();
    };

    this.DescodeFormatNumber = function (value) {
        var f = parseFloat(value.toString().replace(/,/g, ''));
        if (isNaN(f))
            f = 0;

        return f;
    };

    this.FormatToNumber = function (value) {
        if (MyApp.isEmpty(value)) {
            value = 0;
        } else {
            value = parseFloat(value);
        }

        return value.toFixed(2).toString().trim().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    this.isEmpty = function isEmpty(str) {
        return !str || 0 === str.length;
    };

    this.onNumberFormat = function () {
        $('.NumberFormat').each(function () {
            if (MyApp.isEmpty($(this).val())) {
                $(this).val(MyApp.FormatToNumber(0));
            }

            $(this).val(MyApp.FormatToNumber(parseFloat(MyApp.DescodeFormatNumber($(this).val()))));
        });
    };

    this.DoRequest = function (params, url, method, callback, beforeSendCallback, completeCallback, desiredDelay, dataType) {
        var message_timer = false;
        var desired_delay = desiredDelay || 400;
        var data_type = dataType || 'json';

        method = method || 'get';
        return $.ajax({
            cache: false,
            type: method,
            async: true,
            dataType: data_type,
            url: url,
            data: params,
            success: function (result) {
                if (typeof callback === typeof Function) {
                    callback(result);
                }
            },
            statusCode: {
                401: function () { MyApp.Alert('No autorizado. Esta solicitud requiere autenticación de usuario.', 'Error!', 'error'); },
                404: function () { MyApp.Alert('Página no encontrada.', 'Error!', 'error'); }
            },
            error: function (msg) {
                MyApp.Alert('Ha ocurrido un error inesperado. Por favor, póngase en contacto con el administrador del sistema. <br><br>' + msg.responseText, 'Error!', 'error');
            },
            beforeSend: function () {
                if (typeof beforeSendCallback === typeof Function) {
                    message_timer = setTimeout(function () {
                        beforeSendCallback();
                        message_timer = false;
                    }, desired_delay);
                }
            },
            complete: function () {
                if (typeof completeCallback === typeof Function) {
                    if (message_timer)
                        clearTimeout(message_timer);
                    message_timer = false;
                    completeCallback();
                }
            }
        });
    };

    this.DoPivotRequest = function (params, url, method, callback, beforeSendCallback, completeCallback, desiredDelay, dataType) {
        var message_timer = false;
        var desired_delay = desiredDelay || 400;
        var data_type = dataType || 'json';

        method = method || 'get';
        return $.ajax({
            type: method,
            url: url,
            data: params,
            contentType: "application/json; charset=utf-8",
            dataType: data_type,
            async: true,
            success: function (data) {
                if (typeof callback === typeof Function)
                    callback(data);
            },
            statusCode: {
                401: function () { MyApp.Alert('No autorizado. Esta solicitud requiere autenticación de usuario.', 'Error!', 'error'); },
                404: function () { MyApp.Alert('Página no encontrada.', 'Error!', 'error'); }
            },
            error: function (msg) {
                MyApp.Alert('Ha ocurrido un error inesperado. Por favor, póngase en contacto con el administrador del sistema. <br><br>' + msg.responseText, 'Error!', 'error');
            },
            beforeSend: function () {
                if (typeof beforeSendCallback === typeof Function) {
                    message_timer = setTimeout(function () {
                        beforeSendCallback();
                        message_timer = false;
                    }, desired_delay);
                }
            },
            complete: function () {
                if (typeof completeCallback === typeof Function) {
                    if (message_timer)
                        clearTimeout(message_timer);
                    message_timer = false;
                    completeCallback();
                }
            }
        }).responseJSON;
    };

    this.ShowAlert = function (result) {
        if (result.statusCode !== undefined) {
            switch (result.statusCode) {
                case 400:
                    MyApp.AlertValidationException(result.msg);
                    break;
                case 500:
                    MyApp.AlertException(result.msg);
                    break;
                case 410:
                    MyApp.AlertCallback(result.msg, function () {
                        MyApp.Redirect(result.urlAction);
                    });
                    break;
                default:
            }
        }
    };

    this.MaxLenghInput = function (Lengh) {
        $('.max-Lengh-input-' + Lengh).unbind('keyup change input paste').bind('keyup change input paste', function (e) {
            var $this = $(this);
            var val = $this.val();
            var valLength = val.length;
            var maxCount = Lengh;
            if (valLength > maxCount) {
                $this.val($this.val().substring(0, maxCount));
            }
        });
    };

    this.GetDisplayMonth = function (value) {
        var month;

        // Para poder usarlo tanto con las consulta como genérico
        if (typeof value.value === "number") {
            month = value.value;
        } else if (typeof value.value === "undefined") {
            month = value;
        }


        switch (parseInt(month)) {
            case 1:
                return 'Enero';
            case 2:
                return 'Febrero';
            case 3:
                return 'Marzo';
            case 4:
                return 'Abril';
            case 5:
                return 'Mayo';
            case 6:
                return 'Junio';
            case 7:
                return 'Julio';
            case 8:
                return 'Agosto';
            case 9:
                return 'Septiembre';
            case 10:
                return 'Octubre';
            case 11:
                return 'Noviembre';
            case 12:
                return 'Diciembre';
            default:
                return 'No definido';
        }
    }

    this.AnyArray = function (array, predicate) {
        if (typeof (predicate) === typeof (Function)) {
            return !MyApp.IsArrayNullOrEmpty(array) ? array.some(predicate) : false;
        } else {
            return MyApp.IsArrayNullOrEmpty(array);
        }
    };

    this.RemoveObjectToArray = function (array, predicate) {
        if (typeof (predicate) === typeof (Function) && !MyApp.IsArrayNullOrEmpty(array)) {
            var index = array.findIndex(predicate);
            array.splice(index, 1);
        }
    };

    this.AlertModal = function (model) {
        try {
            MyApp.HideAll();

            var hideBehindModalId = '';
            if ($('.modal').hasClass('in')) {
                hideBehindModalId = $('.modal').attr('id');
                console.log(hideBehindModalId)
                $('#' + hideBehindModalId).modal('hide');

            }


            title = model.title || 'Notificación';
            btnCloseName = model.btnCloseName || 'Cerrar';

            var header = '<div class="modal-header" style="padding: 15px !important;">' +
                '<button type="button" class="close" data-dismiss="modal">' +
                '<span aria-hidden="true" data-behindmodalid="' + hideBehindModalId + '" class="CloseAppModal">&times;</span><span class="sr-only">Close</span>' +
                '</button>' +
                '<h4 class="modal-title">' + title + '</h4></div>';

            var body = ' <div class="modal-body">' + model.body + '</div>';

            var buttons = '';
            model.Buttons.forEach(function (item) {
                if (!MyApp.isEmpty(item)) {
                    buttons += '<button type="button" onclick="on' + item.replace(/ /g, "") + '(this)" class="btn btn-primary btn-flat" data-behindmodalid="' + hideBehindModalId + '" >' + item + '</button>'
                }
            })

            var footer = '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default btn-flat CloseAppModal" data-behindmodalid="' + hideBehindModalId + '" data-dismiss="modal">' + btnCloseName + '</button>' +
                buttons +
                '</div>';
            var full = '<div class="modal fade" id="AppAlert"><div class="modal-dialog"><div class="modal-content">'
                + header + body + footer
                + '</div></div></div>';

            $('.AppContener').remove();

            $('body').append(DivContener);
            $('.AppContener').append(full);

            $('#AppAlert').modal('show');



        } catch (msg) {
            alert.warn(msg);
        }
    };

    this.HideAll = function () {
        $('#AppAlert').modal('hide');
        $('.modal-backdrop').remove();
    }

    this.IsArrayNullOrEmpty = function (array) {
        return !(array !== null && typeof array !== 'undefined' && array.length > 0);
    };

    this.allRules = {
        "required": { // Add your regex rules here, you can take telephone as an example
            "regex": "none",
            "alertText": "* Este campo es obligatorio",
            "alertTextCheckboxMultiple": "* Por favor seleccione una opción",
            "alertSelect": "* Por favor elija una opción",
            "alertTextCheckboxe": "* Este checkbox es obligatorio"
        },
        "requiredInFunction": {
            "func": function (field, rules, i, options) {
                return (field.val() === "test") ? true : false;
            },
            "alertText": "* Field must equal test"
        },
        "minSize": {
            "regex": "none",
            "alertText": "* Mínimo de ",
            "alertText2": " caracteres autorizados"
        },
        "groupRequired": {
            "regex": "none",
            "alertText": "* Debe de rellenar al menos uno de los siguientes campos"
        },
        "maxSize": {
            "regex": "none",
            "alertText": "* Máximo de ",
            "alertText2": " caracteres autorizados"
        },
        "min": {
            "regex": "none",
            "alertText": "* El valor mínimo es "
        },
        "max": {
            "regex": "none",
            "alertText": "* El valor máximo es "
        },
        "past": {
            "regex": "none",
            "alertText": "* Fecha anterior a "
        },
        "future": {
            "regex": "none",
            "alertText": "* Fecha posterior a "
        },
        "maxCheckbox": {
            "regex": "none",
            "alertText": "* Se ha excedido el número de opciones permitidas"
        },
        "minCheckbox": {
            "regex": "none",
            "alertText": "* Por favor seleccione ",
            "alertText2": " opciones"
        },
        "equals": {
            "regex": "none",
            "alertText": "* Los campos no coinciden"
        },
        "creditCard": {
            "regex": "none",
            "alertText": "* La tarjeta de crédito no es válida"
        },
        "phone": {
            // credit: jquery.h5validate.js / orefalo
            "regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
            "alertText": "* Número de teléfono inválido"
        },
        "email": {
            // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
            "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "alertText": "* Correo inválido"
        },
        "integer": {
            "regex": /^[\-\+]?\d+$/,
            "alertText": "* No es un valor entero válido"
        },
        "number": {
            // Number, including positive, negative, and floating decimal. credit: orefalo
            "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
            "alertText": "* No es un valor decimal válido"
        },
        "date": {
            "regex": /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            "alertText": "* Fecha inválida, por favor utilize el formato DD/MM/AAAA"
        },
        "ipv4": {
            "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
            "alertText": "* Direccion IP inválida"
        },
        "url": {
            "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            "alertText": "* URL Inválida"
        },
        "onlyNumberSp": {
            "regex": /^[0-9\ ]+$/,
            "alertText": "* Sólo números"
        },
        "onlyLetterSp": {
            "regex": /^[a-zA-Z\ \']+$/,
            "alertText": "* Sólo letras"
        },
        "onlyLetterNumber": {
            "regex": /^[0-9a-zA-Z]+$/,
            "alertText": "* No se permiten caracteres especiales"
        },
        // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
        "ajaxUserCall": {
            "url": "ajaxValidateFieldUser",
            // you may want to pass extra data on the ajax call
            "extraData": "name=eric",
            "alertTextLoad": "* Cargando, espere por favor",
            "alertText": "* Este nombre de usuario ya se encuentra usado"
        },
        "ajaxNameCall": {
            // remote json service location
            "url": "ajaxValidateFieldName",
            // error
            "alertText": "* Este nombre ya se encuentra usado",
            // if you provide an "alertTextOk", it will show as a green prompt when the field validates
            "alertTextOk": "* Este nombre está disponible",
            // speaks by itself
            "alertTextLoad": "* Cargando, espere por favor"
        },
        "validate2fields": {
            "alertText": "* Por favor entrar HELLO"
        }, "select-one": {
            "regex": /^(\s*|[0\ ]+)$/,
            "alertText": "* Por favor elija una opción"
        }, "validateText": {
            "regex": /^(\s*)$/,
            "alertText": "* Este campo es obligatorio"
        },
        "validateCedula": {
            "regex": /^([0-9]{3})([-]?)([0-9]{7})([-]?)([0-9]{1})$/,
            "alertText": "Cedula inválida"
        }
    };

    this.MethodValidate = {
        _tamañoMinimo: function (field, rules, options) {
            var min = rules;
            var len = field.val().length;

            if (len < min) {
                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-minlength") + "<br>";
                var rule = options.minSize;
                return rule.alertText + min + rule.alertText2;
            }
        },
        _tamañoMaximo: function (field, rules, options) {
            var max = rules;
            var len = field.val().length;

            if (len > max) {
                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-maxlength") + "<br>";
                var rule = options.maxSize;
                return rule.alertText + max + rule.alertText2;
            }
        },
        _minimo: function (field, rules, options) {
            var min = parseFloat(rules);
            var fieldValue = MyApp.DescodeFormatNumber(field.val());
            var len = parseFloat(fieldValue);

            if (len < min) {
                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-range") + "<br>";
                var rule = options.min;
                if (rule.alertText2) return rule.alertText + min + rule.alertText2;
                return rule.alertText + min;
            }
        },
        _maximo: function (field, rules, options) {
            var max = parseFloat(rules);
            var fieldValue = MyApp.DescodeFormatNumber(field.val());
            var len = parseFloat(fieldValue);

            if (len > max) {
                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-range") + "<br>";
                var rule = options.max;
                if (rule.alertText2) return rule.alertText + max + rule.alertText2;
                //orefalo: to review, also do the translations
                return rule.alertText + max;
            }
        },
        _numero: function (field, options) {
            switch (field.prop("type")) {
                case "select-one":
                    var rule = MyApp.allRules['select-one'];

                    if (rule["regex"]) {
                        var ex = rule.regex;
                        if (!ex) {
                            return '';
                        }
                        var pattern = new RegExp(ex);

                        if (pattern.test(field.val())) {
                            MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-required") + "<br>";
                            return rule.alertText;
                        }
                    }
                    break;

                case "select-multiple":
                default:
                    var rule2 = options['number'];
                    if (rule2["regex"]) {
                        var ex2 = rule2.regex;
                        if (!ex2) {
                            return '';
                        }
                        var pattern2 = new RegExp(ex2);

                        if (!pattern2.test(parseInt(field.val()))) {
                            var rule3 = options.number;
                            return rule3.alertText;
                        }
                    }
            }
        },
        _integer: function (field, options) {
            var rule = options['integer'];

            if (rule["regex"]) {
                var ex = rule.regex;
                if (!ex) {
                    return '';
                }
                var pattern = new RegExp(ex);

                if (!pattern.test(parseInt(field.val()))) {
                    var rule2 = options.number;
                    return rule2.alertText;
                }
            }
        },
        _allClose: function () {
            var duration = 300;
            $('.formError').fadeTo(duration, 300, function () {
                $(this).parent('.formErrorOuter').remove();
                $(this).remove();
            });
            return this;
        },
        _options: {
            promptPosition: 'topRight',
            showArrow: true,
            autoHidePrompt: false,
            autoHideDelay: 10000,
            scroll: true,
            focusFirstField: false,
            showIcon: true,
            scrollOffset: 0,
            subTitle: '<strong>' + 'Los siguientes campos son requeridos' + '</strong>' + "<br>",
            messageModal: '',
            bullet: "• "
        },
        _getValidation: function (field) {
            return MyApp.MethodValidate._getRules(field, { isValid: false, message: '' });
        },
        _buildPrompt: function (field, promptText, options, showIcon) {
            // create the prompt
            var prompt = $('<div>');
            prompt.addClass(field.attr("id") + "formError");
            // add a class name to identify the parent form of the prompt
            prompt.addClass("parentForm" + field.closest('form, .validationEngineContainer').attr("id"));
            prompt.addClass("formError");

            // determine position type
            var positionType = field.data("promptPosition") || options.promptPosition;

            // create the prompt content
            var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);

            // create the css arrow pointing at the field
            // note that there is no triangle on max-checkbox and radio
            if (options.showArrow) {
                var arrow = $('<div>').addClass("formErrorArrow");

                //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                if (typeof positionType === 'string') {
                    var pos = positionType.indexOf(":");
                    if (pos !== -1)
                        positionType = field.prop("type") === 'select-one' ? 'bottomRight' : positionType.substring(0, pos);
                }

                switch (positionType) {
                    case "bottomLeft":
                    case "bottomRight":
                        prompt.find(".formErrorContent").before(arrow);
                        arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case "topLeft":
                    case "topRight":
                        arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        prompt.append(arrow);
                        break;
                }
            }

            prompt.css({
                "opacity": 0
            });
            if (positionType === 'inline') {
                prompt.addClass("inline");
                if (typeof field.attr('data-prompt-target') !== 'undefined' && $('#' + field.attr('data-prompt-target')).length > 0) {
                    prompt.appendTo($('#' + field.attr('data-prompt-target')));
                } else {
                    //if (MyApp.MethodValidate._options.showIcon)
                    field.after(prompt);
                }
            } else {
                //if (MyApp.MethodValidate._options.showIcon)
                field.before(prompt);
            }

            var pos2 = MyApp.MethodValidate._calculatePosition(field, prompt, options);
            prompt.css({
                'position': positionType === 'inline' ? 'relative' : 'absolute',
                "top": pos2.callerTopPosition,
                "left": pos2.callerleftPosition,
                "marginTop": pos2.marginTopSize,
                "opacity": 0
            }).data("callerField", field);

            if (options.autoHidePrompt) {
                setTimeout(function () {
                    prompt.animate({
                        "opacity": 0
                    }, function () {
                        prompt.closest('.formErrorOuter').remove();
                        prompt.remove();
                    });
                }, options.autoHideDelay);
            }
            return prompt.animate({
                "opacity": 0.87
            });
        },
        _scroll: function (first_err, options) {
            if (options.scroll) {
                var destination = first_err.offset().top;
                var fixleft = first_err.offset().left;

                //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                var positionType = options.promptPosition;
                if (typeof positionType === 'string' && positionType.indexOf(":") !== -1)
                    positionType = positionType.substring(0, positionType.indexOf(":"));

                if (positionType !== "bottomRight" && positionType !== "bottomLeft") {
                    var prompt_err = $('.' + first_err.attr("id") + 'formError');

                    //console.log('.' + first_err.attr("id") + 'formError');
                    //console.log(prompt_err);
                    //DescripcionformError parentFormfrmMotivoEndoso formError
                    if (prompt_err) {
                        destination = prompt_err.offset().top;
                    }
                }

                // Offset the amount the page scrolls by an amount in px to accomodate fixed elements at top of page
                if (options.scrollOffset) {
                    destination -= options.scrollOffset;
                }

                // get the position of the first error, there should be at least one, no need to check this
                //var destination = form.find(".formError:not('.greenPopup'):first").offset().top;
                if (options.isOverflown) {
                    var overflowDIV = $(options.overflownDIV);
                    if (!overflowDIV.length) return false;
                    var scrollContainerScroll = overflowDIV.scrollTop();
                    var scrollContainerPos = -parseInt(overflowDIV.offset().top);

                    destination += scrollContainerScroll + scrollContainerPos - 5;
                    var scrollContainer = $(options.overflownDIV + ":not(:animated)");

                    scrollContainer.animate({ scrollTop: destination }, 1100, function () {
                        if (options.focusFirstField) first_err.focus();
                    });
                } else {
                    $("html, body").animate({
                        scrollTop: destination
                    }, 1100, function () {
                        if (options.focusFirstField) first_err.focus();
                    });
                    $("html, body").animate({ scrollLeft: fixleft }, 1100);
                }
            } else if (options.focusFirstField)
                first_err.focus();
            return false;
        },
        _onClickFormError: function () {
            $(document).on("click", ".formError", function () {
                $(this).fadeOut(150, function () {
                    // remove prompt once invisible
                    $(this).parent('.formErrorOuter').remove();
                    $(this).remove();
                });
            });

            $(document).on('keyup change paste', ':input[data-val="true"]', function () {
                _closeMensaje($(this));
            });

            function _closeMensaje(field) {
                var prompt = _obtenerPropiedad(field);
                if (prompt)
                    prompt.fadeTo("fast", 0, function () {
                        prompt.parent('.formErrorOuter').remove();
                        prompt.remove();
                    });
            }

            function _obtenerPropiedad(field) {
                var formId = $(field).closest('form').attr('id');
                var className = field.attr("id") + "formError";
                var match = $('.' + className + '.parentForm' + formId);
                if (match)
                    return $(match);
            }
        },
        _getRules: function (field, opciones) {
            var reglas = MyApp.allRules;

            var Required = field.attr("data-val-required");
            var number = field.attr("data-val-number");
            var range = field.attr("data-val-range");
            var RangeMin = field.attr("data-val-range-min");
            var RangeMax = field.attr("data-val-range-max");
            var Email = field.attr("data-val-email");
            var LengthMax = field.attr("data-val-maxlength-max");
            var LengthMin = field.attr("data-val-minlength-min");
            var Url = field.attr("data-val-url");
            var ConfirPassword = field.attr("data-val-equalto-other");

            if (number !== undefined) {
                var result = MyApp.MethodValidate._numero(field, reglas);
                if (result) {
                    opciones.message = result;
                    opciones.isValid = true;
                }
            }
            if (range !== undefined) {
                //$(this).removeAttr("data-val-range");
            }
            if (RangeMin !== undefined) {
                var result2 = MyApp.MethodValidate._minimo(field, RangeMin, reglas);
                if (result) {
                    opciones.message = result2;
                    opciones.isValid = true;
                }
            }
            if (RangeMax !== undefined) {
                var result3 = MyApp.MethodValidate._maximo(field, RangeMax, reglas);
                if (result3) {
                    opciones.message = result3;
                    opciones.isValid = true;
                }
            }
            if (Email !== undefined) {
                var result4 = MyApp.MethodValidate._tamañoMaximo(field, number, reglas);
                if (result4) {
                    opciones.message = result4;
                    opciones.isValid = true;
                }
            }
            if (Url !== undefined) {
                var result5 = MyApp.MethodValidate._tamañoMaximo(field, number, reglas);
                if (result5) {
                    opciones.message = result6;
                    opciones.isValid = true;
                }
            }
            if (LengthMax !== undefined) {
                var result7 = MyApp.MethodValidate._tamañoMaximo(field, LengthMax, reglas);
                if (result7) {
                    opciones.message = result7;
                    opciones.isValid = true;
                }
            }
            if (LengthMin !== undefined) {
                var result8 = MyApp.MethodValidate._tamañoMinimo(field, LengthMin, reglas);
                if (result8) {
                    opciones.message = result8;
                    opciones.isValid = true;
                }
            }
            if (ConfirPassword !== undefined) {
                var result9 = MyApp.MethodValidate._tamañoMaximo(field, number, reglas);
                if (result9) {
                    opciones.message = result9;
                    opciones.isValid = true;
                }
            }
            if (Required !== undefined && !opciones.isValid) {
                switch (field.prop("type")) {
                    case "text":
                        var rule = MyApp.allRules['validateText'];

                        if (rule["regex"]) {
                            var ex = rule.regex;
                            if (!ex) {
                                return '';
                            }
                            var pattern = new RegExp(ex);

                            if (pattern.test(field.val())) {
                                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-required") + "<br>";

                                opciones.message = rule.alertText;
                                opciones.isValid = true;
                            }
                            else {
                                opciones.isValid = false;
                            }
                        }
                        break;
                    case "password":
                    case "textarea":
                    case "file":
                    case "select-one":
                        var rule2 = MyApp.allRules['select-one'];

                        if (rule2["regex"]) {
                            var ex2 = rule2.regex;
                            if (!ex2) {
                                return '';
                            }
                            var pattern2 = new RegExp(ex2);

                            if (pattern2.test(field.val())) {
                                MyApp.MethodValidate._options.messageModal += MyApp.MethodValidate._options.bullet + field.attr("data-val-required") + "<br>";
                                opciones.message = rule2.alertText;
                                opciones.isValid = true;
                            }
                        }
                        break;

                    case "select-multiple":
                    default:
                }
            }

            return opciones;
        },
        _calculatePosition: function (field, promptElmt, options) {
            var promptTopPosition, promptleftPosition, marginTopSize;
            var fieldWidth = field.width();
            var fieldLeft = field.position().left;
            var fieldTop = field.position().top;
            var fieldHeight = field.height();
            var promptHeight = promptElmt.height();

            // is the form contained in an overflown container?
            promptTopPosition = promptleftPosition = 0;
            // compensation for the arrow
            marginTopSize = -promptHeight;

            //prompt positioning adjustment support
            //now you can adjust prompt position
            //usage: positionType:Xshift,Yshift
            //for example:
            //   bottomLeft:+20 means bottomLeft position shifted by 20 pixels right horizontally
            //   topRight:20, -15 means topRight position shifted by 20 pixels to right and 15 pixels to top
            //You can use +pixels, - pixels. If no sign is provided than + is default.
            var positionType = field.attr("data-promptPosition") || options.promptPosition;

            var shift1 = "";
            var shift2 = "";
            var shiftX = 0;
            var shiftY = 0;
            if (typeof positionType === 'string') {
                //do we have any position adjustments ?
                if (positionType.indexOf(":") !== -1) {
                    shift1 = positionType.substring(positionType.indexOf(":") + 1);
                    positionType = positionType.substring(0, positionType.indexOf(":"));

                    //if any advanced positioning will be needed (percents or something else) - parser should be added here
                    //for now we use simple parseInt()

                    //do we have second parameter?
                    if (shift1.indexOf(",") !== -1) {
                        shift2 = shift1.substring(shift1.indexOf(",") + 1);
                        shift1 = shift1.substring(0, shift1.indexOf(","));
                        shiftY = parseInt(shift2);
                        if (isNaN(shiftY)) shiftY = 0;
                    }

                    shiftX = parseInt(shift1);
                    if (isNaN(shift1)) shift1 = 0;
                }
                shiftX += field.prop("type") === 'select-one' ? 200 : shiftX;
                shiftY += field.prop("type") === 'select-one' ? 10 : shiftY;
            }

            switch (positionType) {
                default:
                case "topRight":
                    promptleftPosition += fieldLeft + fieldWidth - 27;
                    promptTopPosition += fieldTop;
                    break;

                case "topLeft":
                    promptTopPosition += fieldTop;
                    promptleftPosition += fieldLeft;
                    break;

                case "centerRight":
                    promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft + field.outerWidth(true) + 5;
                    break;
                case "centerLeft":
                    promptleftPosition = fieldLeft - (promptElmt.width() + 2);
                    promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;

                    break;

                case "bottomLeft":
                    promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft;
                    break;
                case "bottomRight":
                    promptleftPosition = fieldLeft + fieldWidth - 27;
                    promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    break;
                case "inline":
                    promptleftPosition = 0;
                    promptTopPosition = 0;
                    marginTopSize = 0;
            }

            //apply adjusments if any
            promptleftPosition += shiftX;
            promptTopPosition += shiftY;

            return {
                "callerTopPosition": promptTopPosition + "px",
                "callerleftPosition": promptleftPosition + "px",
                "marginTopSize": marginTopSize + "px"
            };
        }
    };

    this.Options = {
        loadContent: '<div class="overlay" id="icon-loading"><i class="fa fa-refresh fa-spin"></i></div>',
        loadContentWithText: function (text, margin) {
            text = text || 'Cargando...';
            margin = margin || 10;
            return '<div class="overlay" id="icon-loading">' +
                '<div class="text-center" style="margin-top: ' + margin + '%;"><p> <h3>' + text + '</h3></p></div>' +
                '<i class= "fa fa-refresh fa-spin" ></i>' +
                '</div>';
        },
    }

    this.CopyText = function (element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(element).select();
        document.execCommand("copy");
        $temp.remove();
    }

    this.ScrollToField = function (field) {
        var destination = field.offset().top;

        var form = $(field).closest('.box-warning');

        destination -= form.offset().top;

        $("html, body").animate({
            scrollTop: destination
        }, 1100, function () {
            field.focus().select();
        });
    };

    this.ScrollToSelector = function (field) {
        var destination = field.offset().top;

        var form = $(field).closest('.box-warning');

        destination -= form.offset().top;

        $("html, body").animate({
            scrollTop: destination
        }, 1100, function () {
            field.focus().select();
        });
    };

    this.FormatToNumberPosit0 = function (value) {
        if (MyApp.isEmpty(value)) return value;
        return value.toFixed().toString().trim().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    this.ChangeUrl = function (title, url) {
        if (typeof history.pushState !== "undefined") {
            var obj = { Title: title, Url: url };
            history.pushState(obj, obj.Title, obj.Url);
        }
    };

    this.Redirect = function (url) {
        window.location.href = url;
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    this.NewGuid = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();

    }

    this.IsNullOrEmpty = function (value) {
        if (typeof value === "string") {
            return !value || 0 === value.length;
        }

        return false;
    };

    this.GetDateTime = function (format) {
        var today = new Date();
        var date;
        switch (format) {
            case 'dd/MM/yyyy':
                date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
                break;
            case 'ddMMyyyy':
                date = today.getDate() + '' + (today.getMonth() + 1) + '' + today.getFullYear();
                break;
            case 'dd-MM-yyyy':
                date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                break;
            case 'yyyy-MM-dd':
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                break;
            case 'yyyy/MM/dd':
                date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                break;
            default:
        }

        return date;
    };

};

$.fn.showLoadPanel = function (text, margin) {

    var contest = text ? MyApp.Options.loadContentWithText(text, margin) : MyApp.Options.loadContent;
    $(this).find('#icon-loading').remove();
    $(this).append(contest);
    $(this).addClass('box box-solid box-shadow-load');
};

$.fn.hiddenLoadPanel = function () {
    $(this).find('#icon-loading').remove();
    $(this).removeAttr('style');
};


$.fn.showLoadingButton = function (text) {
    $(this).find('.ld-spin').remove();
    var icon = '<div class="ld ld-ring ld-spin"></div>';

    if (text) {
        $(this).html(text + '...');
    } else {
        var html = $(this).html();
        switch (html) {
            case 'Importar':
                $(this).html('Importando...');
                break;
            case "Exportar":
                $(this).html('Exportando...');
                break;

            default:
        }
    }


    $(this).append(icon).addClass('ld-ext-right running').attr('disabled', true);


};

$.fn.hiddenLoadingButton = function (text, icoName) {
    $(this).find('.ld-spin').remove();
    $(this).removeClass('ld-ext-right running').attr('disabled', false);
    if (text && !icoName) {
        $(this).html(text);
    } else if (text && icoName) {
        $(this).html(text + '&nbsp;<i class="fa fa-' + icoName + '"></i>');
    }
    else {
        var html = $(this).text();
        switch (html) {
            case "Importando...":
                $(this).html('Importar');//Buscar&nbsp;<i class="fa fa-search"></i>
                break;
            case "Exportando...":
                $(this).html('Guardar');
                break;
            default:
        }
    }
};