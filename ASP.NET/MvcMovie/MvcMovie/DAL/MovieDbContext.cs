using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MvcMovie.DAL
{
  public class MovieDbContext : DbContext
  {
    public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
    {

    }
    public DbSet<Movie> Movie { get; set; }
  }
}
