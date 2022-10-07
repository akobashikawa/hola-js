const btnHola = document.getElementById('btn-hola');

function saludo(nombre) {
    document.getElementById('saludo').innerHTML = 'Hola ' + nombre;
}

btnHola.onclick = function() {
    const nombre = document.getElementById('input-nombre').value;
    axios.post('http://localhost:3000/nombres', {nombre: nombre})
        .then(resultado => {
            const data = resultado.data;
            console.log(data);
            listarNombres();
        })
        .catch(error => {
            console.log(error);
        });
    saludo(nombre);
    listarNombres();
};


const btnListarNombres = document.getElementById('btn-listar-nombres');
const listaNombres = document.getElementById('lista-nombres');

function listarNombres() {
    axios.get('http://localhost:3000/nombres')
        .then(resultado => {
            const data = resultado.data;
            let html = '';
            data.forEach(element => {
                html = html + '<li>' 
                    + element.id + ': ' 
                    + '<input type="text" value="' + element.nombre + '" id="input-nombre-' + element.id + '">'
                    + '<button onclick="guardarNombre(' + element.id + ')">Guardar</button>'
                    + '<button onclick="eliminarNombre(' + element.id + ')">Eliminar</button>'
                    + '</li>';
            });
            listaNombres.innerHTML = html;
        })
        .catch(error => {
            console.log(error);
        })
}

btnListarNombres.onclick = function() {
    listarNombres();
};

function eliminarNombre(id) {
    axios.delete('http://localhost:3000/nombres/' + id)
        .then(resultado => {
            const data = resultado.data;
            console.log(data);
            listarNombres();
        })
        .catch(error => {
            console.log(error);
        });
}

function guardarNombre(id) {
    const nombre = document.getElementById('input-nombre-' + id).value;
    axios.put('http://localhost:3000/nombres/' + id, {nombre: nombre})
        .then(resultado => {
            const data = resultado.data;
            console.log(data);
            listarNombres();
        })
        .catch(error => {
            console.log(error);
        });
}