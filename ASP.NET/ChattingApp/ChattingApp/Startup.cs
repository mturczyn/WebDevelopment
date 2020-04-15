using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using NLog;
using ChattingApp;

namespace ChattingApp
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      GlobalDiagnosticsContext.Set("Application", "My cool web application");
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<CookiePolicyOptions>(options =>
      {
        // This lambda determines whether user consent for non-essential cookies is needed for a given request.
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
      });
      services.Configure<MvcOptions>(op => op.EnableEndpointRouting = false);
      services.AddDbContext<Models.WebAppDbContext>(options => 
        options.UseSqlServer(Configuration.GetConnectionString("WebAppDb"))
      );
      services.AddSession();
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
      services.AddSignalR();
      services.AddSingleton<IUserIdProvider, UserIdProvider>();
      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      //app.UseStaticFiles(new StaticFileOptions
      //{
      //  FileProvider = new PhysicalFileProvider(
      //      Path.Combine(Directory.GetCurrentDirectory(), "JavaScript")),
      //  RequestPath = "/JavaScriptFiles"
      //});

      app.UseCookiePolicy();
      app.UseSession();

      // To samo co poniżej, tylko spakowane w metodę rozszerzenia.
      // Można na tym przykładzie sprawdzić jak działają kolejne kroki
      // przetwarzania. Czyli po kolejnym kroku wywływana jest reszta obecnego 
      // kroku przetwarzania.
      //app.UseCookiesVerificationForLoggedUser();

      // Zawsze trzeba wywołać nextMiddlewareAction, ponieważ jest to kolejny krok
      // w przetwarzaniu zapytania HTTP. Jeśli nie wywołamy, nasze przetwarzanie się
      // tutaj zatrzyma i to będzie koniec.
      app.Use(async (context, nextMiddlewareAction) =>
      {
        try
        {
          // Oczywiście da się to prosto napisać, to tylko wypróbowanie nowych cech C# 8.0
          var isHomePageOrAuth = context.Request.Path switch
          {
            var x when x == "" || x == "/" || x == "/Home/Index/" || x.ToString().Contains("Authenticate") => true,
            _ => false
          };

          // Jeśli mamy autoryzację, to dalej normalnie przetwarzamy zapytanie i kończymy.
          if (isHomePageOrAuth)
          {
            await nextMiddlewareAction();
            return;
          }

          // Jak już tu jesteśmy, to próbujemy pobrać ciasteczko z ID użytkownika.
          // Jak mamy zalogowanego użytkownika, to pozwalamy dalej budować i zwrócić odpowiednią
          // stronę. Jak nie, to tylko zwracamy informację.
          context.Session.TryGetValue(UserIdProvider.SESSION_LOGIN_KEY, out byte[] userId);
          if (userId == null)
          {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Nie ma zalogowanego użytkownika!");
          }

          await nextMiddlewareAction();
        }
#pragma warning disable 168
        catch (Exception ex)
        {
          // tylko do testów middleware
        }
#pragma warning restore 168
      });

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
      app.UseRouting();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapHub<ChatHub>("/chatHub");
      });
    }
  }
}

public static class ExtensionsForAspNetCore
{
  public static void UseCookiesVerificationForLoggedUser(this IApplicationBuilder app)
  {
    app.Use(async (context, nextMiddlewareAction) =>
    {
      try
      {
        // Oczywiście da się to prosto napisać, to tylko wypróbowanie nowych cech C# 8.0
        var isHomePage = context.Request.Path switch
        {
          var x when x == "/" || x == "/Home/Index/" || x.ToString().Contains("Authenticate") => true,
          _ => false
        };

        if (isHomePage)
        {
          await nextMiddlewareAction();
          return;
        }

        context.Session.TryGetValue(UserIdProvider.SESSION_LOGIN_KEY, out byte[] userId);
        if (userId == null)
        {
          await context.Response.WriteAsync("Nie ma zalogowanego użytkownika!");
        }

        await nextMiddlewareAction();
      }
#pragma warning disable 168
      catch (Exception ex)
      {
        // tylko do testów middleware
      }
#pragma warning restore 168
    });
  }
}