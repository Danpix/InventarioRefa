let inventory = [];

// Estado de la aplicación
let state = {
    searchTerm: '',
    showHighSales: false,
    showLowSales: false
};

// Elementos DOM
const searchInput = document.getElementById('search-input');
const highSalesBtn = document.getElementById('high-sales-btn');
const lowSalesBtn = document.getElementById('low-sales-btn');
const addProductBtn = document.getElementById('add-product-btn');
const addProductModal = document.getElementById('add-product-modal');
const closeModal = document.querySelector('.close-modal');
const addProductForm = document.getElementById('add-product-form');
const inventoryBody = document.getElementById('inventory-body');
const topSellersList = document.getElementById('top-sellers-list');
const lowStockList = document.getElementById('low-stock-list');
const totalInventoryEl = document.getElementById('total-inventory');
const lowStockEl = document.getElementById('low-stock');
const inventoryValueEl = document.getElementById('inventory-value');

async function init() {
    await cargarProductosBackend(); // Carga inicial
    renderInventory();
    const inputBuscar = document.getElementById('search-input');
    inputBuscar.addEventListener('input', (e) => {
        filtrarProductos(e.target.value);
    });
    setupEventListeners();
}

async function cargarProductosBackend() {
    try {
        const response = await fetch('/productos/mostrar');
        if (!response.ok) throw new Error('Error al cargar productos del servidor');

        const data = await response.json();
        console.log(data); // Para verificar que llega bien

        inventory = data.map(p => ({
            id: p.id_producto,
            code: p.id_producto,
            name: p.nombre,
            category: p.idTipo,
            stock: p.cantidad,
            price: p.precio,
            sales: 0
        }));

        renderInventory();

    } catch (error) {
        console.error(error);
        alert('No se pudo cargar la lista de productos del servidor.');
    }
}

function renderInventory() {
    inventoryBody.innerHTML = "";

    inventory.forEach((p, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.code}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td class="text-right">${p.stock}</td>
            <td class="text-right">$${p.price.toFixed(2)}</td>
            <td class="text-right">${p.sales}</td>
            <td class="text-right">
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
        `;
        inventoryBody.appendChild(fila);
    });

    setupActionButtons();
}

function setupActionButtons() {
    const editButtons = document.querySelectorAll('.btn-editar');
    const deleteButtons = document.querySelectorAll('.btn-eliminar');

    editButtons.forEach((btn, index) => {
        btn.onclick = () => {
            abrirModalEditar(inventory[index], index);
        };
    });

    deleteButtons.forEach((btn, index) => {
        btn.onclick = () => {
            eliminarProducto(inventory[index].id, index);
        };
    });
}

function abrirModalEditar(product, index) {
    addProductModal.style.display = 'block';

    document.querySelector('#add-product-modal h2').textContent = 'Editar Producto';
    addProductForm.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    document.getElementById('code').value = product.code;
    document.getElementById('name').value = product.name;
    document.getElementById('category').value = product.category;
    document.getElementById('stock').value = product.stock;
    document.getElementById('price').value = product.price;

    addProductForm.onsubmit = async (e) => {
        e.preventDefault();

        // Actualiza datos en el inventario
        inventory[index] = {
            ...inventory[index],
            code: document.getElementById('code').value,
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            stock: parseInt(document.getElementById('stock').value),
            price: parseFloat(document.getElementById('price').value),
            sales: inventory[index].sales
        };

        // Crear objeto con los nombres esperados por el backend
        const productoParaActualizar = {
            id_producto: inventory[index].code,
            nombre: inventory[index].name,
            idTipo: inventory[index].category,
            cantidad: inventory[index].stock,
            precio: inventory[index].price
        };

        try {
            const response = await fetch(`/productos/actualizar/${inventory[index].id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoParaActualizar)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error actualizando producto: ${response.status} ${errorText}`);
            }

            alert('Producto actualizado correctamente');
            addProductModal.style.display = 'none';
            addProductForm.reset();
            renderInventory();
        } catch (error) {
            alert('No se pudo actualizar el producto: ' + error.message);
            console.error(error);
        }
    };
}


async function eliminarProducto(id, index) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
        console.log("Intentando eliminar producto con id:", id);

        const response = await fetch(`/productos/eliminar/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error eliminando producto: ${response.status} ${errorText}`);
        }

        alert('Producto eliminado');
        inventory.splice(index, 1);
        renderInventory();

    } catch (error) {
        alert('No se pudo eliminar el producto: ' + error.message);
        console.error(error);
    }
}

function setupEventListeners() {
    const inputBuscar = document.getElementById('search-input');

    if (!inputBuscar) {
        console.error("No se encontró el input de búsqueda");
        return;
    }

    inputBuscar.addEventListener("input", (e) => {
        console.log("Buscando:", e.target.value); // ← Debug
        filtrarProductos(e.target.value);
    });
    addProductBtn.addEventListener("click", () => {
            addProductModal.style.display = "block";
            document.querySelector('#add-product-modal h2').textContent = 'Agregar Producto';
            addProductForm.querySelector('button[type="submit"]').textContent = 'Agregar';

            addProductForm.reset();

            // Cambiar el submit para agregar producto nuevo
            addProductForm.onsubmit = async (e) => {
                e.preventDefault();

                const producto = {
                    id_producto: document.getElementById("code").value,
                    nombre: document.getElementById("name").value,
                    idTipo: document.getElementById("category").value,
                    cantidad: parseInt(document.getElementById("stock").value),
                    precio: parseFloat(document.getElementById("price").value)
                };

                try {
                    const response = await fetch("/productos/insertar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(producto)
                    });

                    if (response.ok) {
                        alert("Producto guardado exitosamente.");
                        addProductModal.style.display = "none";
                        addProductForm.reset();
                        await cargarProductosBackend(); // recarga tabla
                    } else {
                        alert("Error al guardar el producto.");
                    }
                } catch (error) {
                    console.error("Error de red:", error);
                    alert("Error al comunicarse con el servidor.");
                }
            };
        });

    closeModal.addEventListener("click", () => {
        addProductModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === addProductModal) {
            addProductModal.style.display = "none";
        }
    });
}
function filtrarProductos(texto) {
    const textoMinuscula = texto.toLowerCase();

    const resultados = inventory.filter((producto) =>
        producto.nombre.toLowerCase().includes(textoMinuscula)
    );

    console.log("Productos filtrados:", resultados); // Debug

    renderInventoryFiltrado(resultados);
}
function renderInventoryFiltrado(lista) {
    inventoryBody.innerHTML = "";

    lista.forEach((p, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.code}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td class="text-right">${p.stock}</td>
            <td class="text-right">$${p.price.toFixed(2)}</td>
            <td class="text-right">${p.sales}</td>
            <td class="text-right">
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
        `;
        inventoryBody.appendChild(fila);
    });

    setupActionButtons();
}




// Inicializar todo cuando cargue DOM
document.addEventListener('DOMContentLoaded', init);
