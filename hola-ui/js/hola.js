const btnHola = document.getElementById('btn-hola');

function saludo(nombre) {
    document.getElementById('saludo').innerHTML = 'Hola ' + nombre;
}

btnHola.onclick = function() {
    const nombre = document.getElementById('input-nombre').value;
    saludo(nombre);
};


const btnListarNombres = document.getElementById('btn-listar-nombres');
const listaNombres = document.getElementById('lista-nombres');

btnListarNombres.onclick = function() {
    axios.get('http://localhost:3000/nombres')
        .then(resultado => {
            const data = resultado.data;
            let html = '';
            data.forEach(element => {
                html = html + '<li>' + element.id + ': ' + element.nombre + '</li>';
            });
            listaNombres.innerHTML = html;
        })
        .catch(error => {
            console.log(error);
        })
};