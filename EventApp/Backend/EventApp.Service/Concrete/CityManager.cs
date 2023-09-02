using AutoMapper;
using EventApp.DataAccess.Abstract;
using EventApp.Entities;
using EventApp.Entities.Models;
using EventApp.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Concrete
{
    public class CityManager : ICityService
    {
        private readonly ICityDal _cityDal;
        private readonly IMapper _mapper;

        public CityManager(ICityDal cityDal, IMapper mapper)
        {
            _cityDal = cityDal;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(CityModel city, bool tracking)
        {
            var map = _mapper.Map<City>(city);
            await _cityDal.AddAsync(map, true);
            return true;
        }

        public async Task<bool> DeleteAsync(int id, bool tracking)
        {
            await _cityDal.DeleteAsync(id, true);
            return true;
        }

        public IQueryable<CityModel> GetAll(bool tracking)
        {
            var result = _cityDal.GetAll();
            return _mapper.ProjectTo<CityModel>(result);
        }

        public int Save()
        {
            return _cityDal.Save();
        }

        public async Task<int> SaveAsync()
        {
            return await _cityDal.SaveAsync();
        }

        public bool Update(CityModel city, bool tracking)
        {
            var map = _mapper.Map<City>(city);
            _cityDal.Update(map, true);
            return true;
        }
    }
}
