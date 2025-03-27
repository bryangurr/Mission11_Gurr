import './App.css';
import AllBooksPage from './pages/AllBooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchaseBookPage from './pages/PurchaseBookPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllBooksPage />} />
          <Route path="/purchase/:bookID" element={<PurchaseBookPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
