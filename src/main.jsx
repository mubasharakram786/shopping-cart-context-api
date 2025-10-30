import { createRoot } from 'react-dom/client'
import { ProductProvider } from './context/ProductContext.jsx'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <CartProvider>
    <App />
    </CartProvider>
  </ProductProvider>
)
