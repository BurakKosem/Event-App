using AutoMapper;
using EventApp.DataAccess.Contexts;
using EventApp.Entities;
using EventApp.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventUserController : ControllerBase
    {
        private readonly MssqlDbContext _context;
        private readonly IMapper _mapper;

        public EventUserController(MssqlDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EventUserModel>> GetEventUsers()
        {
            var eventUsers = _context.EventUsers
                .Include(eu => eu.Event) 
                .Include(eu => eu.User) 
                .ToList();

         
            var eventUserModels = eventUsers.Select(eu => new EventUserModel
            {
                EventUserId = eu.Id,
                UserId = eu.UserId,
                EventId = eu.EventId
               
            }).ToList();

            return eventUserModels;
        }

        
        [HttpGet("{id}")]
        public ActionResult<EventUser> GetEventUser(int id)
        {
            var eventUser = _context.EventUsers.Find(id);

            if (eventUser == null)
            {
                return NotFound();
            }

            return eventUser;
        }

        
        [HttpPost]
public ActionResult<EventUser> PostEventUser(EventUserModel eventUserModel)
{
    
    var newEventUser = new EventUser
    {
        UserId = eventUserModel.UserId,
        EventId = eventUserModel.EventId
    };

    _context.EventUsers.Add(newEventUser);
    _context.SaveChanges();

    return CreatedAtAction(nameof(GetEventUser), new { id = newEventUser.Id }, newEventUser);
}

        // Belirli bir EventUser'ı güncelleyen endpoint
        [HttpPut("{id}")]
        public IActionResult PutEventUser(int id, EventUser eventUser)
        {
            if (id != eventUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventUser).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // Belirli bir EventUser'ı silen endpoint
        [HttpDelete("{id}")]
        public IActionResult DeleteEventUser(int id)
        {
            var eventUser = _context.EventUsers.Find(id);

            if (eventUser == null)
            {
                return NotFound();
            }

            _context.EventUsers.Remove(eventUser);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("user/{userId}/eventIds")]
        public ActionResult<IEnumerable<int>> GetEventIdsByUserId(string userId)
        {
            
            var eventIds = _context.EventUsers
                .Where(eu => eu.UserId == userId)
                .Select(eu => eu.EventId)
                .ToList();

            return eventIds;
        }

        [HttpGet("user/{userId}/event/{eventId}/eventUserId")]
        public ActionResult<int> GetEventUserIdByUserIdAndEventId(string userId, int eventId)
        {
            
            var eventUserId = _context.EventUsers
                .Where(eu => eu.UserId == userId && eu.EventId == eventId)
                .Select(eu => eu.Id)
                .FirstOrDefault();

            if (eventUserId == 0) 
            {
                return NotFound(); 
            }

            return eventUserId;
        }
    }
}
