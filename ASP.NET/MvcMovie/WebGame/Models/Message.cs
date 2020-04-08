using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGame.Models
{
  public class Message
  {
    public Guid Id { get; set; }
    public DateTime TimeSent { get; set; }
    public bool IsRead { get; set; }
    // Przeniesione do OnModelCreating (FluentApi).
    //[MaxLength(1000)]
    public string MessageText { get; set; }
    public int SentBy { get; set; }
    //[ForeignKey("SentBy")]
    public User SentByUser { get; set; }
    //[ForeignKey("SentTo")]
    public int? SentTo { get; set; }
    public User SentToUser { get; set; }
  }
}
