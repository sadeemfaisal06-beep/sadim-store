/**
 * SADIM HARDWARE AND ELECTRIC STORE - Inventory Management System
 * Single-Page Application (SPA) State Management & Controller
 */

// -------------------------------------------------------------
// CONSTANTS & INITIAL CONFIGURATION
// -------------------------------------------------------------
const AUTH_CREDENTIALS = {
  username: 'sadim',
  password: 'sadim@1122'
};

const CATEGORIES = {
  UPVC: {
    name: 'UPVC',
    label: 'UPVC Pipes & Fittings',
    icon: 'pipe',
    subcategories: ['BUILTEC', 'HARD', 'POLLY']
  },
  PPR: {
    name: 'PPR',
    label: 'PPR Pipes & Fittings',
    icon: 'wrench-tube',
    subcategories: ['BUILTEC', 'NORMAL']
  },
  ELECTRIC: {
    name: 'ELECTRIC',
    label: 'Electric & Wiring',
    icon: 'bolt',
    subcategories: []
  },
  HARDWARE: {
    name: 'HARDWARE',
    label: 'Hardware & Tools',
    icon: 'hammer',
    subcategories: []
  },
  RANDOM: {
    name: 'RANDOM',
    label: 'Random & Misc',
    icon: 'boxes',
    subcategories: []
  }
};

// Initial dummy data as requested
const INITIAL_INVENTORY_DATA = [
  // UPVC (BUILTEC)
  {
    id: 'upvc-b-1',
    name: '4-inch UPVC Pipe',
    category: 'UPVC',
    subcategory: 'BUILTEC',
    price: 1200,
    stock: 50,
    createdAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'upvc-b-2',
    name: 'UPVC Elbow',
    category: 'UPVC',
    subcategory: 'BUILTEC',
    price: 150,
    stock: 100,
    createdAt: '2026-11-01T10:15:00Z'
  },
  // UPVC (HARD)
  {
    id: 'upvc-h-1',
    name: 'Hard UPVC T-Joint',
    category: 'UPVC',
    subcategory: 'HARD',
    price: 200,
    stock: 80,
    createdAt: '2026-11-01T11:00:00Z'
  },
  // UPVC (POLLY)
  {
    id: 'upvc-p-1',
    name: 'Polly Socket',
    category: 'UPVC',
    subcategory: 'POLLY',
    price: 90,
    stock: 120,
    createdAt: '2026-11-01T11:30:00Z'
  },
  // PPR (BUILTEC)
  {
    id: 'ppr-b-1',
    name: '32mm PPR Pipe',
    category: 'PPR',
    subcategory: 'BUILTEC',
    price: 800,
    stock: 60,
    createdAt: '2026-11-02T09:00:00Z'
  },
  // PPR (NORMAL)
  {
    id: 'ppr-n-1',
    name: '25mm Normal Pipe',
    category: 'PPR',
    subcategory: 'NORMAL',
    price: 450,
    stock: 150,
    createdAt: '2026-11-02T09:45:00Z'
  },
  // ELECTRIC
  {
    id: 'elec-1',
    name: 'Circuit Breaker 32A',
    category: 'ELECTRIC',
    subcategory: '',
    price: 600,
    stock: 40,
    createdAt: '2026-11-03T14:20:00Z'
  },
  {
    id: 'elec-2',
    name: 'Copper Wire Roll 3/29',
    category: 'ELECTRIC',
    subcategory: '',
    price: 4500,
    stock: 20,
    createdAt: '2026-11-03T15:00:00Z'
  },
  // HARDWARE
  {
    id: 'hard-1',
    name: 'Steel Nails 2-inch',
    category: 'HARDWARE',
    subcategory: '',
    price: 2,
    stock: 500,
    createdAt: '2026-11-04T08:30:00Z'
  },
  {
    id: 'hard-2',
    name: 'Door Hinge',
    category: 'HARDWARE',
    subcategory: '',
    price: 120,
    stock: 60,
    createdAt: '2026-11-04T09:10:00Z'
  },
  // RANDOM
  {
    id: 'rand-1',
    name: 'Masking Tape',
    category: 'RANDOM',
    subcategory: '',
    price: 100,
    stock: 30,
    createdAt: '2026-11-05T10:00:00Z'
  },
  {
    id: 'rand-2',
    name: 'Super Glue',
    category: 'RANDOM',
    subcategory: '',
    price: 50,
    stock: 100,
    createdAt: '2026-11-05T10:15:00Z'
  }
];

