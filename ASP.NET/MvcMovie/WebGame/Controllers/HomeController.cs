using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebGame.Models;

namespace WebGame.Controllers
{
  public class HomeController : Controller
  {
    private WebAppDbContext _context;

    public HomeController(WebAppDbContext ctx)
    {
      _context = ctx;
    }

    public IActionResult Index()
    {
      return View();
    }

    public IActionResult About()
    {
      ViewData["Message"] = "Your application description page.";

      return View();
    }

    public IActionResult Contact()
    {
      ViewData["Message"] = "Your contact page.";

      return View();
    }

    public IActionResult Privacy()
    {
      return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpPost, ActionName("Index")]
    public IActionResult AfterLogin(string loginName, string passwordInput)
    {
      var loginResult = _context.User.Where(u => u.Login == loginName && u.Password == passwordInput).Any();

      if (loginResult)
        return View("~/Users/Index.cshtml", _context.User.ToList());
      else
        return View();
    }
  }
}
