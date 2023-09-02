using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Abstract
{
    public interface ICategoryService
    {
        IQueryable<CategoryModel> GetAll(bool tracking);
        Task<bool> AddAsync(CategoryModel category, bool tracking);
        Task<bool> DeleteAsync(int id, bool tracking);
        bool Update(CategoryModel category, bool tracking);
        int Save();
        Task<int> SaveAsync();
    }
}
