function getDepartamentos(pais) {
    var url = "https://eduktvirtual.com/landingpage/formlandingpage.php";
    let data = new FormData();
    data.append('sw', 'ver_departamentos');
    data.append('pais', pais);
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: data
        }).then(rsp => {
            return rsp.json();
        }).catch(e => console.log('error: ', e))
            .then(respuesta => {
                resolve(respuesta.data);
            })
    })
}
function getCiudades(pais, departamento) {
    var url = "https://eduktvirtual.com/landingpage/formlandingpage.php";
    let data = new FormData();
    data.append('sw', 'ver_ciudades');
    data.append('pais', pais);
    data.append('departamento', departamento);
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: data
        }).then(rsp => {
            return rsp.json();
        }).catch(e => console.log('error: ', e))
            .then(respuesta => {
                resolve(respuesta.data);
            })
    })
}
function formatoNumeros() {
    let radio = document.querySelector("input[name='Radios']:checked").value;
    let inputTfln = $('#inputphone1');
    let inputCodigoTel = $('#inputcode1');
    if (pais) {
        console.log('pais: : ', pais.short);
        switch (pais.short) {
            case 'PE':
                //codigo depa
                var codtel = departamento.codigo || '';
                var placeholder = radio == 'option1' ? ('xxx-xxxx') : 'xxx-xxx-xxx';
                var mascara = radio == 'option1' ? ('000-0000') : '000-000-000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+51) ' + codtel) : '(+51)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'MEX':
                var codtel = ciudad.codigo || '';
                var coddep = departamento.text || '';
                var placeholder = radio == 'option1' ? 'xxxx-xxx' + (coddep == 'Distrito Federal' ? 'x' : '') : 'xxxx-xxx' + (coddep == 'Distrito Federal' ? 'x' : '');
                var mascara = radio == 'option1' ? '0000-000' + (coddep == 'Distrito Federal' ? '0' : '') : '0000-0000' + (coddep == 'Distrito Federal' ? '0' : '');
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+521) ' + codtel) : '(+52) ' + codtel);
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'COL':
                var placeholder = radio == 'option1' ? '(Cod. Ciu.) xxx-xxxx' : 'xxx-xxx-xxxx';
                var mascara = radio == 'option1' ? '000-0000' : '000-000-0000';
                inputCodigoTel.attr('value', '(+57)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'CHL':
                var codtel = ciudad.codigo || '';
                var placeholder = radio == 'option1' ? 'xxxx-xxxx' : 'xxx-xxx-xxx';
                var mascara = radio == 'option1' ? '0000-0000' : '000-0000-000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+56) ' + codtel) : '(+56)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'ARG':
                var codtel = ciudad.codigo || '';
                var placeholder = radio == 'option1' ? 'xxxx-xxxx' : 'xxxx-xxxx-xxxx';
                var mascara = radio == 'option1' ? '0000-0000' : '0000-0000-0000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+54) '+ codtel) : '(+54)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'CRI':
                var placeholder = radio == 'option1' ? '(Cod. Ciu.) xxxx-xxxx' : 'xxx-xxx-xxx';
                var mascara = radio == 'option1' ? '000 0000-0000' : '000-000-000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+506)') : '(+506) 8');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'ECU':
                var placeholder = radio == 'option1' ? '(Cod. Ciu.) xxx-xxxx' : 'x xxx-xxx-xxx';
                var mascara = radio == 'option1' ? '000 000-0000' : '0 000-000-000';
                inputTfln.attr('value', radio == 'option1' ? ('(+593)') : '(+593)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            case 'BOL':
                var placeholder = radio == 'option1' ? '(Cod. Ciu.) xxx-xxxx' : 'xxx-xxx-xxxx';
                var mascara = radio == 'option1' ? '0000 000-0000' : '000-000-0000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+591)') : '(+591)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;

            case 'PAN':
                var placeholder = radio == 'option1' ? '(Cod. Ciu.) xxx-xxxx' : 'xxx-xxx-xxxx';
                var mascara = radio == 'option1' ? '000 000-0000' : '000-000-0000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+507)') : '(+507)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
            default:
                var placeholder = radio == 'option1' ? 'xxx-xxxx' : 'xxx-xxx-xxx';
                var mascara = radio == 'option1' ? '000-0000' : '000-000-000';
                inputCodigoTel.attr('value', radio == 'option1' ? ('(+51)') : '(+51)');
                inputTfln.attr("placeholder", placeholder);
                inputTfln.mask(mascara);
                break;
        }
    }


}
function clearCodes() {
    departamento = { codigo: '', text: '' };
    ciudad = { codigo: '', text: '' };
}