using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MvcMovie.Models
{
  public class Movie
  {
    public int Id { get; set; }
    public string Title { get; set;}
    [DataType(DataType.Date)]
    [Display(Name = "Release date")]
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; }
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }
    [StringLength(10, MinimumLength = 3)]
    public string Rating { get; set; }
  }
}
