function calcular() {
    // Obtener el valor de años de experiencia
    const experiencia = parseInt(document.getElementById('input1').value);
    const pregado  =parseInt(document.getElementById('combo1').value);
    const posgrado = parseInt(document.getElementById('combo2').value);
    let suma =0
    // Validar si la entrada es un número válido
    if (isNaN(experiencia)) {
        alert("Por favor, ingresa un valor numérico en los años de experiencia.");
        return;
    }
    // Realizar el cálculo: si (experiencia * 5) < 55, entonces el resultado es (experiencia * 5), si no, el resultado es 55
    let resultado = experiencia * 5;
    if (resultado > 55) {
        resultado = 55;
    }
    document.getElementById('output1').textContent = "Experiencia: " + resultado;
    suma+=resultado
    if(experiencia > 11 && posgrado ===4 ) {
        resultado = experiencia-11;
        document.getElementById('outputE').textContent = "Equivalencias: " +resultado;
    }else {
        document.getElementById('outputE').textContent = "Equivalencias: " +0;
    }

    if (pregado === 1) {

        document.getElementById('output2').textContent = "Estudios realizados pregrado: " + 5;
        suma+=5
    }else if (pregado === 2) {

        document.getElementById('output2').textContent = "Estudios realizados pregrado: " + 10;
        suma+=10
    }else if (pregado === 3) {

        document.getElementById('output2').textContent = "Estudios realizados pregrado: " + 20;
        suma+=20
    }else if (pregado === 4) {

        document.getElementById('output2').textContent = "Estudios realizados pregrado: " + 10;
        suma+=10

    }else{
        document.getElementById('output2').textContent = "Estudios realizados pregrado: " + 0;

    }

    if(posgrado === 1) {
        document.getElementById('output3').textContent = "Estudios realizados posgrado: " + 10;
        suma+=10
    }else if (posgrado === 2) {
        document.getElementById('output3').textContent = "Estudios realizados posgrado: " + 20;
        suma+=20
    }else if (posgrado === 3) {
        document.getElementById('output3').textContent="Estudios realizados posgrado: " + 25;
        suma+=25
    }else{
        document.getElementById('output3').textContent="Estudios realizados posgrado: " + 0;
    }

    // Obtener el texto del div que contiene "Equivalencias: X"
    const textoEquivalencias = document.getElementById('outputE').textContent;

    // Extraer solo el número de la cadena de texto
    // Esto buscará el primer número que encuentre en el texto
    const equivalencias = parseInt(textoEquivalencias.match(/\d+/)[0]);

    if (isNaN(equivalencias)) {
        alert("No se ha encontrado un valor numérico válido en las equivalencias.");
        return;
    }
    // Hacer los cálculos con el valor extraído
    if (equivalencias >= 3 && equivalencias <= 5) {
        document.getElementById('output4').textContent = "Equivalencias: 10";
        suma += 10;
    } else if (equivalencias >= 6 && equivalencias <= 8) {
        document.getElementById('output4').textContent = "Equivalencias: 20";
        suma += 20;
    } else if (equivalencias >= 9) {
        document.getElementById('output4').textContent = "Equivalencias: 25";
        suma += 25;
    } else {
        document.getElementById('output4').textContent = "Equivalencias: 0";
    }

    // Mostrar el total
    document.getElementById('output5').textContent = "Total: " + suma;

}
