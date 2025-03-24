import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter() {
  const [catgories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/GetBookCategories'
        );
        const data = await response.json();
        console.log('Fetched categories: ', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-filter">
      <h5>Project types</h5>
      <div className="category-list">
        {catgories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryFilter;
