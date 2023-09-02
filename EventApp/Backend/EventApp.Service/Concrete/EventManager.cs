using AutoMapper;
using EventApp.DataAccess.Abstract;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Models;
using EventApp.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Concrete
{
    public class EventManager : IEventService
    {
        private readonly IEventDal _eventDal;
        private readonly IMapper _mapper;

        public EventManager(IEventDal eventDal, IMapper mapper)
        {
            _eventDal = eventDal;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(EventModel eventModel, bool tracking)
        {
            var map = _mapper.Map<Event>(eventModel);
            await _eventDal.AddAsync(map, true);
            return true;
        }

        public IQueryable<Event> GetAll(bool tracking)
        {
           return _eventDal.GetAll(null, false);
        }

        public IQueryable<Event> GetAllByCategoryId(int categoryId, bool tracking)
        {
            return _eventDal.GetAll(p => p.CategoryId == categoryId, false);
        }

        public IQueryable<Event> GetByCityId(int cityId, bool tracking)
        {
            return _eventDal.GetAll(p => p.CityId == cityId, false);
        }

        public async Task<Event> GetById(int id, bool tracking)
        {
            return await _eventDal.GetAsync(p => p.EventId == id, false);
        }

        public async Task<Event> GetByName(string name, bool tracking)
        {
            return await _eventDal.GetAsync(p => p.Name == name, false);
        }

        public Task<bool> DeleteAsync(int id, bool tracking)
        {
            return _eventDal.DeleteAsync(id, true);
        }

        public int Save()
        {
            return _eventDal.Save();
        }

        public Task<int> SaveAsync()
        {
            return _eventDal.SaveAsync();
        }

        public bool Update(EventModel eventModel, bool tracking)
        {
            var map = _mapper.Map<Event>(eventModel);
            _eventDal.Update(map, true);
            return true;
        }

        public IQueryable<EventDetailDto> GetAllWithDetails(bool tracking)
        {
            return _eventDal.GetAllWithDetails(null, false);
        }

        public IQueryable<EventDetailDto> GetAllByCategoryNameWithDetails(string categoryName, bool tracking)
        {
            return _eventDal.GetAllWithDetails(p => p.CategoryName == categoryName, false);
        }
        public IQueryable<EventDetailDto> GetAllByCityNameWithDetails(string cityName, bool tracking)
        {
            return _eventDal.GetAllWithDetails(p => p.CityName == cityName, false);
        }

        public IQueryable<EventDetailDto> GetAllByUserId(string userId, bool tracking)
        {
            return _eventDal.GetAllWithDetails(p => p.CreatorUserId == userId, false);
        }

        public async Task<bool> AddAsyncWithDetails(EventModel eventModel, bool tracking)
        {
            //var result = _eventDal.AddAsyncWithDetails(eventModel);
            var map = _mapper.Map<Event>(eventModel);
            await _eventDal.AddAsync(map, true);
            return true;
        }

        public IQueryable<EventDetailDto> GetByEventIdWithDetails(int eventId, bool tracking)
        {
            return _eventDal.GetAllWithDetails(p => p.EventId == eventId, false);
        }
    }
    
}
