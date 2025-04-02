import { useState } from 'react';
import { Book } from '../types/Book';

const NewBookForm = () => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
    imageUrl: '',
  });
  return (
    <form>
      <h2>Add New Book</h2>
      <label>
        Title: <input type="text" />
      </label>
      <label>
        Author: <input type="text" />{' '}
      </label>
      <label>
        Publisher: <input type="text" />{' '}
      </label>{' '}
      <label>
        ISBN: <input type="text" />{' '}
      </label>{' '}
      <label>
        Classification: <input type="text" />{' '}
      </label>{' '}
      <label>
        Category: <input type="text" />{' '}
      </label>{' '}
      <label>
        Page Count: <input type="number" />{' '}
      </label>
      <label>
        Price: $<input type="number" />{' '}
      </label>
      <label>
        Image URL: <input type="text" />{' '}
      </label>
      <button type="submit">Add Book</button>
      <button type="button">Cancel</button>
    </form>
  );
};

export default NewBookForm;
