using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Amazon.API.Data;
    
namespace Amazon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private BookstoreDBContext _context;
        public BookController(BookstoreDBContext temp) => _context = temp;

        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetAllBooks()
        {
            return _context.Books.ToList();
        }

        [HttpGet("GetBook/{id}")]
        public IEnumerable<Book> GetBooksByClassification(string classification)
        {
            return _context.Books.Where(b => b.Classification.Contains(classification)).ToList();
        }
    }
}
