import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#ccccff',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒<strong>{totalPrice.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
