using Microsoft.AspNetCore.Mvc;

namespace MiddlewareOverview
{
  // Dziedziczenie konieczne, jeśli używamy mapowania z UseMvc z kontrolerami {controller=...}/
  public class Index : Controller
  {
    private string _message;
    public Index(ICustomService service)
    {
      _message = service.GetMessage();
    }
    public string GetMessage()
    {
      return "Message from Index: " + _message;
    }
  }
}
