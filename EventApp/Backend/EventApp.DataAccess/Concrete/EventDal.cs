using EventApp.DataAccess.Abstract;
using EventApp.DataAccess.Contexts;
using EventApp.DataAccess.Repositories;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace EventApp.DataAccess.Concrete
{
    public class EventDal : DalRepositoryBase<Event>, IEventDal
    {
        private readonly MssqlDbContext _context;

        public EventDal(MssqlDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<EventDetailDto> GetAllWithDetails(Expression<Func<EventDetailDto, bool>> filter = null, bool tracking = false)
        {
            var result = from events in _context.Events
                            join category in _context.Categories
                                on events.CategoryId equals category.CategoryId
                            join city in _context.Cities
                                on events.CityId equals city.CityId
                            join user in _context.Users
                                on events.CreatorUserId equals user.Id
                            select new EventDetailDto
                            {
                                EventId = events.EventId,
                                EventName = events.Name,
                                EventAddress = events.Address,
                                EventDate = events.Date,
                                EventPrice = events.Price,
                                EventDescription = events.Description,
                                EventApplicationFinishDate = events.ApplicationFinishDate,
                               

                                EventQuota = events.Quota,
                                 EventStatus = events.Status,
                                EventTicket = events.Ticket,
                                CategoryName = category.CategoryName,
                                CityName = city.CityName,
                                CreatorUserId = user.Id
                            };

            if (!tracking)
            {
                return filter != null ? result.Where(filter).AsNoTracking() : result.AsNoTracking();
            }
            else
            {
                return filter != null ? result.Where(filter) : result;
            }

        }

        public IQueryable<EventModel> AddAsyncWithDetails(EventModel eventModel)
        {
            var result = from events in _context.Events
                          join category in _context.Categories
                              on events.CategoryId equals category.CategoryId
                          join city in _context.Cities
                              on events.CityId equals city.CityId
                          join user in _context.Users
                              on events.CreatorUserId equals user.Id
                          
                          select new EventModel
                          {
                              EventId = events.EventId,
                              Name = events.Name,
                              Address = events.Address,
                              Date = events.Date,
                              Price = events.Price,
                              Description = events.Description,
                              ApplicationFinishDate = events.ApplicationFinishDate,
                              Quota = events.Quota,
                              Ticket = events.Ticket,
                              CategoryId = category.CategoryId,
                              CityId = city.CityId,
                              CreatorUserId = user.Id
                          };

             

            return result;
        }

        
    }
}
