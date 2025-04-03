import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL = 'https://localhost:5000/api/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  orderBy: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllBooks?numRecords=${pageSize}&orderBy=${orderBy}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    if (!response) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books: ', error);
    throw error;
  }
};

export const AddBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book: ' + error);
    throw error;
  }
};
