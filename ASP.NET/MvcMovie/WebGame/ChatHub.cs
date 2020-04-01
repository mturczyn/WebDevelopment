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
    /// <summary>
    /// Do potwierdzania dostarczenia wiadomości. Nie działa, bo mamy nowy Hub za każdym razem (wysłanie wiadomości
    /// oraz potwierdzenie). Nie możemy zroibć statycznej bo dwóch użytwkoników może wysłać w tej samej chwili
    /// wiadomość i wtedy to ID się pomieszają.
    /// </summary>
    //private string _messageId;
    private const string MID_SEPARATOR = " - ";
    private static HashSet<string> _loggedUsersIdentifiers = new HashSet<string>();
    public static string[] ConnectedUsers => _loggedUsersIdentifiers.ToArray();
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
      string messageId = Context.UserIdentifier + MID_SEPARATOR + new Random().Next(1000);

      _logger.Info($"Wysyłanie wiadomości o identyfikatorze {messageId} do {user}");
      await Clients.User(user).SendAsync("ReceiveMessage", message, messageId, Context.UserIdentifier).ConfigureAwait(false);
      _logger.Info($"Widomość do {user} pomyślnie wysłana.");
    }
    public async Task ConfirmMessage(string messageId)
    {
      _logger.Info($"Potwierdzenie wiadomości o identyfikatorze {messageId}.");
      var confirmationData = messageId.Split(MID_SEPARATOR);
      if(confirmationData.Length != 2)
      {
        _logger.Warn($"Dane potwierdzające wiadomość nie są poprawne. Zawartość [{string.Join(" ; ", confirmationData)}]");
        return;
      }
      var sender = confirmationData[0];

      await Clients.User(sender).SendAsync("ConfirmMessageToSender");
    }

    public override async Task OnConnectedAsync()
    {
      _logger.Info($"Próba rozpoczęcia połączenia SignalR, użytkownik {Context.UserIdentifier ?? "null"}");
      _loggedUsersIdentifiers.Add(Context.UserIdentifier);
# warning To może nie działać, trzeba przetestować i wrócić do returna. Tak samo w OnDisconnected
      await base.OnConnectedAsync();
      await Clients.All.SendAsync("UserConnectionChanged", Context.UserIdentifier, true);
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      _logger.Info($"Kończenie połączenia SignalR użytkownika {Context.UserIdentifier ?? "null"}");
      _loggedUsersIdentifiers.Remove(Context.UserIdentifier);
      await base.OnDisconnectedAsync(exception);
      await Clients.All.SendAsync("UserConnectionChanged", Context.UserIdentifier, false);
      _logger.Info("Zakończenie połączenia SignalR");
    }
  }
}
