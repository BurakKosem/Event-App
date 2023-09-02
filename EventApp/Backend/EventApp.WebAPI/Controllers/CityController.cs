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

    public class CityController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CityController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _cityService.GetAll(false);
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(CityModel city)
        {
            await _cityService.AddAsync(city, true);
            await _cityService.SaveAsync();
            return Ok();
        }
        [HttpPut("update")]
        public IActionResult Update(CityModel city)
        {
            _cityService.Update(city, true);
            _cityService.Save();
            return Ok();
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cityService.DeleteAsync(id, true);
            await _cityService.SaveAsync();
            return Ok();
        }
    }
}
