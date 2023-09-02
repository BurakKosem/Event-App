using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Abstract
{
    public interface IEventService
    {
        Task<bool> AddAsync(EventModel eventModel, bool tracking );
        Task<bool> DeleteAsync(int id, bool tracking);
        bool Update(EventModel eventModel, bool tracking);
        IQueryable<Event> GetAll(bool tracking);
        
        Task<Event> GetById(int id, bool tracking);
        Task<Event> GetByName(string name, bool tracking);
        IQueryable<Event> GetAllByCategoryId(int categoryId, bool tracking);
        IQueryable<Event> GetByCityId(int cityId, bool tracking);
        int Save();
        Task<int> SaveAsync();

        IQueryable<EventDetailDto> GetAllWithDetails(bool tracking);
        IQueryable<EventDetailDto> GetAllByCategoryNameWithDetails(string categoryName, bool tracking);
        IQueryable<EventDetailDto> GetAllByCityNameWithDetails(string cityName, bool tracking);
        IQueryable<EventDetailDto> GetAllByUserId(string userId, bool tracking);
        Task<bool> AddAsyncWithDetails(EventModel eventModel, bool tracking);
        IQueryable<EventDetailDto> GetByEventIdWithDetails(int userId, bool tracking);
    };
}
