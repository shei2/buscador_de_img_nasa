document.getElementById("btnBuscar").addEventListener("click", function () {
    const query = document.getElementById("inputBuscar").value;
    if (query) {
      buscarImagenes(query);
    }
  });
  
  function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        mostrarResultados(data);
      })
      .catch(error => {
        console.error("Error al obtener los datos de la API: ", error);
      });
  }
   
  function mostrarResultados(data) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar resultados anteriores

    const items = data.collection.items;

    if (items.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    items.forEach(item => {
        const titulo = item.data[0].title || "Sin título";
        const descripcion = item.data[0].description || "Sin descripción";
        const fecha = item.data[0].date_created || "Sin fecha";
        const imagen = item.links ? item.links[0].href : "https://via.placeholder.com/150";

        // Crear la tarjeta de Bootstrap
        const tarjeta = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card mb-4 shadow-sm">
                    <img src="${imagen}" class="card-img-top" alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text"><small class="text-muted">${fecha}</small></p>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += tarjeta;
    });
}

  