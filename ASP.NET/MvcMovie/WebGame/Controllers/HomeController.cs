using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebGame.Models;
using Newtonsoft;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

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


    public IActionResult AuthenticateUser(string json)
    {
      dynamic deserializedJson = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
      string login = deserializedJson.username?.ToString();
      string password = deserializedJson.password?.ToString();

      if(login == null || password == null)
      {
        return Json(new { status = false, message = "login or password was null" });
      }

      var loggedUser = _context.User.Where(u => u.Login == login && u.Password == password).FirstOrDefault();
      var loginResult = loggedUser != null;

      string redirectTo = Url.Action("Index", "Message");
      return Json(new { status = loginResult, redirect = redirectTo });
    }
  }
}
