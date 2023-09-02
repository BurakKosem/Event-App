using EventApp.DataAccess.Contexts;
using EventApp.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Repositories
{
    public class DalRepositoryBase<T> : IDalRepositoryBase<T> where T : class, IEntityBase, new()
    {
        private readonly MssqlDbContext _context;

        public DalRepositoryBase(MssqlDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<bool> AddAsync(T entity, bool tracking = true)
        {
            EntityEntry entityEntry = await Table.AddAsync(entity);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> AddUserEvent(T entity)
        {
            EntityEntry entityEntry = await Table.AddAsync(entity);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> DeleteAsync(int Id, bool tracking = true)
        {
            T entity = await Table.FindAsync(Id);
            EntityEntry entityEntry = Table.Remove(entity);
            return entityEntry.State == EntityState.Deleted;
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null, bool tracking = true)
        {
            if (!tracking)
            {
                return filter != null ? Table.Where(filter).AsNoTracking() : Table.AsNoTracking();
            }
            else
            {
                return filter != null ? Table.Where(filter) : Table;
            }
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
            {
                query = Table.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync(filter);
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public async Task<int> SaveAsync()
            => await _context.SaveChangesAsync();

        public bool Update(T entity, bool tracking = true)
        {
            EntityEntry entityEntry = Table.Update(entity);
            return entityEntry.State != EntityState.Modified;
        }
    }
}