// Local Storage Keys
const STORAGE_KEYS = {
  AUTH: 'sadim_inventory_auth',
  ITEMS: 'sadim_inventory_items_v1'
};

// -------------------------------------------------------------
// APP STATE
// -------------------------------------------------------------
const state = {
  isAuthenticated: false,
  currentUser: null,
  activeCategory: 'UPVC', // 'UPVC', 'PPR', 'ELECTRIC', 'HARDWARE', 'RANDOM'
  activeSubcategory: 'ALL', // 'ALL' or specific subcategory
  searchQuery: '',
  stockFilter: 'ALL', // 'ALL', 'LOW', 'OUT', 'IN'
  viewMode: 'table', // 'table' or 'grid'
  items: [],
  modalMode: 'add', // 'add' or 'edit'
  editingItemId: null,
  deletingItemId: null,
  sidebarOpen: false
};

// -------------------------------------------------------------
// STORAGE HELPERS
// -------------------------------------------------------------
function loadItemsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_INVENTORY_DATA));
      return [...INITIAL_INVENTORY_DATA];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...INITIAL_INVENTORY_DATA];
  } catch (err) {
    console.error('Error loading inventory data:', err);
    return [...INITIAL_INVENTORY_DATA];
  }
}

function saveItemsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(state.items));
  } catch (err) {
    console.error('Error saving inventory data:', err);
  }
}

function checkAuthSession() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEYS.AUTH);
    if (saved) {
      const auth = JSON.parse(saved);
      if (auth && auth.username === AUTH_CREDENTIALS.username) {
        state.isAuthenticated = true;
        state.currentUser = auth.username;
      }
    }
  } catch (e) {
    console.warn('Session read error:', e);
  }
}

function saveAuthSession(username) {
  sessionStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ username, loggedAt: new Date().toISOString() }));
}

function clearAuthSession() {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
}

// -------------------------------------------------------------
// NOTIFICATIONS / TOAST
// -------------------------------------------------------------
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgStyles = {
    success: 'bg-emerald-600 text-white shadow-emerald-500/20',
    error: 'bg-rose-600 text-white shadow-rose-500/20',
    info: 'bg-blue-600 text-white shadow-blue-500/20',
    warning: 'bg-amber-600 text-white shadow-amber-500/20'
  };

  const icons = {
    success: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    warning: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-medium text-sm border border-white/10 transition-all transform toast-enter ${bgStyles[type] || bgStyles.info}`;
  toast.innerHTML = `
    ${icons[type] || icons.info}
    <div class="flex-1">${message}</div>
    <button class="opacity-70 hover:opacity-100 ml-2" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// -------------------------------------------------------------
// AUTHENTICATION LOGIC
// -------------------------------------------------------------
function handleLogin(e) {
  if (e) e.preventDefault();

  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const errorBox = document.getElementById('login-error');
  const errorText = document.getElementById('login-error-text');

  const username = usernameInput ? usernameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
    if (errorBox) errorBox.classList.add('hidden');
    state.isAuthenticated = true;
    state.currentUser = username;
    saveAuthSession(username);
    showToast(`Welcome back, ${username}! Store dashboard ready.`, 'success');
    renderApp();
  } else {
    if (errorBox && errorText) {
      errorText.textContent = 'Invalid credentials. Please use username: sadim and the assigned password.';
      errorBox.classList.remove('hidden');
      
      // Shake effect
      const card = document.getElementById('login-card');
      if (card) {
        card.classList.add('animate-bounce');
        setTimeout(() => card.classList.remove('animate-bounce'), 500);
      }
    }
  }
}

function handleLogout() {
  state.isAuthenticated = false;
  state.currentUser = null;
  clearAuthSession();
  showToast('Logged out securely.', 'info');
  renderApp();
}

