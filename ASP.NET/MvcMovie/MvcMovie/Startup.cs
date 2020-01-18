using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MvcMovie.DAL;

namespace MvcMovie
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
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
      services.Configure<MvcOptions>(options => options.EnableEndpointRouting = false);
      services.AddDbContext<MovieDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MvcMovieContext")));
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
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
      app.UseCookiePolicy();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  // Tutaj wskazujemy, ze domyślnymm parametrem będzie parametr
                  // o nazwie id. Ponadto ? wskazuje, ze jest on opcjonalny, także
                  // można nawigować do strony niepodając żadnego  parametru, bądź
                  // parametr bez nazwy (zmapowany zostanie na id).
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}
