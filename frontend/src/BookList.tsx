import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [Books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5127/api/Book/AllBooks');
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
        <div id="bookCard">
          <h3>{b.title}</h3>
          <h4>{b.author}</h4>
          <ul>
            <li>{b.category}</li>
            <li>{b.classification}</li>
            <li>{b.pageCount}</li>
            <li>{b.publisher}</li>
            <li>{b.price}</li>
            <li>{b.isbn}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
