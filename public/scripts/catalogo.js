fetch("public/data/catalogo.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("catalogo");

    const cards = data
      .map((book) => {
        return `
           <div class="d-flex flex-column card align-content-between m-1" style="width: 18rem; min-height: 600px">
           <img src="${book.imagen}" class="card-img-top" style="width: 100%; height: 450px; object-fit: cover;" alt="...">
            <div class="p-3" style="width: 100%; height: 250px; align-content: space-between;">
              <div class="h-75">
              <h5 class="card-title">${book.nombre}</h5>
              <p class="card-text">${book.autor}</p>
              <p class="card-text">${book.descripcion}</p>
              </div>   
              <div class="d-flex justify-content-center">
                 <a href="detalle-libro.html?nombre=${encodeURIComponent(book.nombre)}" class="btn btn-primary">Ver más</a>
              </div>
            </div>
           </div>
            `;
      })
      .join("");

    container.innerHTML = cards;
  })
  .catch((err) => {
    console.error(err);
  });
