using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebGame.Controllers;

namespace WebGame
{
  public class ChatHub : Hub
  {
    private readonly NLog.Logger _logger;
    // W celach debugowych, żeby zobaczyć kiedy jest tworzony.
    // Podczas każdego wywołania jest tworzona nowa instancja.
    public ChatHub()
    {
      _logger = NLog.LogManager.GetCurrentClassLogger();
      // Przy wywołaniu konstruktora kontekst jest nullem.
      //var userId = this.Context.UserIdentifier;
      //var u2 = this.Context.User.Identity;
    }
    // Metoda może być wywołana przez dowolnego klienta,
    // aby wysłać wiadomość do wszystkich podłączonych klientów.
    public async Task SendMessage(string message, string user)
    {
      _logger.Info($"Wysyłanie wiadomości do {user}");
      await Clients.User(user).SendAsync("ReceiveMessage", message).ConfigureAwait(false);
      _logger.Info($"Widomość do {user} pomyślnie wysłana.");
    }

    public override Task OnConnectedAsync()
    {
      _logger.Info($"Próba rozpoczęcia połączenia SignalR, użytkownik {Context.UserIdentifier ?? "null"}");
      return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
      var disconnectedTask = base.OnDisconnectedAsync(exception);
      _logger.Info("Zakończenie połączenia SignalR");
      return disconnectedTask;
    }
  }
}
