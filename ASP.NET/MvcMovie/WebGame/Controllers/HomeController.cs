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
using System.Security.Principal;
using NLog;

namespace WebGame.Controllers
{
  public class HomeController : Controller
  {
    private readonly WebAppDbContext _context;
    private object _portNumber;
    private readonly NLog.Logger _logger;
    public HomeController(WebAppDbContext ctx)
    {
      _context = ctx;
      _logger = NLog.LogManager.GetCurrentClassLogger();
    }

    public IActionResult Index()
    {
      // Jest to głowna strona, także tutaj na pewno pobierzemy port, na którym obecnie pracujemy.
      _portNumber = Request.HttpContext.Connection.LocalPort;
      ViewData["PortNumber"] = _portNumber;
      var view = View();
      return view;
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
      _logger.Info("Próba zalogowania z połączenia o identyfikatorze połączenia http: " + this.HttpContext.Connection.Id);

      if (login == null || password == null)
      {
        return Json(new { status = false, message = "login or password was null" });
      }

      var loggedUser = _context.User.Where(u => u.Login == login && u.Password == password).FirstOrDefault();
      var loginResult = loggedUser != null;

      if (loginResult == true)
      {
        try
        {
          this.HttpContext.Session.Set(UserIdProvider.SESSION_LOGIN_KEY, BitConverter.GetBytes(loggedUser.Id));
          _logger.Info($"Zapisano użytkownika {loggedUser.Login} w sesji o ID {HttpContext.Session.Id}");
        }
        catch(Exception ex)
        {
          _logger.Error(ex);
          return Json(new { status = false, message = "Błąd w trakcie logowania." });
        }
        _logger.Info($"Zalogowano pomyślnie użytkownika {loggedUser.Login}.");
        string redirectTo = Url.Action("Index", "Chat");
        return Json(new { status = loginResult, redirect = redirectTo });
      }
      else
      {
        _logger.Info("Logowanie się nie powiodło.");
        return Json(new { status = false, message = "Logowanie nie powiodło się." });
      }
    }
  }
}
