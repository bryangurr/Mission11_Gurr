import './App.css';
import AllBooksPage from './pages/AllBooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchaseBookPage from './pages/PurchaseBookPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>

      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AllBooksPage />} />
            <Route path="/purchase/:bookID" element={<PurchaseBookPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
