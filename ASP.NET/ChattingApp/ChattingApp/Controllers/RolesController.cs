using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChattingApp.Models;

namespace ChattingApp.Controllers
{
  public class RolesController : Controller
  {
    private WebAppDbContext _context;

    public RolesController(WebAppDbContext ctx)
    {
      _context = ctx;
    }
    public IActionResult Index()
    {
      return View(_context.Role.ToList());
    }

    public IActionResult Create()
    {
      return View();
    }

    [HttpPost]
    public IActionResult Create([Bind("RoleName")]Role role)
    {
      _context.Role.Add(role);
      _context.SaveChanges();
      return View("~/Views/Home/Index.cshtml");
    }
  }
}
