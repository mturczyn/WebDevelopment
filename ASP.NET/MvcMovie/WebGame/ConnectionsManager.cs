using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGame
{
  public static class ConnectionsManager
  {
    private static NLog.Logger _logger = NLog.LogManager.GetCurrentClassLogger();
    private static Dictionary<int, string> _userConnections = new Dictionary<int, string>();
    public static bool AddConnection(int userId, string connectionId)
    {
      if (_userConnections.ContainsKey(userId))
      {
        _logger.Error($"Użytkownik o ID {userId} już ma aktywne połączenie SignalR");
        return false;
      }
      else
      {
        _userConnections.Add(userId, connectionId);
        return true;
      }
    }
  }
}
