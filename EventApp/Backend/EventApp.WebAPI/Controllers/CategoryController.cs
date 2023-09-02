using EventApp.Core.Logging;
using EventApp.Entities.Models;
using EventApp.Service.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogFilterAttribute))]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _categoryService.GetAll(false);
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(CategoryModel category)
        {
            await _categoryService.AddAsync(category, true);
            await _categoryService.SaveAsync();
            return Ok();
        }
        [HttpPut("update")]
        public IActionResult Update(CategoryModel category)
        {
            _categoryService.Update(category, true);
            _categoryService.Save();
            return Ok();
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteAsync(id, true);
            await _categoryService.SaveAsync();
            return Ok();
        }
    }
}
