using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGame
{
  public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
  {
    private static Dictionary<int, string> userConnectionIds = new Dictionary<int, string>();

    public bool AddLoggedUserConnection(int userId)
    {
      userConnectionIds.Add(userId, Context.ConnectionId);
      return true;
    }

    // W celach debugowych, żeby zobaczyć kiedy jest tworzony.
    // Podczas każdego wywołania jest tworzona nowa instancja.
    public ChatHub() { }
    // Metoda może być wywołana przez dowolnego klienta,
    // aby wysłać wiadomość do wszystkich podłączonych klientów.
    public async Task SendMessage(string message, string chatRoom)
    {
      //Clients.Clients()
      //var allClients = Clients.All;
      await Clients.Group(chatRoom).SendAsync("ReceiveMessage", message).ConfigureAwait(false);
    }
    public async Task SetRecipent(string chatRoom)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom);
      await Clients.Group(chatRoom).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined the group '{chatRoom}'.");
    }
  }
}
