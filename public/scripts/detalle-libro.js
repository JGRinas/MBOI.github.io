const URL_JSON = 'public/data/catalogo.json';

function obtenerIdLibro() {
    const params = new URLSearchParams(window.location.search);
    return params.get('nombre');
}

function mostrarDetallesLibro(libro) {
    document.getElementById('libro-imagen').src = libro.imagen;
    document.getElementById('libro-nombre').innerText = libro.nombre;
    document.getElementById('libro-descripcion').innerText = `Descripción: ${libro.descripcion}`;
    document.getElementById('libro-isbn').innerText = `ISBN: ${libro.isbn}`;
    document.getElementById('libro-autor').innerText = `Autor: ${libro.autor}`;
    document.getElementById('libro-anio').innerText = `Año: ${libro.anio}`;
    document.getElementById('libro-editorial').innerText = `Editorial: ${libro.editorial}`;
    document.getElementById('libro-lugar').innerText = `Lugar: ${libro.lugar}`;
    document.getElementById('libro-materias').innerText = `Materias: ${libro.materias.join('   --   ')}`;
}

fetch(URL_JSON)
    .then(response => response.json())
    .then(libros => {
        const idLibro = obtenerIdLibro();
        const libroSeleccionado = libros.find(libro => libro.nombre == idLibro);
        if (libroSeleccionado) {
            mostrarDetallesLibro(libroSeleccionado);
        } else {
            alert('Libro no encontrado.');
        }
    })
    .catch(error => {
        console.error("Hubo un error al cargar el archivo JSON:", error);
    });
