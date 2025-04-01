import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

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
      `https://localhost:5000/api/Book/AllBooks?numRecords=${pageSize}&orderBy=${orderBy}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
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
