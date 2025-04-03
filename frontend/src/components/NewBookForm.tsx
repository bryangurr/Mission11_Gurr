import { useState } from 'react';
import { Book } from '../types/Book';
import { AddBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await AddBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label>
        Title:{' '}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>{' '}
      <br />
      <label>
        Author:{' '}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />
      <label>
        Publisher:{' '}
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />{' '}
      <label>
        ISBN:{' '}
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />{' '}
      </label>
      <br />{' '}
      <label>
        {' '}
        Classification:{' '}
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />{' '}
      <label>
        Category:{' '}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />{' '}
      <label>
        Page Count:{' '}
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />
      <label>
        Price: $
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />
      <label>
        Image URL:{' '}
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />{' '}
      </label>{' '}
      <br />
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
