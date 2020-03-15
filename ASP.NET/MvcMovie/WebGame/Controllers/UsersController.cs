using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGame.Models;

namespace WebGame.Controllers
{
  public class UsersController : Controller
  {
    private WebAppDbContext _context;

    public UsersController(WebAppDbContext ctx)
    {
      _context = ctx;
    }
    public IActionResult Index()
    {
      return View(_context.User.ToList());
    }

    public IActionResult Create()
    {
      ViewBag.Roles = _context.Role.ToList();
      return View();
    }

    [HttpPost]
    public IActionResult Create([Bind("FirstName,LastName,Login,Password")]User user)
    {
      if (_context.User.Any(u => u.Login == user.Login))
      {
        ViewBag.UserExists = true;
        return View("Create");
      }

      var role = _context.Role.Where(r => r.RoleName == "User").FirstOrDefault();
      user.UserToRole.Add(new UserToRole() { User = user, Role = role });
      _context.User.Add(user);
      _context.SaveChanges();
      return View("~/Views/Home/Index.cshtml");
    }
  }
}
