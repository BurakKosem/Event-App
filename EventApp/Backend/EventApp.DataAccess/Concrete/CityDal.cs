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
    public class CityDal : DalRepositoryBase<City>, ICityDal
    {
        public CityDal(MssqlDbContext context) : base(context)
        {
        }
    }
}
