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
        public IActionResult GetAllBooks(int numRecords = 10, int pageNum = 1, string orderBy = "BookID")
        {

            HttpContext.Response.Cookies.Append("FavoriteBookClassification", "Fiction", new CookieOptions
            {
                HttpOnly = true, // means that the cookie is not accessible via JavaScript, only to server
                // generally best for security
                Secure = true, // means that the cookie is only sent over HTTPS
                SameSite = SameSiteMode.Strict, // means that the cookie is not sent with cross-site requests
                Expires = DateTime.Now.AddMinutes(5) // means that the cookie will expire in 5 minutes
            });



            var booksQuery = _context.Books
                .OrderBy(b => EF.Property<object>(b, orderBy));

            var bookList = booksQuery
            .Skip((pageNum - 1) * numRecords)
            .Take(numRecords)
            .ToList();

            //bookList.OrderBy
            //EF.Property<object>(bookList, orderBy);

            var numBooks = _context.Books.Count();

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
    }
}
