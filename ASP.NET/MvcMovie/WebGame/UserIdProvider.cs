﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGame
{
  /// <summary>
  /// Klasa wykorzystywana przez SignalR do dostarczania identyfikatorów użytkowników.
  /// Dzięki temu możemy zdefiniować własny sposób zarządzania (tj. przypisaywania)
  /// identyfikatorów w SignalR.
  /// </summary>
  public class UserIdProvider : IUserIdProvider
  {
    public static readonly string SESSION_LOGIN_KEY = "loggedUser";
    private readonly IHttpContextAccessor _httpContextAccessor;
    private Logger _logger;
    public UserIdProvider(IHttpContextAccessor httpContextAccessor) 
    {
      _httpContextAccessor = httpContextAccessor;
      _logger = LogManager.GetCurrentClassLogger();
    }

    public string GetUserId(HubConnectionContext connection)
    {
      var session = _httpContextAccessor.HttpContext.Session;
      session.TryGetValue(SESSION_LOGIN_KEY, out byte[] loginBA);
      if (loginBA == null)
      {
        _logger.Error($"Nie mieliśmy loginu użytkownika w sesji o ID {session.Id}.");
        return null;
      }

      return new string(loginBA.Select(b => (char)b).ToArray());
    }
  }
}
