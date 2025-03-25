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
            Console.WriteLine($"📢 Received categories: {string.Join(", ", bookCategories ?? new List<string>())}");
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



        [HttpGet("GetBook/{id}")]
        public IEnumerable<Book> GetBooksByClassification(string classification)
        {
            return _context.Books.Where(b => b.Classification.Contains(classification)).ToList();
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

    }
}
