const MAXBECAS = 1;
const URL_WEBSERVICE = "https://localhost/smartknowledgesolution/php/api.php";
const URL_WEBSERVICE_EDUKT = "https://eduktvirtual.com/landingpage/formlandingpage.php";
var code; var number; var pais; var departamento = { codigo: '', text: '' }; var ciudad = { codigo: '', text: '' };
var sizeNumber = null;

function enviar() {
    let data = {
        nombre: $('#inputName').val(),
        apellidos: $('#inputLastName').val(),
        correo: $('#inputEmail').val(),
        pais: $('#select-pais').val(),
        departamento: $('#select-departamento').val(),
        ciudad: $('#select-ciudad').val(),
        numero: $('#inputcode1').val() + '' + $('#inputphone1').val(),
        mensaje: $('#message').val(),
        dispositivo: document.querySelector("input[name='Radios']:checked").value=='option1'?'Teléfono':'Celular'
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
            $('#select-departamento').val(),
            $('#select-ciudad').val('');
            $('#inputcode1').val('');
            $('#inputphone1').val('');
            $('#message').val('');
        })
    })
}
/*
valida que el usuario ya tiene una beca
*/
function validarbeca(){
    let emailCustomer = $('#inputEmail').val();
    let datos = {
        m: 'obtenerbecas'
    }
    $.post(URL_WEBSERVICE, datos, function(data, textStatus, xhr) {
        if(data.code == 200){
            let index = null;
            if(Object.keys(data.data).length >= MAXBECAS){
                Swal.fire({
                    title: 'Becas agotadas',
                    text: "Lo sentimos las becas se encuentran agotadas",
                    icon: 'error',
                })
                return false;
            }
            //buscar el usuario
            index = data.data.findIndex((el)=>el.email == emailCustomer);
            if(index != -1 || index != null){
                Swal.fire({
                    title: 'Becas consumida',
                    text: "Lo sentimos pero usted cuenta con una beca en estos momentos",
                    icon: 'warning',
                })
            }else{
                $('#referidoModal').modal('show');
            }
        }else{
            console.error(data.message);
        }
    },'json');
}
function guardarbeca(){
    let datos = {
        m: 'guardarbecas',
        nombres: $('#inputName').val(),
        apellidos: $('#inputLastName').val(),
        email: $('#inputEmail').val(),
        telefono: $('#inputphone1').val(),
        pais: $('#select-pais').val(),
        departamento: $('#select-departamento').val(),
        ciudad: $('#select-ciudad').val(),
        curso: $('#select-cursos option:selected').text(),
        codigo_curso: $('#select-cursos option:selected').data('codigo'),
        tipocurso: $('#select-cursos').val()
    }
    $.post(URL_WEBSERVICE, datos, function(data, textStatus, xhr) {
        if(data.code == 200){
            guardarReferido(data.data.id);
        }else{
            console.error(data.message);
        }
    },'json');
}
function guardarReferido(_idbeca){
    let datos = {
        m: 'guardarreferidobecas',
        idbeca: _idbeca,
        nombres: $('#nameref').val(),
        apellidos: $('#aperef').val(),
        email: $('#emailref').val(),
        telefono: $('#inputphone1ref').val(),
        pais: $('#select-paisref').val(),
        departamento: $('#select-departamentoref').val(),
        ciudad: $('#select-ciudadref').val(),
        curso: $('#select-cursos option:selected').text(),
        tipocurso: $('#select-cursos').val()
    }
    $.post(URL_WEBSERVICE, datos, function(data, textStatus, xhr) {
        if(data.code == 200){
            console.log("referido guardado");
        }else{
            console.error(data.message);
        }
    },'json');
}
/*
Procesa la matricula del cliente automaticamente
*/
function procesarMatricula(){
    let idempresa='LIMA0000001';
    let datos = {};

    guardarbeca(); //guardar info en db de sks al becario y el referido
    switch($('#select-pais').val()){
        case 'Argentina': idempresa = 'ARGENTINA01';
        break;
        case 'Bolivia': idempresa = 'BOLIVIA0001';
        break;
        case 'Chile': idempresa = 'CHILE000001';
        break;
        case 'Colombia': idempresa = 'COLOMBIA001';
        break;
        case 'Costa Rica': idempresa = 'COSTARICA01';
        break;
        case 'Ecuador': idempresa = 'ECUADOR0001';
        break;
        case 'Mexico': idempresa = 'MEXICO00001';
        break;
        case 'Peru': idempresa = 'LIMA0000001';
        break;
    }
    datos = {
        m: 'matricular_edutkvirtual',
        nombres: $('#inputName').val(),
        apellidos: $('#inputLastName').val(),
        email: $('#inputEmail').val(),
        telefono: $('#inputphone1').val(),
        pais: $('#select-pais').val(),
        departamento: $('#select-departamento').val(),
        iddepartamento: departamento.iddepartamento,
        ciudad: $('#select-ciudad').val(),
        curso: $('#select-cursos option:selected').text(),
        codigo_curso: $('#select-cursos option:selected').data('codigo'),
        programa: $('#select-cursos option:selected').data('codigo'),
        idempresa: idempresa,
        tipocurso: $('#select-cursos').val()
    }
    $.post(URL_WEBSERVICE_EDUKT, datos, function(data, textStatus, xhr) {
        if(data.code == 'ok'){
            Swal.fire({
                title: 'Enviado',
                text: "En seguida nos pondremos en contacto contigo!",
                icon: 'success',

            }).then((result) => {
                window.location.reload();
            })
        }else{
            console.error(data.message);
        }
    },'json');
}
/*
valida que el usuario ya tiene una beca
*/
function validate() {
    let code = $('#inputcode1').val();
    let number = $('#inputphone1').val();
    if (number!='') {
        validarbeca();
        return false;
    } else {
        alert("El número que ingresaste no es valido");
        return false;
    }

}


