import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import SiteHeader from '../components/SiteHeader';
import CartSummary from '../components/CartSummary';

function AllBooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  return (
    <div className="container">
      <CartSummary />

      <div className="row">
        <SiteHeader />
      </div>
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            setPageNum={setPageNum}
          />
        </div>
        <div className="col-md-9">
          <BookList
            selectedCategories={selectedCategories}
            pageNum={pageNum} // Pass pageNum to BookList
            setPageNum={setPageNum} // Pass setPageNum to BookList
          />
        </div>
      </div>
    </div>
  );
}
export default AllBooksPage;
