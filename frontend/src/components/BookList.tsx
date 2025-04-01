import { SetStateAction, useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import '../styles/bookList.css';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orderBy, setOrder] = useState<string>('BookID');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          orderBy,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
      // setPageNum(1);
    };
    loadBooks();
  }, [pageSize, pageNum, orderBy, selectedCategories]);

  if (loading) return <p>Loading books...</p>;

  if (error) return <p className="text-red-500">Error: {error}</p>;

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

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize: SetStateAction<number>) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
