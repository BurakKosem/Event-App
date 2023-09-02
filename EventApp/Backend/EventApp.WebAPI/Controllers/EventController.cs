using AutoMapper;
using EventApp.Core.Logging;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Identity;
using EventApp.Entities.Models;
using EventApp.Service.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogFilterAttribute))]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public ILogger<EventController> _logger;

        public EventController(IEventService eventService, ILogger<EventController> logger)
        {
            _eventService = eventService;
            _logger = logger;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = _eventService.GetAll(false);
            return Ok(result);
        }

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _eventService.GetById(id, false);
            return Ok(result);
        }

        [HttpGet("getbyname")]
        public async Task<IActionResult> GetByName(string name)
        {
            var result = _eventService.GetByName(name, false);
            return Ok(result);
        }

        [HttpGet("getbycategoryid")]
        public async Task<IActionResult> GetByCategoryId(int id)
        {
            var result = _eventService.GetAllByCategoryId(id, false);
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(EventModel eventModel)
        {
            await _eventService.AddAsync(eventModel, true);
            await _eventService.SaveAsync();
            return Ok();
        }

        [HttpPut("update")]
        public IActionResult Update(EventModel eventModel)
        {
            _eventService.Update(eventModel, true);
            _eventService.Save();
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await _eventService.DeleteAsync(id, true);
            await _eventService.SaveAsync();
            return Ok();
        }

        [HttpGet("getallwithdetails")]
        public async Task<IActionResult> GetAllWithDetails()
        {
            var result = _eventService.GetAllWithDetails(false);
            return Ok(result);
        }

        [HttpGet("getbycategoryname")]
        public async Task<IActionResult> GetAllByCategoryNameWithDetails(string name)
        {
            var result = _eventService.GetAllByCategoryNameWithDetails(name, false);
            return Ok(result);
        }

        [HttpGet("getbycityname")]
        public async Task<IActionResult> GetAllByCityNameWithDetails(string name)
        {
            var result = _eventService.GetAllByCityNameWithDetails(name, false);
            return Ok(result);
        }

        [HttpGet("getbyuserid")]
        public async Task<IActionResult> GetAllByUserIdWithDetails(string userId)
        {
            var result = _eventService.GetAllByUserId(userId, false);
            return Ok(result);
        }

        [HttpGet("getbyeventid")]
        public async Task<IActionResult> GetByEventIdWithDetails(int eventId)
        {
            var result = _eventService.GetByEventIdWithDetails(eventId, false);
            return Ok(result);
        }

        [HttpPost("addbydetails")]
        public async Task<IActionResult> addbydetails([FromBody] EventModel eventModel)
        {
            await _eventService.AddAsyncWithDetails(eventModel, true);
            await _eventService.SaveAsync();
            return Ok();
        }



    }
}
