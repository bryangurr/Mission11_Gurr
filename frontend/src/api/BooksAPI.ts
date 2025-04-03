import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL =
  'https://bookstore-gurr-api-bebeh3d9gafbbsbp.eastus-01.azurewebsites.net/api/Book';

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

export const UpdateBook = async (
  bookID: number,
  UpdatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UpdatedBook),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating book: ' + error);
    throw error;
  }
};

export const DeleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    //
  } catch (error) {
    console.error('Error deleting book: ' + error);
    throw error;
  }
};
