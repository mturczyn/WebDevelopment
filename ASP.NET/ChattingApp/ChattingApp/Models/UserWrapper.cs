using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChattingApp.Models
{
  public class UserWrapper
  {
    public int Id { get; set; }
    public string Login { get; set; }
    public string FullName { get; set; }
    public UserWrapper(int id, string login, string fullName) =>
      (Id, Login, FullName) = (id, login, fullName);
    public UserWrapper(User user)
    {
      Id = user.Id;
      Login = user.Login;
    }
  }
}
