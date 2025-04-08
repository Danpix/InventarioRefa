// Datos de ejemplo para el inventario
const inventoryData = [
    { id: 1, code: "FLT-001", name: "Filtro de Aceite", category: "Filtros", stock: 45, price: 120, sales: 28 },
    { id: 2, code: "BAT-002", name: "Batería 12V", category: "Eléctrico", stock: 12, price: 1200, sales: 5 },
    { id: 3, code: "FRN-003", name: "Frenos Delanteros", category: "Frenos", stock: 20, price: 450, sales: 15 },
    { id: 4, code: "BUJ-004", name: "Bujías de Platino", category: "Motor", stock: 60, price: 85, sales: 32 },
    { id: 5, code: "AMT-005", name: "Amortiguadores", category: "Suspensión", stock: 8, price: 780, sales: 3 },
    { id: 6, code: "ACT-006", name: "Aceite de Transmisión", category: "Lubricantes", stock: 25, price: 220, sales: 18 },
    { id: 7, code: "RAD-007", name: "Radiador", category: "Refrigeración", stock: 5, price: 1500, sales: 2 },
    { id: 8, code: "ALT-008", name: "Alternador", category: "Eléctrico", stock: 7, price: 1800, sales: 4 },
    { id: 9, code: "EMB-009", name: "Kit de Embrague", category: "Transmisión", stock: 10, price: 950, sales: 6 },
    { id: 10, code: "FAR-010", name: "Faros Delanteros", category: "Iluminación", stock: 15, price: 650, sales: 8 },
];

// Clonar los datos para trabajar con ellos
let inventory = [...inventoryData];

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

// Inicializar la aplicación
function init() {
    renderInventory();
    updateStats();
    renderTopSellers();
    renderLowStock();
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda
    searchInput.addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        renderInventory();
    });

    // Filtros de ventas
    highSalesBtn.addEventListener('click', () => {
        state.showHighSales = !state.showHighSales;
        state.showLowSales = false;
        updateFilterButtons();
        renderInventory();
    });

    lowSalesBtn.addEventListener('click', () => {
        state.showLowSales = !state.showLowSales;
        state.showHighSales = false;
        updateFilterButtons();
        renderInventory();
    });

    // Modal de agregar producto
    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

    // Formulario de agregar producto
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: getNextId(),
            code: document.getElementById('code').value,
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            stock: parseInt(document.getElementById('stock').value),
            price: parseFloat(document.getElementById('price').value),
            sales: 0
        };

        inventory.push(newProduct);
        addProductForm.reset();
        addProductModal.style.display = 'none';
        
        renderInventory();
        updateStats();
        renderTopSellers();
        renderLowStock();
    });
}

// Actualizar botones de filtro
function updateFilterButtons() {
    highSalesBtn.classList.toggle('active', state.showHighSales);
    lowSalesBtn.classList.toggle('active', state.showLowSales);
}

// Obtener el siguiente ID para un nuevo producto
function getNextId() {
    return Math.max(...inventory.map(item => item.id)) + 1;
}

// Filtrar inventario basado en búsqueda y filtros
function getFilteredInventory() {
    return inventory.filter(item => {
        const matchesSearch = 
            item.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(state.searchTerm.toLowerCase());

        if (state.showHighSales) {
            return matchesSearch && item.sales > 10;
        } else if (state.showLowSales) {
            return matchesSearch && item.sales <= 10;
        }

        return matchesSearch;
    });
}

// Renderizar tabla de inventario
function renderInventory() {
    const filteredInventory = getFilteredInventory();
    
    if (filteredInventory.length === 0) {
        inventoryBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    No se encontraron productos que coincidan con la búsqueda.
                </td>
            </tr>
        `;
        return;
    }

    inventoryBody.innerHTML = filteredInventory.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td class="text-right">
                ${item.stock < 10 
                    ? `<span class="badge badge-danger">${item.stock}</span>` 
                    : item.stock
                }
            </td>
            <td class="text-right">$${item.price}</td>
            <td class="text-right">${item.sales}</td>
            <td class="text-right">
                <div class="action-buttons">
                    <button class="btn btn-icon btn-outline" onclick="editProduct(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                            <path d="m15 5 4 4"></path>
                        </svg>
                    </button>
                    <button class="btn btn-icon btn-outline" onclick="deleteProduct(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Actualizar estadísticas
function updateStats() {
    const lowStockCount = inventory.filter(item => item.stock < 10).length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
    
    totalInventoryEl.textContent = inventory.length;
    lowStockEl.textContent = lowStockCount;
    inventoryValueEl.textContent = `$${totalValue.toLocaleString()}`;
}

// Renderizar productos más vendidos
function renderTopSellers() {
    const topSellers = [...inventory]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 3);
    
    topSellersList.innerHTML = topSellers.map((item, index) => `
        <div class="top-seller-item">
            <div class="seller-container">
                <div class="seller-rank">${index + 1}</div>
                <div class="seller-info">
                    <span class="seller-name">${item.name}</span>
                    <span class="seller-category">${item.category}</span>
                </div>
            </div>
            <div class="seller-sales">${item.sales} uds.</div>
        </div>
    `).join('');
}

// Renderizar productos con stock bajo
function renderLowStock() {
    const lowStock = inventory
        .filter(item => item.stock < 10)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);
    
    if (lowStock.length === 0) {
        lowStockList.innerHTML = `
            <p class="empty-state">No hay productos con stock bajo.</p>
        `;
        return;
    }
    
    lowStockList.innerHTML = lowStock.map(item => `
        <div class="low-stock-item">
            <div class="stock-info">
                <span class="stock-name">${item.name}</span>
                <span class="stock-code">${item.code}</span>
            </div>
            <span class="badge badge-danger">${item.stock} uds.</span>
        </div>
    `).join('');
}

// Eliminar producto
function deleteProduct(id) {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
        inventory = inventory.filter(item => item.id !== id);
        renderInventory();
        updateStats();
        renderTopSellers();
        renderLowStock();
    }
}

// Editar producto (función de ejemplo, no implementada completamente)
function editProduct(id) {
    alert('Función de editar producto no implementada en este ejemplo');
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);