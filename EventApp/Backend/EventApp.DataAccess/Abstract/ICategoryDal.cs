using EventApp.DataAccess.Repositories;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Abstract
{
    public interface ICategoryDal : IDalRepositoryBase<Category>
    {
    }
}
