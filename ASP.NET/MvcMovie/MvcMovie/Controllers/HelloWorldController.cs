using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MvcMovie.Controllers
{
  public class HelloWorldController : Controller
  {
    //public IActionResult Index()
    //{
    //    return View();
    //}

    // GET: /HelloWorld/
    public IActionResult Index()
    {
      ViewData["Title"] = "Movie List";
      return View();
    }
    
    // GET: /HelloWorld/Welcome/
    public IActionResult Welcome(int count, string name)
    {
      // ViewData nie działa jak należy, dla _Layout.cshtml działa, jednak dla innych widoków już nie.
      ViewData["Count"] = count;
      ViewData["Message"] = $"Hello {name}";
      ViewBag.Message = $"Hello {name}";
      ViewBag.Count = count;
      // Poniższa metoda pozwala "bezpiecznie" zwrócić odpowiedź HTML.
      // string encoded = HtmlEncoder.Default.Encode($"Welcome! {string.Join(',', Enumerable.Repeat(name, count))}");
      return View();
    }
  }
}