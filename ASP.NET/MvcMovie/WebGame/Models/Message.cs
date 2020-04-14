using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGame.Models
{
  [JsonObject(MemberSerialization.OptIn)]
  public class Message
  {
    public Guid Id { get; set; }
    [JsonProperty("timeSent")]
    public DateTime TimeSent { get; set; }
    [JsonProperty("isRead")]
    public bool IsRead { get; set; }
    // Przeniesione do OnModelCreating (FluentApi).
    //[MaxLength(1000)]
    [JsonProperty("messageText")]
    public string MessageText { get; set; }
    [JsonProperty("sentBy")]
    public int SentBy { get; set; }
    //[ForeignKey("SentBy")]
    public User SentByUser { get; set; }
    //[ForeignKey("SentTo")]
    [JsonProperty("sentTo")]
    public int? SentTo { get; set; }
    public User SentToUser { get; set; }
  }
}