function fillDemoCredentials() {
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  if (usernameInput) usernameInput.value = AUTH_CREDENTIALS.username;
  if (passwordInput) passwordInput.value = AUTH_CREDENTIALS.password;
  const errorBox = document.getElementById('login-error');
  if (errorBox) errorBox.classList.add('hidden');
  showToast('Demo credentials inserted: sadim / sadim@1122', 'info');
}

// -------------------------------------------------------------
// FILTERING & ITEM QUERY LOGIC
// -------------------------------------------------------------
function getFilteredItems() {
  return state.items.filter(item => {
    // 1. Category check
    if (item.category !== state.activeCategory) return false;

    // 2. Subcategory check (if active category has subcategories)
    const categoryMeta = CATEGORIES[state.activeCategory];
    if (categoryMeta && categoryMeta.subcategories.length > 0) {
      if (state.activeSubcategory !== 'ALL' && item.subcategory !== state.activeSubcategory) {
        return false;
      }
    }

    // 3. Search query check
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchSub = (item.subcategory || '').toLowerCase().includes(q);
      const matchPrice = item.price.toString().includes(q);
      if (!matchName && !matchSub && !matchPrice) return false;
    }

    // 4. Stock status filter
    if (state.stockFilter === 'LOW') {
      return item.stock > 0 && item.stock <= 25;
    } else if (state.stockFilter === 'OUT') {
      return item.stock === 0;
    } else if (state.stockFilter === 'IN') {
      return item.stock > 0;
    }

    return true;
  });
}

// -------------------------------------------------------------
// STATS CALCULATIONS
// -------------------------------------------------------------
function calculateCategoryStats() {
  const itemsInActiveCategory = state.items.filter(i => i.category === state.activeCategory);
  const totalItems = itemsInActiveCategory.length;
  const totalStockUnits = itemsInActiveCategory.reduce((sum, i) => sum + (Number(i.stock) || 0), 0);
  const totalInventoryValue = itemsInActiveCategory.reduce((sum, i) => sum + ((Number(i.price) || 0) * (Number(i.stock) || 0)), 0);
  const lowStockCount = itemsInActiveCategory.filter(i => i.stock > 0 && i.stock <= 25).length;
  const outOfStockCount = itemsInActiveCategory.filter(i => i.stock === 0).length;

  return {
    totalItems,
    totalStockUnits,
    totalInventoryValue,
    lowStockCount,
    outOfStockCount
  };
}

// -------------------------------------------------------------
// ITEM CRUD ACTIONS
// -------------------------------------------------------------
function openAddItemModal(defaultCategory = null, defaultSubcategory = null) {
  state.modalMode = 'add';
  state.editingItemId = null;

  const modal = document.getElementById('item-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('item-form');
  const categorySelect = document.getElementById('item-category-input');
  const subcategorySelect = document.getElementById('item-subcategory-input');

  if (title) title.textContent = 'Add New Inventory Item';
  if (form) form.reset();

  const chosenCategory = defaultCategory || state.activeCategory;
  if (categorySelect) categorySelect.value = chosenCategory;
  
  updateModalSubcategoryOptions(chosenCategory);

  if (subcategorySelect && defaultSubcategory && defaultSubcategory !== 'ALL') {
    subcategorySelect.value = defaultSubcategory;
  }

  if (modal) modal.classList.remove('hidden');
  document.getElementById('item-name-input')?.focus();
}

function openEditItemModal(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  state.modalMode = 'edit';
  state.editingItemId = itemId;

  const modal = document.getElementById('item-modal');
  const title = document.getElementById('modal-title');
  const nameInput = document.getElementById('item-name-input');
  const categorySelect = document.getElementById('item-category-input');
  const subcategorySelect = document.getElementById('item-subcategory-input');
  const priceInput = document.getElementById('item-price-input');
  const stockInput = document.getElementById('item-stock-input');

  if (title) title.textContent = `Edit Item: ${item.name}`;
  if (nameInput) nameInput.value = item.name;
  if (categorySelect) categorySelect.value = item.category;

  updateModalSubcategoryOptions(item.category);

  if (subcategorySelect) subcategorySelect.value = item.subcategory || '';
  if (priceInput) priceInput.value = item.price;
  if (stockInput) stockInput.value = item.stock;

  if (modal) modal.classList.remove('hidden');
}

function closeItemModal() {
  const modal = document.getElementById('item-modal');
  if (modal) modal.classList.add('hidden');
  state.editingItemId = null;
}

function updateModalSubcategoryOptions(category) {
  const subcategoryContainer = document.getElementById('subcategory-container');
  const subcategorySelect = document.getElementById('item-subcategory-input');
  const subcategoryHelp = document.getElementById('subcategory-help');

  if (!subcategorySelect) return;

  const config = CATEGORIES[category];
  subcategorySelect.innerHTML = '';

  if (config && config.subcategories && config.subcategories.length > 0) {
    if (subcategoryContainer) subcategoryContainer.classList.remove('opacity-50');
    subcategorySelect.disabled = false;
    if (subcategoryHelp) subcategoryHelp.textContent = `Select subcategory for ${category}`;

    config.subcategories.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      subcategorySelect.appendChild(opt);
    });
  } else {
    subcategorySelect.disabled = true;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'None (Direct Category Item)';
    subcategorySelect.appendChild(opt);
    if (subcategoryHelp) subcategoryHelp.textContent = 'No subcategories required for this category';
    if (subcategoryContainer) subcategoryContainer.classList.add('opacity-50');
  }
}

