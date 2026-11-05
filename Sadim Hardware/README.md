# SADIM HARDWARE AND ELECTRIC STORE
## Modern Inventory Management System (SPA)

A fast, responsive, and modern Single-Page Application (SPA) designed specifically for **SADIM HARDWARE AND ELECTRIC STORE** to manage stock, products, categories, subcategories, pricing, and valuation.

---

### 🚀 How to Run the App

1. Double-click **`index.html`** in this folder to open it directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari, etc.).
2. No installation, build steps, or server setup is required. The app is completely self-contained and ready to run.

---

### 🔐 Authentication Credentials

| Field | Value |
| :--- | :--- |
| **Username** | `sadim` |
| **Password** | `sadim@1122` |

> *Tip: An **Auto-fill** button is also available directly on the login card for one-click testing.*

---

### 📂 Category & Subcategory Structure

The application strictly implements the 5 store departments and their respective subcategories:

1. **UPVC (Pipes & Fittings)**
   - `BUILTEC`
   - `HARD`
   - `POLLY`
   - *(Also includes an "All UPVC" view)*

2. **PPR (Pipes & Fittings)**
   - `BUILTEC`
   - `NORMAL`
   - *(Also includes an "All PPR" view)*

3. **ELECTRIC**
   - Direct item view (Circuit Breakers, Copper Wires, Switches, etc.)

4. **HARDWARE**
   - Direct item view (Nails, Hinges, Fasteners, Tools, etc.)

5. **RANDOM**
   - Direct item view (Masking Tape, Super Glue, Adhesives, Misc items)

---

### ✨ Features & Capabilities

- **Modern UI & Aesthetic**: Clean white/slate background with professional primary blue accents (`#2563eb`), card micro-interactions, and responsive layout for desktop, tablet, and mobile.
- **Dynamic Subcategory Navigation**:
  - Selecting **UPVC** or **PPR** dynamically reveals custom interactive subcategory pill buttons with live item counters.
  - Selecting **ELECTRIC**, **HARDWARE**, or **RANDOM** seamlessly hides subcategory controls and displays items directly.
- **Live Inventory KPI Metrics**:
  - Total Unique Products
  - Total Physical Stock Units
  - Inventory Valuation (Sum of `Price × Quantity` in PKR / Rs.)
  - Low Stock Warning Alert badge (stock ≤ 25 units)
- **Data Table & Grid Cards View**:
  - Toggle between a dense Data Table view and a modern Visual Card Grid.
  - Real-time stock status badges:
    - 🟢 **In Stock** (> 25 units)
    - 🟡 **Low Stock** (1 - 25 units)
    - 🔴 **Out of Stock** (0 units)
- **Quick Stock Adjuster**:
  - `+` and `-` buttons right inside table rows and cards for fast on-the-floor stock updates.
- **Live Search & Status Filtering**:
  - Instant search by item name or ID.
  - Filter by In Stock, Low Stock, or Out of Stock.
- **Modal-Based Add & Edit**:
  - Add New Item modal with dynamic subcategory dropdown that automatically adapts to the chosen category.
  - Edit existing items with pre-filled inputs.
  - Delete items with safety confirmation modal.
- **Local Storage Persistence**:
  - All additions, edits, deletions, and stock adjustments persist automatically in the browser's `localStorage`.
  - A **"Reset Demo Data"** button in the sidebar allows restoring the initial store catalog at any time.
- **CSV Export**:
  - One-click export of current filtered inventory into a `.csv` spreadsheet.

---

### 📦 Initial Catalog Data

The system comes pre-loaded with the specified stock:
- **UPVC (BUILTEC)**:
  - 4-inch UPVC Pipe (Stock: 50, Price: Rs. 1,200)
  - UPVC Elbow (Stock: 100, Price: Rs. 150)
- **UPVC (HARD)**:
  - Hard UPVC T-Joint (Stock: 80, Price: Rs. 200)
- **UPVC (POLLY)**:
  - Polly Socket (Stock: 120, Price: Rs. 90)
- **PPR (BUILTEC)**:
  - 32mm PPR Pipe (Stock: 60, Price: Rs. 800)
- **PPR (NORMAL)**:
  - 25mm Normal Pipe (Stock: 150, Price: Rs. 450)
- **ELECTRIC**:
  - Circuit Breaker 32A (Stock: 40, Price: Rs. 600)
  - Copper Wire Roll 3/29 (Stock: 20, Price: Rs. 4,500)
- **HARDWARE**:
  - Steel Nails 2-inch (Stock: 500, Price: Rs. 2)
  - Door Hinge (Stock: 60, Price: Rs. 120)
- **RANDOM**:
  - Masking Tape (Stock: 30, Price: Rs. 100)
  - Super Glue (Stock: 100, Price: Rs. 50)
