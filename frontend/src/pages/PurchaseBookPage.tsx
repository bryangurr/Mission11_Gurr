import { useNavigate, useParams } from 'react-router-dom';
import WelcomeHeader from '../components/WelcomeHeader';
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';

function PurchaseBookPage() {
  const navigate = useNavigate();
  const { bookID } = useParams();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/GetBook?bookID=${Number(bookID)}`
      );
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [bookID]);

  return (
    <>
      <WelcomeHeader />
      <h2>Purchase {book?.title}</h2>
      <div>
        <h4>Author: {book?.author}</h4>
        <h4>Price: {book?.price}</h4>
        <button className="btn btn-info">Add to cart </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
}
export default PurchaseBookPage;
