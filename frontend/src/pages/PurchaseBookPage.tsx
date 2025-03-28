import { useNavigate, useParams } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import CartSummary from '../components/CartSummary';

function PurchaseBookPage() {
  const navigate = useNavigate();
  const { bookID } = useParams();
  const [book, setBook] = useState<Book>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title,
      quantity,
      price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/GetBook?bookID=${Number(bookID)}`
      );
      const data = await response.json();
      setBook(data);
      setTitle(data.title);
      setPrice(data.price);
    };
    fetchBook();
  }, [bookID]);

  return (
    <>
      <CartSummary />
      <SiteHeader />
      <h2>Purchase {book?.title}</h2>
      <div>
        <h4>Author: {book?.author}</h4>
        <h4>Price: {book?.price}</h4>
        <label>
          Quantity: &#9;
          <input
            type="Number"
            placeholder="1"
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
          />
        </label>
        <br />
        <button className="btn btn-info" onClick={handleAddToCart}>
          Add to cart{' '}
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
}
export default PurchaseBookPage;
