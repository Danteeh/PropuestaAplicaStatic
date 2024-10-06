document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular-btn');
    const puntajeTotalSpan = document.getElementById('puntaje-total');
    const culturalGenerico = document.getElementById('cultural-generico');
    const municipioSection = document.getElementById('municipio-section');
    const departamentoSection = document.getElementById('departamento-section');

    culturalGenerico.addEventListener('change', function() {
        const selectedValue = culturalGenerico.value;
        municipioSection.style.display = selectedValue === 'municipio' ? 'block' : 'none';
        departamentoSection.style.display = selectedValue === 'departamento' ? 'block' : 'none';
    });

    calcularBtn.addEventListener('click', async function() {
        const nombreProfesor = document.getElementById('nombre-profesor').value;
        const educacionMinima = parseInt(document.getElementById('educacion-minima').value, 10);
        const educacionAdicional = parseInt(document.getElementById('educacion-adicional').value, 10);
        const educacionNoFormal = parseInt(document.getElementById('educacion-noformal').value, 10);
        const experienciaLocal = parseInt(document.getElementById('experiencia-local').value, 10) || 0;
        const experienciaOtras = parseInt(document.getElementById('experiencia-otras').value, 10) || 0;
        const quintil = parseInt(document.getElementById('quintil').value, 10);

        let puntajeCultural = 0;
        if (culturalGenerico.value === 'municipio') {
            puntajeCultural += parseInt(document.getElementById('nacimiento-municipio').value, 10);
            puntajeCultural += parseInt(document.getElementById('educacion-media-municipio').value, 10);
            puntajeCultural += parseInt(document.getElementById('residencia-municipio').value, 10);
            puntajeCultural += parseInt(document.getElementById('experiencia-municipio').value, 10);
        } else if (culturalGenerico.value === 'departamento') {
            puntajeCultural += parseInt(document.getElementById('nacimiento-departamento').value, 10);
            puntajeCultural += parseInt(document.getElementById('educacion-media-departamento').value, 10);
            puntajeCultural += parseInt(document.getElementById('residencia-departamento').value, 10);
            puntajeCultural += parseInt(document.getElementById('experiencia-departamento').value, 10);
        }

        const puntajeTotal = educacionMinima + educacionAdicional + educacionNoFormal + (experienciaLocal + experienciaOtras) + puntajeCultural + quintil;
        puntajeTotalSpan.textContent = puntajeTotal;

        // Datos a enviar
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombreProfesor);
        datosFormulario.append('puntaje', puntajeTotal);

        scriptURL = 'https://script.google.com/macros/s/AKfycbzhN8pnuOc9LMQj_g_juY64tcL5Voe_5YJcA1plgQ6S8LGDPDSOt78TvPxhg4VJmH-wLg/exec'
        fetch(scriptURL, {
            method: 'POST',
            body: datosFormulario,
            mode: 'no-cors'
        })
            .then(() => alert("Datos enviados exitosamente"))
            .catch(error => console.error('Error al enviar los datos!', error.message));

    });
});
