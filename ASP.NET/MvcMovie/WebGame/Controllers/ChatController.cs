using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WebGame.Models;

namespace WebGame.Controllers
{
  public class ChatController : Controller
  {
    private WebAppDbContext _context;
    public ChatController(WebAppDbContext context)
    {
      _context = context;
    }

    public IActionResult Index()
    {
      ViewBag.ConnectedUsers = ChatHub.ConnectedUsers;
      return View("~/Views/Chat.cshtml", _context.User.ToList());
    }
    // Stara metoda obsługi wysyłania wiadomości.
    //public string HandleMessage(string message)
    //{
    //  messages.Add(message);
    //  bool success = true;
    //  return "{\"messageCount\": \"" + messages.Count + "\", \"messageProcessedAt\": \"" +
    //    DateTime.Now.ToString("yy-MM-dd hh:mm:ss") + "\", \"messageSendSuccess\": \"" + success + "\" }";
    //}
  }
}
