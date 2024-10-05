// Simulamos almacenamiento de datos en JSON
let profesoresData = [];

document.getElementById("calcular-btn").addEventListener("click", function() {
    // Obtener los valores de las secciones de Educación
    let educacionMinima = parseInt(document.getElementById("educacion-minima").value) || 0;
    let educacionAdicional = parseInt(document.getElementById("educacion-adicional").value) || 0;
    let educacionNoFormal = parseInt(document.getElementById("educacion-noformal").value) || 0;

    // Sumar puntos de Educación
    let puntosEducacion = educacionMinima + educacionAdicional + educacionNoFormal;

    // Obtener los valores de las secciones de Experiencia
    let experienciaLocal = parseInt(document.getElementById("experiencia-local").value) || 0;
    let experienciaOtras = parseInt(document.getElementById("experiencia-otras").value) || 0;

    // Sumar puntos de Experiencia (máximo 30 puntos)
    let puntosExperiencia = (experienciaLocal * 6) + (experienciaOtras * 3);
    if (puntosExperiencia > 30) {
        puntosExperiencia = 30;  // Limitar a 30 puntos máximo
    }

    // Obtener los valores de Culturales y Genéricos
    let puntosCulturales = 0;
    let seleccionCultural = document.getElementById("cultural-generico").value;

    if (seleccionCultural === "municipio") {
        puntosCulturales += parseInt(document.getElementById("nacimiento-municipio").value) || 0;
        puntosCulturales += parseInt(document.getElementById("educacion-media-municipio").value) || 0;
        puntosCulturales += parseInt(document.getElementById("residencia-municipio").value) || 0;
        puntosCulturales += parseInt(document.getElementById("experiencia-municipio").value) || 0;
    } else if (seleccionCultural === "departamento") {
        puntosCulturales += parseInt(document.getElementById("nacimiento-departamento").value) || 0;
        puntosCulturales += parseInt(document.getElementById("educacion-media-departamento").value) || 0;
        puntosCulturales += parseInt(document.getElementById("residencia-departamento").value) || 0;
        puntosCulturales += parseInt(document.getElementById("experiencia-departamento").value) || 0;
    }

    // Obtener puntos de Quintiles Superiores
    let quintil = parseInt(document.getElementById("quintil").value) || 0;
    puntosCulturales += quintil;

    // Sumar todos los puntos
    let puntajeTotal = puntosEducacion + puntosExperiencia + puntosCulturales;

    // Mostrar el puntaje total
    document.getElementById("puntaje-total").innerText = puntajeTotal;
});

// Lógica para mostrar secciones dinámicas de "Por Municipio" o "Por Departamento"
document.getElementById("cultural-generico").addEventListener("change", function() {
    let seleccion = this.value;
    document.getElementById("municipio-section").style.display = (seleccion === "municipio") ? "block" : "none";
    document.getElementById("departamento-section").style.display = (seleccion === "departamento") ? "block" : "none";
});

// Guardar datos en Google Sheets
document.getElementById("guardar-json-btn").addEventListener("click", function() {
    let nombreProfesor = document.getElementById("nombre-profesor").value;

    if (!nombreProfesor) {
        alert("Por favor, ingrese el nombre del profesor.");
        return;
    }

    // Obtener los datos del formulario
    let puntajeTotal = document.getElementById("puntaje-total").innerText;

    // Crear objeto para enviar
    let data = {
        nombre: nombreProfesor,
        puntaje: puntajeTotal
    };

    // Enviar datos a Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbxVgSG8Xy96RFtZhjwQx0ZmtHecWnz5q19akfDgG4znUYBzDi80kZPZ3K5P41mDZjNHGw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                alert("Datos guardados en Google Sheets.");
            } else {
                alert("Error al guardar los datos en Google Sheets.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al enviar los datos.");
        });
});


// Generar Excel desde JSON
document.getElementById("generar-excel-btn").addEventListener("click", function() {
    // Crear un archivo CSV simple
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Puntaje\n"; // Encabezados

    profesoresData.forEach(function(profesor) {
        csvContent += profesor.nombre + "," + profesor.puntaje + "\n";
    });

    // Descargar archivo
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "profesores_puntajes.csv");
    document.body.appendChild(link);

    link.click();
});
