using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace AboutMeApp
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        // Po usunięciu packi do Microsoft.AspNetCore.App, nie było już tej metody, zatem
        // zawarta była w tej paczce. Ale ona konfilktowała z Microsoft.AspNetCore.StaticFiles.
        // Jednak po dodaniu Microsoft.AspNetCore.StaticFiles dało się dodać ponownie paczkę
        // z tą metodą i było git.
        app.UseDeveloperExceptionPage();
      }

      app.UseDefaultFiles();
      // Bez tego nie używamy wwwroota, gdzie mamy główną lokalizację naszej strony,
      // wtedy poniższy Run jest takim fallbackiem i zwraca tylko zawarty w tej metodzie
      // komunikat.
      app.UseStaticFiles();

      app.Run(async (context) =>
      {
        await context.Response.WriteAsync("Hello World!");
      });
    }
  }
}
