using EventApp.DataAccess.Abstract;
using EventApp.DataAccess.Contexts;
using EventApp.DataAccess.Repositories;
using EventApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Concrete
{
    public class CategoryDal : DalRepositoryBase<Category>, ICategoryDal
    {
        public CategoryDal(MssqlDbContext context) : base(context)
        {
        }
    }
}
