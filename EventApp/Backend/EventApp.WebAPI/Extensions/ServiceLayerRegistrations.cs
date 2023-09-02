using EventApp.Core.Logging;
using EventApp.Core.Validation;
using EventApp.DataAccess.Abstract;
using EventApp.DataAccess.Concrete;
using EventApp.DataAccess.Contexts;
using EventApp.Entities.Models;
using EventApp.Service.Abstract;
using EventApp.Service.Concrete;
using EventApp.Service.Validation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace EventApp.WebAPI.Extensions
{
    public static class ServiceLayerRegistrations
    {
        public static IServiceCollection AddManagerServices(this IServiceCollection services)
        {
            services.AddScoped<IEventService, EventManager>();
            services.AddScoped<ICityService, CityManager>();
            services.AddScoped<ICategoryService, CategoryManager>();
            services.AddSingleton<LogFilterAttribute>();

            services.AddControllers(options => options.Filters.Add<ValidationFilter>())
                .AddFluentValidation(configuration => configuration
                .RegisterValidatorsFromAssemblyContaining<EventValidator>())
                .ConfigureApiBehaviorOptions(o => o.SuppressModelStateInvalidFilter = true);

            //services.AddControllers()
            //    .AddFluentValidation(options =>
            //    {
            //        options.RegisterValidatorsFromAssemblyContaining<EventValidator>();
            //        options.DisableDataAnnotationsValidation = true;
            //    });

            return services;
        }

    }
}
