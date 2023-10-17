let libros = [];
document
  .querySelector(".form-control")
  .addEventListener("input", function (event) {
    const palabra = event.target.value;
    const contenedorResultados = document.querySelector(".search-results");

    // Si el campo de búsqueda está vacío, ocultamos el contenedor de resultados.
    if (palabra.trim() === "") {
      contenedorResultados.classList.add("hidden");
      return;
    }

    // Si hay texto en el campo de búsqueda, mostramos el contenedor de resultados.
    contenedorResultados.classList.remove("hidden");

    const librosFiltrados = filtrarLibros(palabra);
    mostrarLibros(librosFiltrados);
  });

fetch("public/data/catalogo.json")
  .then((response) => response.json())
  .then((data) => {
    libros = data;
    mostrarLibros(libros);
  })
  .catch((error) => {
    console.error(error);
  });

function filtrarLibros(palabra) {
  return libros
    .filter((libro) =>
      libro.nombre.toLowerCase().includes(palabra.toLowerCase())
    )
    .slice(0, 3);
}

function mostrarLibros(libros) {
  const contenedor = document.getElementById("resultSearch");
  if (libros.length === 0) {
    contenedor.innerHTML =
      '<li class="card d-flex flex-row text-center align-items-center" style="width: 340px; height: 100px; padding-left: 35px"> <h5 class="card-title text-start">No se encontraron resultados</h5></li>';
    return;
  }
  const items = libros
    .map((libro) => {
      return `
        <li style="list-style: none;" >
          <a class="card d-flex flex-row text-center align-items-center" style="width: 340px; height: 100px" href="detalle-libro.html?nombre=${encodeURIComponent(libro.nombre)}" class="libro-link"> 
           <img src="${libro.imagen}" class="card-img-top w-25 p-1" style="height: 100px; margin-right: 20px" alt="${libro.nombre}">
           <h5 class="card-title text-start" style="font-size: 16px">${libro.nombre}</h5>
          </a>
        </li>
      `;
    })
    .join("");
  contenedor.innerHTML = items;
}

document
  .querySelector(".form-control")
  .addEventListener("input", function (event) {
    const palabra = event.target.value;
    const librosFiltrados = filtrarLibros(palabra);
    mostrarLibros(librosFiltrados);
  });
