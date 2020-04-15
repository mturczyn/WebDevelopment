using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using ChattingApp.Models;

namespace ChattingApp.Controllers
{
  public class ChatController : Controller
  {
    private WebAppDbContext _context;
    private int _currentUserId = -1;
    private Logger _logger;
    private int GetCurrentUserId()
    {
      if (_currentUserId == -1)
      {
        HttpContext.Session.TryGetValue(UserIdProvider.SESSION_LOGIN_KEY, out byte[] userIdBA);
        _currentUserId = BitConverter.ToInt32(userIdBA);
      }
      return _currentUserId;
    }
    public ChatController(WebAppDbContext context)
    {
      _logger = LogManager.GetCurrentClassLogger();
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

    public string GetUnreadMessagesUsers()
    {
      var unreadMessagesSenders = _context.Message
        .Where(m => !m.IsRead && m.SentTo == GetCurrentUserId())
        .Select(m => m.SentBy)
        .Distinct()
        .ToArray();
      return JsonConvert.SerializeObject(unreadMessagesSenders);
    }

    public string GetChatHistory(int userId)
    {
      var chatHistory = _context.Message
        .Where(m => (m.SentBy == userId && m.SentTo == GetCurrentUserId()) ||
                    (m.SentTo == userId && m.SentBy == GetCurrentUserId()))
        .OrderByDescending(m => m.TimeSent)
        .Take(100)
        .ToArray()
        .OrderBy(m => m.TimeSent);
      return JsonConvert.SerializeObject(chatHistory);
    }
    [HttpPost]
    public void MarkMessagesAsRead(int userId)
    {
      var unreadMessages = _context.Message
        .Where(m => m.SentBy == userId && m.SentTo == GetCurrentUserId() && !m.IsRead)
        .ToArray();
      foreach (var m in unreadMessages) m.IsRead = true;
      try
      {
        var result = _context.SaveChanges();
      }
      catch(Exception ex)
      {
        _logger.Error(ex);
        HttpContext.Response.StatusCode = 500;
      }
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
