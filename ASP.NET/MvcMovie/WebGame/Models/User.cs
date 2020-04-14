using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebGame.Models
{
  [JsonObject(MemberSerialization.OptIn)]
  public partial class User
  {
    public User()
    {
      UserToRole = new HashSet<UserToRole>();
    }
    [JsonProperty("id")]
    public int Id { get; set; }
    [JsonProperty("firstName")]
    public string FirstName { get; set; }
    [JsonProperty("lastName")]
    public string LastName { get; set; }
    [JsonProperty("login")]
    public string Login { get; set; }
    public string Password { get; set; }
    public virtual ICollection<UserToRole> UserToRole { get; set; }
    public virtual ICollection<Message> MessagesSent { get; set; }
    public virtual ICollection<Message> MessagesReceived { get; set; }
  }
}
