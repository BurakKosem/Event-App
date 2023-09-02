using EventApp.Entities;
using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Abstract
{
    public interface ICityService
    {
        IQueryable<CityModel> GetAll(bool tracking);
        Task<bool> AddAsync(CityModel city, bool tracking);
        Task<bool> DeleteAsync(int id, bool tracking);
        bool Update(CityModel city, bool tracking);
        int Save();
        Task<int> SaveAsync();

    }
}
