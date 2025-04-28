const products = [];

// Cargar los productos de Google Sheets
function loadProducts() {
    google.script.run.withSuccessHandler(function(productsList) {
        productsList.forEach((product, index) => {
            addProductRow(product.name, product.unit, index);
        });
    }).getProductsFromSheet();
}

// Mostrar productos fijos en la tabla
function addProductRow(name, unit, index) {
    const tableBody = document.querySelector("#productTable tbody");
    const row = document.createElement("tr");

    // Descripción
    const productCell = document.createElement("td");
    productCell.textContent = name;
    row.appendChild(productCell);

    // Unidad
    const unitCell = document.createElement("td");
    unitCell.textContent = unit;
    row.appendChild(unitCell);

    // Campo de cantidad
    const quantityCell = document.createElement("td");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = "quantity-" + index;
    quantityInput.min = 0;
    quantityCell.appendChild(quantityInput);
    row.appendChild(quantityCell);

    // Agregar fila a la tabla
    tableBody.appendChild(row);
}

// Función para agregar un nuevo producto
function addNewProduct() {
    const newProduct = document.getElementById("newProduct").value;
    const newUnit = document.getElementById("newUnit").value;

    if (newProduct && newUnit) {
        products.push({ name: newProduct, unit: newUnit });
        addProductRow(newProduct, newUnit, products.length - 1);

        // Limpiar campos de entrada
        document.getElementById("newProduct").value = "";
        document.getElementById("newUnit").value = "";
    }
}

// Función para enviar los datos a Google Sheets
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
        // Enviar los datos a Google Apps Script
        google.script.run.addInventoryData(data);
        alert("Productos registrados exitosamente.");
    } else {
        alert("Por favor ingrese cantidades para al menos un producto.");
    }
}

// Cargar los productos cuando se cargue la página
window.onload = loadProducts;
