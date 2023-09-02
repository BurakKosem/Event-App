using EventApp.DataAccess.Repositories;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Abstract
{
    public interface IEventDal : IDalRepositoryBase<Event>
    {
        IQueryable<EventDetailDto> GetAllWithDetails(Expression<Func<EventDetailDto, bool>> filter = null, bool tracking = true);
        IQueryable<EventModel> AddAsyncWithDetails(EventModel eventModel);

    }
}
