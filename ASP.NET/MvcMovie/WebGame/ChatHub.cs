using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebGame.Controllers;
using WebGame.Models;

namespace WebGame
{
  public class ChatHub : Hub
  {
    private static HashSet<int> _loggedUsersIdentifiers = new HashSet<int>();
    private WebAppDbContext _context;
    public static int[] ConnectedUsers => _loggedUsersIdentifiers.ToArray();
    private readonly NLog.Logger _logger;

    public ChatHub(WebAppDbContext context)
    {
      _logger = NLog.LogManager.GetCurrentClassLogger();
      _context = context;
      // Przy wywołaniu konstruktora kontekst jest nullem.
      //var userId = this.Context.UserIdentifier;
      //var u2 = this.Context.User.Identity;
    }

    public async Task SendMessage(string message, string userId, string messageUUID)
    {
      _logger.Info($"Wysyłanie wiadomości o identyfikatorze {messageUUID} do użytkownika o ID {userId}");
      var result = 0;
      try
      {
        _context.Message.Add(new Message()
        {
          Id = new Guid(messageUUID),
          TimeSent = DateTime.Now,
          IsRead = false,
          MessageText = message,
          SentBy = int.Parse(Context.UserIdentifier),
          SentTo = int.Parse(userId),
        });
        result = await _context.SaveChangesAsync();
      }
      catch(Exception ex)
      {
        _logger.Error(ex);
      }
      // Nic nie zostało zmienone, więc żadna wiadomość nie trafiła do bazy.
      if (result == 0)
      {
        _logger.Error($"Zapis wiadomości w bazie danych nie powiódł się.");
      }

      if (! _loggedUsersIdentifiers.Contains(int.Parse(userId)))
      {
        _logger.Info($"Użytkownik o ID {userId} nie jest podłączony do czatu. Wysyłanie potwierdzenia.");
        await ConfirmMessage(messageUUID, Context.UserIdentifier);
        return;
      }
      await Clients.User(userId).SendAsync("ReceiveMessage", message, messageUUID, Context.UserIdentifier).ConfigureAwait(false);
      _logger.Info($"Widomość do użytkownika o ID {userId} pomyślnie wysłana.");
    }
    public async Task ConfirmMessage(string messageUUID, string sender)
    {
      //var message = _context.Message.Where(m => m.Id.ToString() == messageUUID).FirstOrDefault();
      //if(message == null)
      //{
      //  _logger.Error($"Nie znaleziono wiadomości o UUID {messageUUID} .");
      //  return;
      //}
      //message.IsRead = true;
      //var result = await _context.SaveChangesAsync();
      //if(result == 0)
      //{
      //  _logger.Error($"Nie powiodła się oznaczenie wiadomości o UUID {messageUUID} jako przeczytanej.");
      //  return;
      //}
      _logger.Info($"Potwierdzenie dostarczenia wiadomości o identyfikatorze {messageUUID}.");
      await Clients.User(sender).SendAsync("ConfirmMessageToSender", messageUUID);
    }

    public override async Task OnConnectedAsync()
    {
      _logger.Info($"Próba rozpoczęcia połączenia SignalR, użytkownik o ID {Context.UserIdentifier ?? "null"}");
      _loggedUsersIdentifiers.Add(int.Parse(Context.UserIdentifier));
      await base.OnConnectedAsync();
      // Informujemy użytkowników o zmianie statusu.
      await Clients.All.SendAsync("UserConnectionChanged", Context.UserIdentifier, true);
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      _logger.Info($"Kończenie połączenia SignalR użytkownika o ID {Context.UserIdentifier ?? "null"}");
      _loggedUsersIdentifiers.Remove(int.Parse(Context.UserIdentifier));
      await base.OnDisconnectedAsync(exception);
      await Clients.All.SendAsync("UserConnectionChanged", Context.UserIdentifier, false);
      _logger.Info("Zakończenie połączenia SignalR");
    }
  }
}
