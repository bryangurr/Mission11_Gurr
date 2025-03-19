import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [Books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/api/Book/AllBooks');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <br />
      {Books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <h5>{b.author}</h5>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>{b.category}</li>
              <li>{b.classification}</li>
              <li>{b.pageCount}</li>
              <li>{b.publisher}</li>
              <li>{b.price}</li>
              <li>{b.isbn}</li>
            </ul>
          </div>
        </div>
      ))}
      <br />
      <label>
        Results per page:
        <select>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
