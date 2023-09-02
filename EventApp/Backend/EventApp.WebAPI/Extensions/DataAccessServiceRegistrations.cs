using EventApp.DataAccess.Abstract;
using EventApp.DataAccess.Concrete;
using EventApp.DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace EventApp.WebAPI.Extensions
{
    public static class DataAccessServiceRegistrations
    {
        public static IServiceCollection AddDataAccessServices(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("MSSQL");
            services.AddDbContext<MssqlDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDistributedMemoryCache();
            services.AddScoped<IEventDal, EventDal>();
            services.AddScoped<ICategoryDal, CategoryDal>();
            services.AddScoped<ICityDal, CityDal>();

            return services;
        }
    }
}
