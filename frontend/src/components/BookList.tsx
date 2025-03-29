import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import '../styles/bookList.css';

function BookList({
  selectedCategories,
  pageNum,
  setPageNum,
}: {
  selectedCategories: string[];
  pageNum: number;
  setPageNum: (pageNum: number) => void; // Accept setPageNum as a prop
}) {
  const [Books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orderBy, setOrder] = useState<string>('BookID');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?numRecords=${pageSize}&orderBy=${orderBy}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
      // setPageNum(1);
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, orderBy, selectedCategories]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <label>
          Order by:&emsp;
          <select
            onChange={(o) => {
              setOrder(o.target.value);
              setPageNum(1);
            }}
          >
            <option value="BookID">---Select---</option>
            <option value="Title">Title</option>
            <option value="Publisher">Publisher</option>
            <option value="Category">Category</option>
            <option value="Classification">Classification</option>
          </select>
        </label>
      </div>

      <br />
      <br />
      {Books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <h5>{b.author}</h5>
          <div className="card-body">
            <img src={b.imageUrl} /> <br /> <br />
            <button
              className="btn btn-more-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              More Info
            </button>
            <ul className="dropdown-menu">
              <li>Category: {b.category}</li>
              <li>Classification: {b.classification}</li>
              <li>Page count: {b.pageCount}</li>
              <li>Publisher: {b.publisher}</li>
              <li>Price: {b.price}</li>
              <li>ISBN: {b.isbn}</li>
            </ul>
            <button
              className="btn btn-buy"
              onClick={() => navigate(`/purchase/${b.bookID}`)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
      <br />

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:&emsp;
        <select
          value={pageSize}
          onChange={(p) => {
            var oldSize = pageSize;
            const newSize = Number(p.target.value);

            setPageSize(Number(p.target.value));
            // setPageNum(Math.ceil(((pageNum - 1) * oldSize + 1) / newSize));
            setPageNum(Math.ceil(((pageNum - 1) * oldSize + 1) / newSize));
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
