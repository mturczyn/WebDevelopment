using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiddlewareOverview
{
  public interface ICustomService
  {
    string GetMessage();
  }
  /// <summary>
  /// Przykładowy serwis, który "wstrzykiwujemy" do kontrolera (dependency injection).
  /// </summary>
  public class CustomServiceForDependencyInjection : ICustomService
  {
    public Guid Guid { get; set; }
    public CustomServiceForDependencyInjection()
    {
      Guid = new Guid();
    }
    public string GetMessage()
    {
      return "Hello from custom service! Guid is " + Guid;
    }
  }
}
