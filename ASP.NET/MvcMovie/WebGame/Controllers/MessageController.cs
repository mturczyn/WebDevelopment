using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace WebGame.Controllers
{
  public class MessageController : Controller
  {
    private static List<string> messages = new List<string>();
    public MessageController()
    {

    }

    public IActionResult Index()
    {
      return View("~/Views/Chat.cshtml");
    }
    // Stara metoda obsługi wysyłania wiadomości.
    public string HandleMessage(string message)
    {
      messages.Add(message);
      bool success = true;
      return "{\"messageCount\": \"" + messages.Count + "\", \"messageProcessedAt\": \"" +
        DateTime.Now.ToString("yy-MM-dd hh:mm:ss") + "\", \"messageSendSuccess\": \"" + success + "\" }";
    }
  }
}