function handleSaveItem(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('item-name-input');
  const categorySelect = document.getElementById('item-category-input');
  const subcategorySelect = document.getElementById('item-subcategory-input');
  const priceInput = document.getElementById('item-price-input');
  const stockInput = document.getElementById('item-stock-input');

  const name = nameInput ? nameInput.value.trim() : '';
  const category = categorySelect ? categorySelect.value : '';
  const subcategory = (!subcategorySelect.disabled && subcategorySelect.value) ? subcategorySelect.value : '';
  const price = priceInput ? parseFloat(priceInput.value) : 0;
  const stock = stockInput ? parseInt(stockInput.value, 10) : 0;

  if (!name) {
    showToast('Please enter an item name', 'error');
    nameInput?.focus();
    return;
  }

  if (isNaN(price) || price < 0) {
    showToast('Please enter a valid non-negative price', 'error');
    priceInput?.focus();
    return;
  }

  if (isNaN(stock) || stock < 0) {
    showToast('Please enter a valid non-negative stock quantity', 'error');
    stockInput?.focus();
    return;
  }

  if (state.modalMode === 'edit' && state.editingItemId) {
    // Update existing item
    const index = state.items.findIndex(i => i.id === state.editingItemId);
    if (index !== -1) {
      state.items[index] = {
        ...state.items[index],
        name,
        category,
        subcategory,
        price,
        stock,
        updatedAt: new Date().toISOString()
      };
      saveItemsToStorage();
      showToast(`Updated "${name}" successfully`, 'success');
    }
  } else {
    // Create new item
    const newItem = {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      category,
      subcategory,
      price,
      stock,
      createdAt: new Date().toISOString()
    };
    state.items.unshift(newItem);
    saveItemsToStorage();
    showToast(`Added "${name}" to ${category}${subcategory ? ' (' + subcategory + ')' : ''}`, 'success');

    // Automatically navigate to the category of the newly added item for immediate visibility
    state.activeCategory = category;
    if (subcategory) {
      state.activeSubcategory = subcategory;
    } else {
      state.activeSubcategory = 'ALL';
    }
  }

  closeItemModal();
  renderApp();
}

function promptDeleteItem(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  state.deletingItemId = itemId;
  const modal = document.getElementById('delete-modal');
  const itemNameEl = document.getElementById('delete-item-name');
  if (itemNameEl) itemNameEl.textContent = `"${item.name}" (${item.category}${item.subcategory ? ' - ' + item.subcategory : ''})`;
  if (modal) modal.classList.remove('hidden');
}

function closeDeleteModal() {
  const modal = document.getElementById('delete-modal');
  if (modal) modal.classList.add('hidden');
  state.deletingItemId = null;
}