$(document).ready(function () {
    $('#ciudad-cont').hide();
    $('#select-cursos').select2();

    fetch('./json/countries.json', {
        method: 'GET',
    }).then(rsp => {
        return rsp.json();
    }).then(paises => {
        let maped = paises.map(pais => {
            return { id: pais.text, text: pais.text, lista: pais.lista, code: pais.code, short: pais.short }
        })
        maped.unshift({ id: '0', code: "", text: "País...", short: "", lista: [] })
        // console.log(maped);
        let arrDepartamentos = new Array;
        arrDepartamentos.unshift({ id: '0', text: 'Departamento...', codigo: '',iddepartamento:'0', selected: true });
        $('#select-departamento').select2({ data: arrDepartamentos });
        // $('#select-departamento').select2({ data: maped[0].lista });
        $('#select-pais').select2({ data: maped });
    })
    $('body').on('click','#on-matricular',function(){
        let _continue = true;
        //validar campos
        $('#referidoModal').find('.data-required').css('boder','');
        $('#referidoModal').find('.data-required').each(function(index, el) {
            if($(this).val() == '' || $(this).val() == 0){
                $(this).css('boder','2px solid red');
                _continue = false;
            }    
        });
        //verificar
        if(_continue == true){
            $('#referidoModal').modal('hide');
            procesarMatricula();
        }
    });
    $('#select-pais').on("select2:select", (e) => {
        clearCodes();
        pais = e.params.data;
        if (pais.id != '0') {
            formatoNumeros()
            $('#select-departamento').empty();
            $('#select-ciudad').empty();
            console.log('Cambiaste de país! ', pais)

            getDepartamentos(pais.short).then(arrDepartamentos => {
                // console.log('get: ', arrDepartamentos)
                let arrTmp = arrDepartamentos.map(departamento => {
                    if (pais.short === 'PE') {
                        return { id: departamento.nombre, codigo: departamento.codteldep, text: departamento.nombre,iddepartamento:departamento.iddepartamento }
                    } else if (pais.short === 'MEX' || pais.short === 'CHL' || pais.short === 'PAN' || pais.short === 'ARG') {
                        return { id: departamento.district, codigo: "", text: departamento.district,iddepartamento:0 }
                    } else {
                        return { id: departamento.name, codigo: '', text: departamento.name,iddepartamento:0 }
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
                    // console.log('arrDepartamentos: ', arrDepartamentos);
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
        departamento = { codigo: '', text: '' };
        departamento = e.params.data;
        if (departamento.codigo != '') {
            // $('#inputcode1').val(pais.code + ' ' + departamento.codigo);
        }
        formatoNumeros()
        if (departamento.id != '0' && (pais.short === 'MEX' || pais.short === 'CHL' || pais.short === 'PAN' || pais.short === 'ARG')) {

            $('#select-ciudad').empty();
            getCiudades(pais, departamento.text).then(arrCiudades => {
                // console.log('getCiudades: ', arrCiudades);
                let arrTmp = arrCiudades.map(ciudad => {
                    return { id: ciudad.name, text: ciudad.name, codigo: ciudad.codtel }
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
        ciudad = { codigo: '', text: '' };
        ciudad = e.params.data;
        formatoNumeros();
        if (ciudad.codigo != '') {
            // $('#inputcode1').val(pais.code + ' ' + ciudad.codigo);
        }
    })
});

