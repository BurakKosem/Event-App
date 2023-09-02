using EventApp.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Repositories
{
    public interface IDalRepositoryBase<T> where T : class, IEntityBase, new()
    {
        DbSet<T> Table { get; }
        IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null, bool tracking = true);
        Task<T> GetAsync(Expression<Func<T, bool>> filter, bool tracking = true);
        Task<bool> AddAsync(T entity, bool tracking = true);
        bool Update(T entity, bool tracking = true);
        Task<bool> DeleteAsync(int id, bool tracking = true);
        int Save();
        Task<int> SaveAsync();
    }
}
