# Components Library

This folder contains reusable UI components, hooks, and utilities for the ShopHub e-commerce project.

## 📁 Structure

```
components/
├── UI Components           # Reusable UI components
│   ├── Button.jsx
│   ├── ProductCard.jsx
│   ├── StarRating.jsx
│   ├── LoadingSpinner.jsx
│   ├── Dropdown.jsx
│   ├── FormElements.jsx
│   └── CommonComponents.jsx
├── Layout/                 # Layout components
│   ├── Header.jsx
│   └── Footer.jsx
├── hooks/                  # Custom React hooks
│   └── index.js
├── utils/                  # Utility functions
│   └── index.js
└── index.js               # Main export file
```

## 🧩 UI Components

### Core Components
- **Button** - Customizable button with variants, sizes, loading states, and animations
- **StarRating** - Interactive star rating component with read-only and editable modes
- **ProductCard** - Complete product card with image, details, actions, and animations
- **Badge** - Small status indicators with different variants and sizes
- **LoadingSpinner** - Various loading indicators (inline, page, component level)
- **FormElements** - Input, TextArea, Select components with validation states
- **Toast** - Notification system with different types and auto-dismiss
- **Modal** - Flexible modal system with confirmation dialogs
- **Pagination** - Complete pagination component with customizable display
- **Dropdown** - Dropdown menu with positioning options

## 🪝 Hooks

### State Management
- **useToast** - Toast notification management
- **useLocalStorage** - Persistent local storage with sync across tabs
- **usePagination** - Complete pagination state management
- **useSearch** - Search functionality with multiple field support
- **useFilter** - Advanced filtering with multiple criteria

## 🛠️ Utils

### Formatting & Display
- **formatPrice** - Currency formatting with internationalization
- **formatDate** - Date formatting with relative time support
- **formatNumber** - Number formatting with locale support
- **truncateText** - Text truncation with customizable suffix
- **capitalize** - Text capitalization utilities

### Validation
- **validateEmail** - Email format validation
- **validatePassword** - Strong password validation with custom rules
- **validatePhoneNumber** - Phone number format validation
- **validateCreditCard** - Credit card validation with Luhn algorithm

### Performance & Utilities
- **debounce** - Function debouncing for performance
- **throttle** - Function throttling for rate limiting
- **generateId** - Unique ID generation
- **slugify** - URL-friendly string conversion

## 📋 Usage Examples

### Using Components
```jsx
import { Button, ProductCard, StarRating, Modal, Input } from '../components';

// Button with different variants
<Button variant="primary" size="lg" loading={isLoading}>
  Add to Cart
</Button>

// Product card with all features
<ProductCard
  product={productData}
  onAddToCart={handleAddToCart}
  onToggleWishlist={handleToggleWishlist}
  isInWishlist={wishlist.includes(product.id)}
/>

// Form elements
<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```

### Using Hooks
```jsx
import { useToast, usePagination, useSearch, useLocalStorage } from '../components';

// Toast notifications
const { showSuccess, showError, toasts, removeToast } = useToast();

// Pagination
const {
  currentPage,
  goToPage,
  getTotalPages,
  paginateArray
} = usePagination(1, 10);

// Search
const { searchTerm, setSearchTerm, filteredItems } = useSearch(products, ['name', 'description']);

// Local storage
const [user, setUser] = useLocalStorage('user', null);
```

### Using Utilities
```jsx
import { formatPrice, validateEmail, debounce, slugify } from '../components';

// Format prices
const formattedPrice = formatPrice(99.99, 'USD'); // "$99.99"

// Validation
const isValid = validateEmail('user@example.com'); // true

// Debounced search
const debouncedSearch = debounce(searchFunction, 300);

// Create URL-friendly slugs
const slug = slugify('Product Name Here'); // "product-name-here"
```

## 🎨 Design System

### Color Variants
- **primary**: Orange gradient (brand colors)
- **secondary**: Gray tones
- **success**: Green for positive actions
- **danger**: Red for destructive actions
- **warning**: Yellow for caution
- **info**: Blue for information

### Sizes
- **sm**: Small (compact layouts)
- **md**: Medium (default)
- **lg**: Large (prominent elements)
- **xl**: Extra large (hero elements)

## 🔧 Benefits

1. **No Duplication** - Single source of truth for all components
2. **Consistency** - Unified design system across the application
3. **Reusability** - DRY principle with shared components and utilities
4. **Maintainability** - Centralized component logic
5. **Performance** - Optimized with proper memoization
6. **Developer Experience** - Clear APIs and comprehensive documentation
7. **Type Safety** - Consistent prop interfaces

This unified components library eliminates the confusion between multiple folders and provides a clean, scalable architecture for the ShopHub application.
