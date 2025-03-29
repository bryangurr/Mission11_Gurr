import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  setSelectedCategories,
  selectedCategories,
  setPageNum,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  setPageNum: (pageNum: number) => void; // Define the setPageNum prop type
}) {
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

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
    setPageNum(1);
  }

  return (
    <div className="category-filter">
      <h5> Categories</h5>
      <div className="category-list">
        {catgories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryFilter;
