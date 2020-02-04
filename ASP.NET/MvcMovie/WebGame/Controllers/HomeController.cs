using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebGame.Models;
using Newtonsoft; 

namespace WebGame.Controllers
{
  public class HomeController : Controller
  {
    private WebAppDbContext _context;
    private object _portNumber;
    public HomeController(WebAppDbContext ctx)
    {
      _context = ctx;
    }

    public IActionResult Index()
    {
      // Jest to głowna strona, także tutaj na pewno pobierzemy port, na którym obecnie pracujemy.
      _portNumber = Request.HttpContext.Connection.LocalPort;
      ViewData["PortNumber"] = _portNumber;
      return View();
    }

    public IActionResult About()
    {
      ViewData["Message"] = "Your application description page.";

      return View();
    }

    public IActionResult Contact(string data)
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

      if (true)
        return View();// View("~/Users/Index.cshtml", _context.User.ToList());
      else
        return View();
    }


    public IActionResult AuthenticateUser(string json)
    {
      dynamic deserializedJson = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
      string login = deserializedJson.username?.ToString();
      string password = deserializedJson.password?.ToString();

      if(login == null || password == null)
      {
        return Json(new { status = false, message = "login or password was null" });
      }

      var loginResult = _context.User.Where(u => u.Login == login && u.Password == password).Any();
      string redirectTo = Url.Action("Index", "Users");
      return Json(new { status = loginResult, redirect = redirectTo });
    }
  }
}
