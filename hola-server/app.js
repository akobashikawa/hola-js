const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const nombres = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hola Server');
});

app.get('/nombres', function(req, res) {
    res.json(nombres);
});

app.get('/nombres/:id', function(req, res) {
    const id = req.params.id;
    const found = nombres.find(x => x.id == id);
    res.json(found);
});

app.post('/nombres', function(req, res) {
    const id = nombres.length + 1;
    const nombre = req.body.nombre;

    const registro = {
        id: id,
        nombre: nombre
    };

    nombres.push(registro);

    res.json(registro);
});

app.put("/nombres/:id", function(req, res) {
    const id = req.params.id;
    const nombreNuevo = req.body.nombre;

    // encontrar
    const _found = nombres.find(x => x.id == id);
    const nombreModificado = {..._found};
    if (nombreModificado) {
        nombreModificado.nombre = nombreNuevo;
    }
    // guardar found en db
    const foundIndex = nombres.findIndex(x => x.id == id);
    nombres.splice(foundIndex, 1, nombreModificado);

    // comprobar
    const resultado = nombres.find(x => x.id == id);
    res.json(resultado);
});

app.delete("/nombres/:id", function(req, res) {
    const id = req.params.id;
    const foundIndex = nombres.findIndex(x => x.id == id);
    nombres.splice(foundIndex, 1);
    const found = nombres.find(x => x.id == id);
    if (found) {
        res.status(400).json({
            message: 'No se pudo eliminar',
            id: id
        });
    } else {
        res.json({
            message: 'Registro eliminado',
            id: id
        });
    }
});


app.listen(3000, function() {
    console.log('Hola server corriendo en el puerto 3000...');
});