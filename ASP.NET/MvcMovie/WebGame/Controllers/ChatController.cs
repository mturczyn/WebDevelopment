using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebGame.Models;

namespace WebGame.Controllers
{
  public class ChatController : Controller
  {
    public ChatController()
    {

    }

    public IActionResult Index(int id, string login, string fullName)
    {
      return View("~/Views/Chat.cshtml", new UserWrapper(id, login, fullName));
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
