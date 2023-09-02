using AutoMapper;
using EventApp.DataAccess.Abstract;
using EventApp.Entities.Models;
using EventApp.Entities;
using EventApp.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventApp.DataAccess.Concrete;

namespace EventApp.Service.Concrete
{
    public class CategoryManager : ICategoryService
    {
        private readonly ICategoryDal _categoryDal;
        private readonly IMapper _mapper;

        public CategoryManager(ICategoryDal categoryDal, IMapper mapper)
        {
            _categoryDal = categoryDal;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(CategoryModel category, bool tracking)
        {
            var map = _mapper.Map<Category>(category);
            await _categoryDal.AddAsync(map, true);
            return true;
        }

        public async Task<bool> DeleteAsync(int id, bool tracking)
        {
            await _categoryDal.DeleteAsync(id, true);
            return true;
        }

        public IQueryable<CategoryModel> GetAll(bool tracking)
        {
            var result = _categoryDal.GetAll();
            return _mapper.ProjectTo<CategoryModel>(result);
        }

        public int Save()
        {
            return _categoryDal.Save();
        }

        public async Task<int> SaveAsync()
        {
            return await _categoryDal.SaveAsync();
        }

        public bool Update(CategoryModel category, bool tracking)
        {
            var map = _mapper.Map<Category>(category);
            _categoryDal.Update(map, true);
            return true;
        }
    }
}
