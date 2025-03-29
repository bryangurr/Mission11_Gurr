import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <h2>Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty... continue shopping?</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Title</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>

            {cart.map((item: CartItem) => (
              <tr key={item.bookID}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </td>
              </tr>
            ))}
          </table>

          // <ul>
          //   {cart.map((item: CartItem) => (
          //     <li key={item.bookID}>
          //       {item.title} : {item.quantity}
          //       <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
          //     </li>
          //   ))}
          // </ul>
        )}
      </div>
      <h3>Total: {totalPrice}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