function confirmDeleteItem() {
  if (!state.deletingItemId) return;
  const item = state.items.find(i => i.id === state.deletingItemId);
  const itemName = item ? item.name : 'Item';

  state.items = state.items.filter(i => i.id !== state.deletingItemId);
  saveItemsToStorage();
  closeDeleteModal();
  showToast(`Deleted "${itemName}" from inventory`, 'info');
  renderApp();
}

function quickAdjustStock(itemId, delta) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const newStock = Math.max(0, Number(item.stock) + delta);
  item.stock = newStock;
  saveItemsToStorage();
  showToast(`Updated stock for "${item.name}": ${newStock} units`, 'info');
  renderApp();
}

function resetSampleData() {
  if (confirm('Are you sure you want to restore the initial store dummy data? Any custom items added will be reset.')) {
    state.items = JSON.parse(JSON.stringify(INITIAL_INVENTORY_DATA));
    saveItemsToStorage();
    showToast('Reset inventory to initial demo catalog.', 'success');
    renderApp();
  }
}

function exportToCSV() {
  const filtered = getFilteredItems();
  if (filtered.length === 0) {
    showToast('No items to export in current view', 'warning');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Item ID,Item Name,Category,Subcategory,Price (PKR),Stock Quantity,Total Value (PKR)\r\n';

  filtered.forEach(item => {
    const row = [
      `"${item.id}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      `"${item.subcategory || 'N/A'}"`,
      item.price,
      item.stock,
      item.price * item.stock
    ].join(',');
    csvContent += row + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `sadim_inventory_${state.activeCategory.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${filtered.length} items to CSV`, 'success');
}

// -------------------------------------------------------------
// UI RENDERING ENGINE
// -------------------------------------------------------------
function renderApp() {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');

  if (!state.isAuthenticated) {
    if (loginView) loginView.classList.remove('hidden');
    if (dashboardView) dashboardView.classList.add('hidden');
    return;
  }

  if (loginView) loginView.classList.add('hidden');
  if (dashboardView) dashboardView.classList.remove('hidden');

  renderSidebarNavigation();
  renderSubcategoriesNav();
  renderKPIStats();
  renderBreadcrumbAndControls();
  renderItemList();
}

// Render Sidebar Navigation
function renderSidebarNavigation() {
  const container = document.getElementById('sidebar-nav-items');
  if (!container) return;

  const categories = Object.keys(CATEGORIES);
  let html = '';

  categories.forEach(catKey => {
    const cat = CATEGORIES[catKey];
    const isActive = state.activeCategory === catKey;
    const count = state.items.filter(i => i.category === catKey).length;

    let iconSvg = '';
    if (catKey === 'UPVC') {
      iconSvg = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
    } else if (catKey === 'PPR') {
      iconSvg = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
    } else if (catKey === 'ELECTRIC') {
      iconSvg = `<svg class="w-5 h-5 flex-shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>`;
    } else if (catKey === 'HARDWARE') {
      iconSvg = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`;
    } else {
      // RANDOM
      iconSvg = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`;
    }

    const activeClasses = isActive
      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-semibold'
      : 'text-slate-700 hover:bg-slate-100/90 font-medium';

    const countBadgeClasses = isActive
      ? 'bg-white/20 text-white'
      : 'bg-slate-200/70 text-slate-700';

    html += `
      <button 
        onclick="switchCategory('${catKey}')" 
        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${activeClasses}">
        <div class="flex items-center gap-3">
          <span class="${isActive ? 'text-white' : 'text-slate-500'}">${iconSvg}</span>
          <span class="tracking-wide">${catKey}</span>
        </div>
        <span class="text-xs px-2 py-0.5 rounded-full font-mono ${countBadgeClasses}">
          ${count}
        </span>
      </button>
    `;
  });

  container.innerHTML = html;
}

// Render Subcategories Sub-navigation (Pills/Tabs)
function renderSubcategoriesNav() {
  const container = document.getElementById('subcategories-container');
  const tabsList = document.getElementById('subcategory-tabs');
  if (!container || !tabsList) return;

  const currentCategoryMeta = CATEGORIES[state.activeCategory];
  const subcategories = currentCategoryMeta ? currentCategoryMeta.subcategories : [];

  if (!subcategories || subcategories.length === 0) {
    // ELECTRIC, HARDWARE, RANDOM do not have subcategories
    container.classList.add('hidden');
    tabsList.innerHTML = '';
    return;
  }

  container.classList.remove('hidden');

  // Count total for "ALL"
  const totalCount = state.items.filter(i => i.category === state.activeCategory).length;
  const isAllActive = state.activeSubcategory === 'ALL';

  let html = `
    <button 
      onclick="switchSubcategory('ALL')" 
      class="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
        isAllActive
          ? 'bg-slate-900 text-white shadow-sm'
          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
      }">
      <span>All ${state.activeCategory}</span>
      <span class="px-1.5 py-0.5 text-[11px] rounded-full font-mono ${isAllActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">
        ${totalCount}
      </span>
    </button>
  `;

  subcategories.forEach(sub => {
    const isSubActive = state.activeSubcategory === sub;
    const subCount = state.items.filter(i => i.category === state.activeCategory && i.subcategory === sub).length;

    html += `
      <button 
        onclick="switchSubcategory('${sub}')" 
        class="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
          isSubActive
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        }">
        <span>${sub}</span>
        <span class="px-1.5 py-0.5 text-[11px] rounded-full font-mono ${isSubActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700'}">
          ${subCount}
        </span>
      </button>
    `;
  });

  tabsList.innerHTML = html;
}

// Render Top KPI Stats
function renderKPIStats() {
  const stats = calculateCategoryStats();

  const totalItemsEl = document.getElementById('stat-total-items');
  const totalStockEl = document.getElementById('stat-total-stock');
  const totalValueEl = document.getElementById('stat-total-value');
  const lowStockEl = document.getElementById('stat-low-stock');

  if (totalItemsEl) totalItemsEl.textContent = stats.totalItems;
  if (totalStockEl) totalStockEl.textContent = stats.totalStockUnits.toLocaleString();
  if (totalValueEl) totalValueEl.textContent = `Rs. ${stats.totalInventoryValue.toLocaleString()}`;
  if (lowStockEl) {
    lowStockEl.textContent = stats.lowStockCount;
    const alertBadge = document.getElementById('stat-low-stock-alert');
    if (alertBadge) {
      if (stats.lowStockCount > 0) {
        alertBadge.classList.remove('hidden');
      } else {
        alertBadge.classList.add('hidden');
      }
    }
  }
}

// Render Breadcrumb & Controls
function renderBreadcrumbAndControls() {
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const breadcrumbSub = document.getElementById('breadcrumb-subcategory');
  const activeTitle = document.getElementById('active-category-title');
  const activeDesc = document.getElementById('active-category-desc');

  if (breadcrumbCategory) breadcrumbCategory.textContent = state.activeCategory;

  const currentMeta = CATEGORIES[state.activeCategory];
  const hasSub = currentMeta && currentMeta.subcategories.length > 0;

  if (breadcrumbSub) {
    if (hasSub && state.activeSubcategory !== 'ALL') {
      breadcrumbSub.classList.remove('hidden');
      breadcrumbSub.textContent = ` / ${state.activeSubcategory}`;
    } else {
      breadcrumbSub.classList.add('hidden');
    }
  }

  if (activeTitle) {
    let title = state.activeCategory;
    if (hasSub && state.activeSubcategory !== 'ALL') {
      title += ` - ${state.activeSubcategory}`;
    }
    activeTitle.textContent = title;
  }

  if (activeDesc) {
    if (hasSub && state.activeSubcategory !== 'ALL') {
      activeDesc.textContent = `Showing items under ${state.activeCategory} > ${state.activeSubcategory}`;
    } else {
      activeDesc.textContent = `Showing all inventory items in ${state.activeCategory}`;
    }
  }
}

// Render Main Item List (Table or Grid)
function renderItemList() {
  const filtered = getFilteredItems();
  const tableContainer = document.getElementById('inventory-table-container');
  const gridContainer = document.getElementById('inventory-grid-container');
  const emptyState = document.getElementById('empty-inventory-state');
  const resultsCount = document.getElementById('results-count-text');

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  if (state.viewMode === 'grid') {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (gridContainer) {
      gridContainer.classList.remove('hidden');
      renderGridCards(filtered, gridContainer);
    }
  } else {
    if (gridContainer) gridContainer.classList.add('hidden');
    if (tableContainer) {
      tableContainer.classList.remove('hidden');
      renderTableRows(filtered);
    }
  }
}

// Render Table Rows
function renderTableRows(items) {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  let html = '';

  items.forEach((item, index) => {
    // Stock Status Badge
    let stockBadge = '';
    let stockColorClass = '';
    if (item.stock === 0) {
      stockBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Out of Stock
      </span>`;
      stockColorClass = 'text-rose-600 font-bold';
    } else if (item.stock <= 25) {
      stockBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Low Stock
      </span>`;
      stockColorClass = 'text-amber-700 font-bold';
    } else {
      stockBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> In Stock
      </span>`;
      stockColorClass = 'text-slate-800 font-semibold';
    }

    const subcategoryBadge = item.subcategory 
      ? `<span class="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200">${item.subcategory}</span>`
      : `<span class="text-xs text-slate-400 italic">None</span>`;

    const totalVal = (Number(item.price) || 0) * (Number(item.stock) || 0);

    html += `
      <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-200/80 group">
        <td class="py-3.5 px-4 text-xs font-mono text-slate-400">
          #${index + 1}
        </td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 border border-blue-100">
              ${item.name.substring(0, 2)}
            </div>
            <div>
              <div class="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">${escapeHtml(item.name)}</div>
              <div class="text-xs text-slate-400">ID: ${item.id}</div>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            ${item.category}
          </span>
        </td>
        <td class="py-3.5 px-4">
          ${subcategoryBadge}
        </td>
        <td class="py-3.5 px-4">
          <span class="font-mono-numbers font-semibold text-slate-900 text-sm">
            Rs. ${(Number(item.price) || 0).toLocaleString()}
          </span>
        </td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-2">
            <span class="font-mono-numbers text-sm ${stockColorClass}">
              ${item.stock}
            </span>
            <div class="inline-flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button 
                onclick="quickAdjustStock('${item.id}', -1)" 
                title="Decrease 1 unit"
                class="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-slate-900 transition-all text-xs font-bold ${item.stock === 0 ? 'opacity-30 cursor-not-allowed' : ''}" 
                ${item.stock === 0 ? 'disabled' : ''}>
                -
              </button>
              <button 
                onclick="quickAdjustStock('${item.id}', 1)" 
                title="Increase 1 unit"
                class="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-slate-900 transition-all text-xs font-bold">
                +
              </button>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4">
          ${stockBadge}
        </td>
        <td class="py-3.5 px-4">
          <span class="font-mono-numbers text-xs text-slate-600">
            Rs. ${totalVal.toLocaleString()}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button 
              onclick="openEditItemModal('${item.id}')" 
              title="Edit Item"
              class="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
            <button 
              onclick="promptDeleteItem('${item.id}')" 
              title="Delete Item"
              class="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Render Grid Cards View
function renderGridCards(items, container) {
  let html = '';

  items.forEach(item => {
    let stockBadge = '';
    if (item.stock === 0) {
      stockBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Out of Stock</span>`;
    } else if (item.stock <= 25) {
      stockBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Low: ${item.stock}</span>`;
    } else {
      stockBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Stock: ${item.stock}</span>`;
    }

    const subcategoryText = item.subcategory ? ` • ${item.subcategory}` : '';

    html += `
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              ${item.category}${subcategoryText}
            </span>
            ${stockBadge}
          </div>

          <h3 class="text-base font-bold text-slate-900 mb-1 leading-snug">${escapeHtml(item.name)}</h3>
          <p class="text-xs text-slate-400 mb-4 font-mono">ID: ${item.id}</p>

          <div class="bg-slate-50 rounded-xl p-3 mb-4 flex items-center justify-between border border-slate-100">
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Unit Price</div>
              <div class="text-base font-bold text-slate-900 font-mono-numbers">Rs. ${(Number(item.price) || 0).toLocaleString()}</div>
            </div>
            <div class="text-right">
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Quantity</div>
              <div class="text-base font-bold text-slate-800 font-mono-numbers">${item.stock} units</div>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="inline-flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button 
              onclick="quickAdjustStock('${item.id}', -1)" 
              class="w-6 h-6 flex items-center justify-center rounded text-slate-700 hover:bg-white text-xs font-bold" 
              ${item.stock === 0 ? 'disabled' : ''}>-</button>
            <span class="px-2 text-xs font-semibold font-mono text-slate-700">${item.stock}</span>
            <button 
              onclick="quickAdjustStock('${item.id}', 1)" 
              class="w-6 h-6 flex items-center justify-center rounded text-slate-700 hover:bg-white text-xs font-bold">+</button>
          </div>

          <div class="flex items-center gap-1">
            <button 
              onclick="openEditItemModal('${item.id}')" 
              class="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
            <button 
              onclick="promptDeleteItem('${item.id}')" 
              class="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// -------------------------------------------------------------
// EVENT HANDLERS & NAVIGATION SWITCHERS
// -------------------------------------------------------------
function switchCategory(catKey) {
  if (!CATEGORIES[catKey]) return;
  state.activeCategory = catKey;
  state.activeSubcategory = 'ALL';
  state.searchQuery = '';
  
  // Clear search input in UI
  const searchInput = document.getElementById('search-items-input');
  if (searchInput) searchInput.value = '';

  // Close mobile sidebar if open
  closeMobileSidebar();

  renderApp();
}

function switchSubcategory(subKey) {
  state.activeSubcategory = subKey;
  renderApp();
}

function handleSearch(e) {
  state.searchQuery = e.target.value.trim();
  renderItemList();
}

function setStockFilter(filter) {
  state.stockFilter = filter;
  renderItemList();
}

function setViewMode(mode) {
  state.viewMode = mode;
  const tableBtn = document.getElementById('view-mode-table-btn');
  const gridBtn = document.getElementById('view-mode-grid-btn');

  if (mode === 'table') {
    tableBtn?.classList.add('bg-white', 'shadow-sm', 'text-blue-600');
    tableBtn?.classList.remove('text-slate-500');
    gridBtn?.classList.remove('bg-white', 'shadow-sm', 'text-blue-600');
    gridBtn?.classList.add('text-slate-500');
  } else {
    gridBtn?.classList.add('bg-white', 'shadow-sm', 'text-blue-600');
    gridBtn?.classList.remove('text-slate-500');
    tableBtn?.classList.remove('bg-white', 'shadow-sm', 'text-blue-600');
    tableBtn?.classList.add('text-slate-500');
  }

  renderItemList();
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('main-sidebar');
  const overlay = document.getElementById('mobile-sidebar-overlay');
  state.sidebarOpen = !state.sidebarOpen;

  if (state.sidebarOpen) {
    sidebar?.classList.remove('-translate-x-full');
    overlay?.classList.remove('hidden');
  } else {
    sidebar?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('main-sidebar');
  const overlay = document.getElementById('mobile-sidebar-overlay');
  state.sidebarOpen = false;
  sidebar?.classList.add('-translate-x-full');
  overlay?.classList.add('hidden');
}

function togglePasswordVisibility() {
  const pwdInput = document.getElementById('login-password');
  const eyeIcon = document.getElementById('pwd-eye-icon');
  if (!pwdInput) return;

  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    if (eyeIcon) {
      eyeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>`;
    }
  } else {
    pwdInput.type = 'password';
    if (eyeIcon) {
      eyeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
    }
  }
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -------------------------------------------------------------
// APP INITIALIZATION
// -------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // 1. Check existing session
  checkAuthSession();

  // 2. Load inventory items
  state.items = loadItemsFromStorage();

  // 3. Attach category dropdown listener for modal
  const categorySelect = document.getElementById('item-category-input');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      updateModalSubcategoryOptions(e.target.value);
    });
  }

  // 4. Attach search listener
  const searchInput = document.getElementById('search-items-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // 5. Initial Render
  renderApp();
});
