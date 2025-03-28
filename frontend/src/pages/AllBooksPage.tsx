import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import SiteHeader from '../components/SiteHeader';
import CartSummary from '../components/CartSummary';

function AllBooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
export default AllBooksPage;
