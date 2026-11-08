# SADIM HARDWARE AND ELECTRIC STORE
## Modern Inventory Management System (SPA)

A fast, responsive, and modern Single-Page Application (SPA) designed specifically for **SADIM HARDWARE AND ELECTRIC STORE** to manage stock, products, categories, subcategories, pricing, and valuation — featuring a powerful **Universal Real-Time Search Engine**.

---

### 🚀 How to Run the App

1. Double-click **`start.bat`** or **`index.html`** in this folder to open it in your default web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari, etc.).
2. No build tools, package managers, or server setup required. It runs completely offline/online.

---

### 🔐 Authentication Credentials

| Field | Value |
| :--- | :--- |
| **Username** | `sadim` |
| **Password** | `sadim@1122` |

> *Tip: An **Auto-fill** button is also available directly on the login card for one-click testing.*

---

### 🔍 Advanced Search Engine Capabilities

The application now includes an enhanced search suite:

1. **Universal Global Search Bar (Top Header)**:
   - Located prominently in the top header, accessible from anywhere in the app.
   - **Keyboard Shortcut**: Press **`Ctrl + K`** (or press **`/`**) at any time to instantly focus the search bar.
   - **Search Scope Selector**:
     - `🌐 All Store`: Searches across all 5 departments simultaneously (UPVC, PPR, ELECTRIC, HARDWARE, RANDOM).
     - `📁 Current Department`: Searches only within the active department.
   - **Instant Clear Button**: A convenient `×` icon appears whenever text is typed to clear the search in one click.

2. **Live Instant Search Autocomplete Dropdown**:
   - As you type, a live results dropdown appears showing top matching products across the entire store.
   - Displays highlighted matching text, category badge, subcategory badge, unit price, and stock status badge.
   - **Click-to-Locate**: Clicking any item in the dropdown instantly navigates to that product's department, scrolls it into view, and highlights the row with an amber pulse!
   - Press **`Escape`** or click outside to dismiss the dropdown.

3. **Synchronized In-Table Search Bar**:
   - The table toolbar search input stays synchronized in real time with the top header search bar.
   - Displays real-time matching item counts.

4. **1-Click Quick Search Chips**:
   - Clickable keyword tags right above the table:
     - `Pipe`, `Breaker`, `Wire`, `Nails`, `Tape`, `Elbow`, `BUILTEC`, `Hinge`
   - Clicking any chip filters the inventory immediately.

5. **Search Results Banner**:
   - Shows an active summary banner when a search is in progress:
     *"Showing search results for 'wire' in Entire Store • 1 item found"*.
   - Includes one-click buttons to *"Search in Entire Store"* or *"Clear Search"*.

6. **All Products Consolidated View**:
   - A dedicated **`ALL PRODUCTS`** view at the top of the sidebar lets you browse and search the entire store's inventory on a single page.

---

### 📂 Category & Subcategory Structure

The application strictly implements the 5 store departments and their respective subcategories:

1. **ALL PRODUCTS**: Complete store overview (all items across all departments).
2. **UPVC (Pipes & Fittings)**:
   - `BUILTEC`
   - `HARD`
   - `POLLY`
   - *(Plus an "All UPVC" overview tab)*
3. **PPR (Pipes & Fittings)**:
   - `BUILTEC`
   - `NORMAL`
   - *(Plus an "All PPR" overview tab)*
4. **ELECTRIC**: Direct item view (Circuit Breakers, Copper Wires, etc.).
5. **HARDWARE**: Direct item view (Nails, Hinges, etc.).
6. **RANDOM**: Direct item view (Masking Tape, Super Glue, etc.).

---

### 📦 Initial Catalog Dummy Data

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
