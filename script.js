// Función para enviar los datos a Google Apps Script
function submitData() {
    const data = [];
    const today = new Date().toLocaleDateString(); // Fecha de hoy

    // Obtener las cantidades de los productos
    products.forEach((product, index) => {
        const quantity = document.getElementById("quantity-" + index).value;
        if (quantity > 0) {
            data.push({
                name: product.name,
                unit: product.unit,
                quantity: quantity,
                date: today
            });
        }
    });

    if (data.length > 0) {
        // Llamada AJAX para enviar los datos al backend de Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbzyEQRm0LRjTrU-1TNArKvlC5SUXT3Aeiht5ix3m3PTYto8UWebEY0yZhJVN0AubgQBNg/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos enviados correctamente:', data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Por favor ingrese cantidades para al menos un producto.");
    }
}


