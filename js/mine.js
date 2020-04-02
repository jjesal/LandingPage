var code; var number; var pais; var departamento={codigo:'',text:''}; var ciudad={codigo:'',text:''};
function enviar() {
    let data = {
        nombre: $('#inputName').val(),
        apellidos: $('#inputLastName').val(),
        correo: $('#inputEmail').val(),
        pais: $('#select-pais').val(),
        ciudad: $('#select-departamento').val(),
        numero: $('#inputcode1').val() + '' + $('#inputphone1').val(),
        mensaje: $('#message').val()
    }
    fetch('./php/sendMail.php', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(rpt => {
        Swal.fire({
            title: 'Enviado',
            text: "En seguida nos pondremos en contacto contigo!",
            icon: 'success',

        }).then((result) => {
            $('#inputName').val('');
            $('#inputLastName').val('');
            $('#inputEmail').val('');
            $('#select-pais').val('');
            $('#select-departamento').val('');
            $('#inputcode1').val('');
             $('#inputphone1').val('');
            $('#message').val('');
        })
    })
}

var sizeNumber = null;
function validate() {
    // let code = $('#inputcode1').val();
    // let number = $('#inputphone1').val();
    // if (libphonenumber.parsePhoneNumber(code + '' + number).isValid()) {
    //     enviar();
    //     return false;
    // } else {
    //     alert("El número que ingresaste no es valido");
    //     return false;
    // }

}


$(document).ready(function () {
    $('#ciudad-cont').hide();
    fetch('./json/countries.json', {
        method: 'GET',
    }).then(rsp => {
        return rsp.json();
    }).then(paises => {
        let maped = paises.map(pais => {
            return { id: pais.text, text: pais.text, lista: pais.lista, code: pais.code, short: pais.short }
        })
        maped.unshift({ id: '0', code: "", text: "País...", short: "", lista: [] })
        console.log(maped);
        let arrDepartamentos = new Array;
        arrDepartamentos.unshift({ id: '0', text: 'Departamento...', codigo: '', selected: true });
        $('#select-departamento').select2({ data: arrDepartamentos });
        // $('#select-departamento').select2({ data: maped[0].lista });
        $('#select-pais').select2({ data: maped });
    })
    $('#select-pais').on("select2:select", (e) => {
        clearCodes();
        pais = e.params.data;
        if (pais.id != '0') {
            formatoNumeros()
            $('#select-departamento').empty();
            $('#select-ciudad').empty();
            console.log('Cambiaste de país! ', pais)

            getDepartamentos(pais.short).then(arrDepartamentos => {
                console.log('get: ', arrDepartamentos)
                let arrTmp = arrDepartamentos.map(departamento => {
                    if (pais.short === 'PE') {
                        return { id: departamento.nombre, codigo: departamento.codteldep, text: departamento.nombre }
                    } else if (pais.short === 'MEX' || pais.short === 'CHL' || pais.short === 'PAN' || pais.short === 'ARG') {
                        return { id: departamento.district, codigo: "", text: departamento.district }
                    } else {
                        return { id: departamento.name, codigo: '', text: departamento.name }
                    }
                });
                arrDepartamentos = arrTmp;
                arrDepartamentos.unshift({ id: '0', text: 'Departamento...', codigo: '', selected: true });
                if (pais.code != "") {
                    // $('#inputcode1').val(pais.code);
                    $('#inputphone1').val('');
                    // $('#inputphone1').mobilePhoneNumber({
                    //     defaultPrefix: pais.code
                    // });
                    console.log('arrDepartamentos: ', arrDepartamentos);
                    $('#select-departamento').select2({ data: arrDepartamentos });
                }
                // working
                if (pais.short === 'MEX' || pais.short === 'CHL' || pais.short === 'PAN' || pais.short === 'ARG') {
                    $('#ciudad-cont').show();
                    $('#ciudad-cont').prop("required", true);
                } else {
                    $('#ciudad-cont').hide();
                    $('#ciudad-cont').prop("required", false);
                }
            })
        } else {
            $('#select-departamento').empty();
            $('#select-ciudad').empty();
            $('#inputcode1').val('')
            $('#ciudad-cont').hide();
            $('#ciudad-cont').prop("required", false);
            let arrDepartamentos = new Array;
            arrDepartamentos.unshift({ id: '0', text: 'Departamento...', codigo: '', selected: true });
            $('#select-departamento').select2({ data: arrDepartamentos });
        }

    })
    $('#select-departamento').on("select2:select", (e) => {
        departamento={codigo:'',text:''}; 
        departamento = e.params.data;
        if (departamento.codigo != '') {
            // $('#inputcode1').val(pais.code + ' ' + departamento.codigo);
        }
        formatoNumeros()
        if (departamento.id != '0' && (pais.short === 'MEX' || pais.short === 'CHL' || pais.short === 'PAN' || pais.short === 'ARG')) {
            
            $('#select-ciudad').empty();
            getCiudades(pais, departamento.text).then(arrCiudades => {
                console.log('getCiudades: ', arrCiudades);
                let arrTmp = arrCiudades.map(ciudad => {
                    return { id: ciudad.id, text: ciudad.name, codigo: ciudad.codtel }
                })
                arrCiudades = arrTmp;
                arrCiudades.unshift({ id: '0', text: 'Ciudad...', codigo: '', selected: true });
                $('#select-ciudad').select2({ data: arrCiudades });
            })
        } else {
            $('#select-ciudad').empty();
            let arrCiudades = new Array;
            arrCiudades.unshift({ id: '0', text: 'Ciudad...', codigo: '', selected: true });
            $('#select-ciudad').select2({ data: arrCiudades });
        }

    })
    $('#select-ciudad').on("select2:select", e => {
        ciudad={codigo:'',text:''};
        ciudad = e.params.data;
        formatoNumeros();
        if (ciudad.codigo != '') {
            // $('#inputcode1').val(pais.code + ' ' + ciudad.codigo);
        }
    })
}); 


// function phone(e) {
//     console.log('key pressed');
//     code = $('#inputcode1').val();
//     if (code.substring(0, 1) == '+') {
//         console.log('ok, codigo valido: ', code)
//         let id = "#" + e.id;
//         // console.log('es valido? ',$(id).mobilePhoneNumber('validate'));
//         number = $(id).val();
//         if (libphonenumber.parsePhoneNumber(code + '' + number).isValid()) {//NUMERO COMPLETO Y VALIDO
//             number = libphonenumber.parsePhoneNumber(code + '' + number).formatNational();
//             $(id).prop('maxlength', number.length);
//             sizeNumber = number.length;
//             $(id).val(number);
//             console.log('es valido')
//         }
//         if (sizeNumber != null) {
//             // let tmpNumber = $(id).val();
//             // console.log('formated ',libphonenumber.parsePhoneNumber(code + '' + number).formatNational());
//             // console.log('number: ', tmpNumber.length, 'size: ', sizeNumber)
//             // if (tmpNumber.length+1 >sizeNumber) {
//             //     $(id).val(tmpNumber.substring(0, sizeNumber));
//             // } else {

//             // }
//         }
//     }

// }