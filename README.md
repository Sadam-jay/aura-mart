# AuraMart - Enterprise E-Commerce Web Application

**AuraMart** is an ultra-modern, responsive, full-featured E-commerce Single Page Application (SPA) built with React, Redux Toolkit, and Tailwind CSS. It integrates real-time product data fetching from the **Fake Store API** (`https://fakestoreapi.com/products`), formatted in Indian Rupees (₹), augmented with discount metrics, stock counters, delivery estimates, dynamic search, category filtering, persistent local state management, and unit testing.

---

## 🚀 Key Features

### 1. Fixed Navigation Header

- **Dynamic Search Toggle**: Expandable search input with instant query filtering.
- **Cart Badge Counter**: Real-time counter showing total items added to cart.
- **Wishlist Badge Counter**: Counter reflecting saved items.
- **Notification Dropdown**: Popover showing real-time store offers and shipping alerts.
- **User Profile & Auth Toggle**: Interactive login modal trigger and user avatar dropdown.

### 2. E-Commerce Dashboard (Landing Page)

- **Hero Slider Banner**: Parallax banner with slide navigation, call-to-action buttons, and flash sale badges.
- **Category Filter Pills**: Filter items seamlessly across "Electronics", "Jewelry", "Men's Apparel", and "Women's Apparel".
- **Product Grid**: Dynamic product cards featuring discount percentages, original prices, star ratings, and Wishlist toggles.
- **Value Proposition Bar ("Add What We Sell")**: Showcases company policies (Free Returns, Free Express Shipping, 24/7 Support, Verified Authenticity).
- **FAQ Accordion**: Interactive accordion answering common customer questions.
- **Newsletter Subscription**: Email validation with instant promo code toast reward.

### 3. Product Detail Page (`/product/:id`)

- **Breadcrumb Navigation**: Seamless back-and-forth navigation.
- **Stock Counter & Delivery Calculator**: Real-time stock status badge and estimated arrival date calculation.
- **Quantity Adjuster**: Interactive (+ / -) selector.
- **Smart Cart Toggle**: Button dynamically toggles between **"Add to Cart"** and **"Go to Cart"**.
- **Related Products Grid**: Recommends top items from the same category.

### 4. Shopping Cart (`/cart`) & Wishlist (`/wishlist`)

- **Itemized Breakdown**: Quantity adjusters, unit price calculations, and single-click removal.
- **Financial Calculations**: Subtotal, 8% Estimated Tax, Free Shipping threshold calculation (₹500+), and Total Amount.
- **Persistent LocalStorage**: Cart and Wishlist states persist across page refreshes.
- **Checkout Modal**: Form validation for shipping address and credit card format checks.

---

## 📁 Directory Structure

```
e-commerce/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/            # LoginModal.jsx
│   │   ├── cart/            # CheckoutModal.jsx
│   │   ├── common/          # Header.jsx, Footer.jsx, Toast.jsx, StarRating.jsx
│   │   ├── dashboard/       # HeroBanner.jsx, CategoryFilter.jsx, ValueProps.jsx, FAQAccordion.jsx, Newsletter.jsx
│   │   ├── legal/           # TermsPrivacyModal.jsx
│   │   └── products/        # ProductCard.jsx, ProductGrid.jsx, QuickViewModal.jsx
│   ├── pages/               # Dashboard.jsx, ProductDetails.jsx, CartPage.jsx, WishlistPage.jsx, NotFound.jsx
│   ├── redux/
│   │   ├── slices/          # productsSlice.js, cartSlice.js, wishlistSlice.js, authSlice.js, uiSlice.js
│   │   └── store.js
│   ├── utils/               # formatters.js, localStorage.js, mockData.js
│   ├── __tests__/           # cartSlice.test.js, ProductCard.test.jsx, Header.test.jsx, setup.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Installation & Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sadam-jay/aura-mark.git
   cd aura-mark
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

   Open your browser at `http://localhost:5173`.

4. **Run Unit Tests**:

   ```bash
   npx vitest run
   ```

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```
