using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Amazon.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Amazon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private BookstoreDBContext _context;
        public BookController(BookstoreDBContext temp) => _context = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int numRecords = 10, int pageNum = 1, string orderBy = "BookID", [FromQuery] List<string>? bookCategories=null)
        {
            // Console.WriteLine($"📢 Received categories: {string.Join(", ", bookCategories ?? new List<string>())}");
            var query = _context.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var booksQuery = query
                .OrderBy(b => EF.Property<object>(b, orderBy));

            var numBooks = query.Count();

            var bookList = booksQuery
            .Skip((pageNum - 1) * numRecords)
            .Take(numRecords)
            .ToList();  

            //bookList.OrderBy
            //EF.Property<object>(bookList, orderBy);

            var stuff = (new // object to hold booklist and total number of books 
            {
                Books = bookList,
                TotalBooks = numBooks
            });

            return Ok(stuff);            
        }

        [HttpGet("GetBook")]
        public IActionResult GetBooksByID(int bookID)
        {
            Console.WriteLine($"Fetching bookID {bookID}");
            Console.WriteLine($"{bookID} found..........");
            var book = _context.Books.FirstOrDefault(b => b.BookID == bookID);
            return Ok(book);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var categoryTypes = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(categoryTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult addBook([FromBody] Book newBook){
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }


        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook) {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            existingBook.ImageUrl = updatedBook.ImageUrl;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{BookID}")]
        public IActionResult DeleteBook (int BookID) {
            var book = _context.Books.Find(BookID);
            if (book == null) {
                return NotFound(new {message="Book not found :("});
            }
            _context.Books.Remove(book);
            return NoContent();
        }

    }
}
