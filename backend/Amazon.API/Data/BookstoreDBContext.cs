using Microsoft.EntityFrameworkCore;

namespace Amazon.API.Data
{
    public class BookstoreDBContext : DbContext
    {
        public BookstoreDBContext(DbContextOptions<BookstoreDBContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
    }
}
