using System;
using System.Collections.Generic;

namespace WebGame.Models
{
  public partial class User
  {
    public User()
    {
      UserToRole = new HashSet<UserToRole>();
    }

    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public virtual ICollection<UserToRole> UserToRole { get; set; }
    public virtual ICollection<Message> MessagesSent { get; set; }
    public virtual ICollection<Message> MessagesReceived { get; set; }
  }
}
