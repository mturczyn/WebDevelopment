using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MiddlewareOverview
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      // Dodawanie własnego serwisu.
      services.AddSingleton<ICustomService, CustomServiceForDependencyInjection>();
      services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Latest);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.Use(async (context, nextContext) =>
      {
        // Tutaj możemy np. zweryfikować, czy mamy zalogowanego użytkownika (w ciasteczkach
        // to zweryfikować jeśli używamy).
        if(new Random().Next(2) == 0)
          context.Abort();
        else 
          await nextContext();

        await context.Response.WriteAsync($"\nHello from first context from Use, HasStarted = {context.Response.HasStarted}");
      });
      
      // Zarejestrowanie kontrolerów
      app.UseMvc(routes =>
        routes.MapRoute("default", "{controller=Index}/{action=GetMessage}")
      );

      // Jeśli mapowanie dróg (routes) dopasuje ścieżkę, to tam jest wew. uruchamiany run, który
      // startuje/tworzy odpowiedź HTTP (HttpContext.Response.HasStarted = true).
      app.Run(async (context) =>
      {
        await context.Response.WriteAsync("Hello World from second delegate.");
      });
    }
  }
  /// <summary>
  /// Map extensions are used as a convention for branching the pipeline. 
  /// Map branches the request pipeline based on matches of the given request path. 
  /// If the request path starts with the given path, the branch is executed.
  /// </summary>
  public class BranchesStartup
  {
    private static void HandleMap1(IApplicationBuilder app)
    {
      app.Run(async ctx =>
      {
        await ctx.Response.WriteAsync("Map test 1");
      });
    }
    private static void HandleMap2(IApplicationBuilder app)
    {
      app.Run(async ctx =>
      {
        await ctx.Response.WriteAsync("Map test 2");
      });
    }

    public void Configure(IApplicationBuilder app)
    {
      app.Map("/map1", HandleMap1);
      app.Map("/map2", HandleMap2);
      app.Run(async ctx =>
      {
        await ctx.Response.WriteAsync("Hello from non-Map delegate.");
      });
    }
  }
}
