// Función para generar colores aleatorios en tonos pasteles (excluyendo blanco)
function getRandomColor() {
    var pasteles = [
      '#a7e8bd', '#ffdda1', '#ff9a8b', '#c8a2c8', '#9b7c94',
      '#6497b1', '#83bcb6', '#ffd700', '#96bb7c', '#ffb6b9',
      '#81b214', '#f29c9f', '#a1caf1', '#f5d0c9', '#ffcccb'
    ];
    
    var color = pasteles[Math.floor(Math.random() * pasteles.length)];
  
    return color !== '#ffffff' ? color : getRandomColor();
  }
  
  // Función para generar colores aleatorios en tonos pasteles (excluyendo blanco)
  function generarColores(cantidad) {
    return Array.from({ length: cantidad }, getRandomColor);
  }
  
  // Función para mostrar el histograma en el canvas
  function mostrarHistograma(contadores, rangoInicio, tamanioIntervalo, colores) {
    var histogramaCanvas = document.getElementById('histograma').getContext('2d');
  
    // Limpiamos el canvas antes de dibujar el nuevo histograma
    histogramaCanvas.clearRect(0, 0, histogramaCanvas.canvas.width, histogramaCanvas.canvas.height);
  
    new Chart(histogramaCanvas, {
      type: 'bar',
      data: {
        labels: Array.from({ length: contadores.length }, (_, i) => `${rangoInicio + i * tamanioIntervalo}-${rangoInicio + (i + 1) * tamanioIntervalo}`),
        datasets: [{
          label: 'Frecuencia',
          data: contadores,
          backgroundColor: colores
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Edades'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frecuencia'
            }
          }
        }
      }
    });
  }
  
  // Espera a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', function () {
    // Genera la muestra y el histograma al cargar la página
    generarMuestra();
    generarHistograma();
  });
  
  // Arreglo que almacenará los datos de la muestra
  var datosMuestra = [];
  
  // Función para generar una muestra aleatoria de clientes
  function generarMuestra() {
    datosMuestra = [];
    for (var i = 0; i < 100; i++) { // Cambiado a 100 clientes
      datosMuestra.push({
        id: i + 1,
        edad: Math.floor(Math.random() * 100)
      });
    }
    mostrarMuestraEnCuadro();
  }
  
  // Función para mostrar la muestra en el cuadro
  function mostrarMuestraEnCuadro() {
    var datosMuestraContainer = document.getElementById('datosMuestra');
    datosMuestraContainer.innerHTML = '';
  
    // Mostrar aproximadamente 15 clientes
    var clientesAMostrar = datosMuestra.slice(0, 15);
  
    for (var i = 0; i < clientesAMostrar.length; i++) {
      var parrafo = document.createElement('p');
      parrafo.textContent = `ID: ${clientesAMostrar[i].id}, Edad: ${clientesAMostrar[i].edad}`;
      datosMuestraContainer.appendChild(parrafo);
    }
  }
  
  // Función para generar el histograma
  function generarHistograma() {
    var rangoInicio = parseInt(document.getElementById('rangoInicio').value);
    var rangoFin = parseInt(document.getElementById('rangoFin').value);
    var tamanioIntervalo = parseInt(document.getElementById('tamanioIntervalo').value);
  
    console.log('Rango Inicio:', rangoInicio);
    console.log('Rango Fin:', rangoFin);
    console.log('Tamaño del Intervalo:', tamanioIntervalo);
  
    var contadores = Array.from({ length: Math.ceil((rangoFin - rangoInicio) / tamanioIntervalo) }, () => 0);
    var colores = generarColores(contadores.length);
  
    console.log('Contadores Iniciales:', contadores);
  
    datosMuestra.forEach(function (cliente) {
      var indice = Math.floor((cliente.edad - rangoInicio) / tamanioIntervalo);
      contadores[indice]++;
    });
  
    console.log('Contadores después de procesar la muestra:', contadores);
  
    mostrarHistograma(contadores, rangoInicio, tamanioIntervalo, colores);
  }
  
  // Función para realetorizar la muestra y actualizar el histograma
  function realetorizarMuestra() {
    generarMuestra();
    generarHistograma();
  }
  