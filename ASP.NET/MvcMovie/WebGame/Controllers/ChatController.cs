using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

    public string GetAllUsers()
    {
      return JsonConvert.SerializeObject(_context.User.ToArray());
    }

    public string GetChatHistory(int userId)
    {
      HttpContext.Session.TryGetValue(UserIdProvider.SESSION_LOGIN_KEY, out byte[] userIdBA);
      var currentUserId = BitConverter.ToInt32(userIdBA);
      var chatHistory = _context.Message
        .Where(m => (m.SentBy == userId && m.SentTo == currentUserId) ||
                    (m.SentTo == userId && m.SentBy == currentUserId))
        .Take(100)
        .ToArray();
      return JsonConvert.SerializeObject(chatHistory);
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
