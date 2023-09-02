using EventApp.Entities.Common;
using EventApp.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Models
{
    public class EventUser :IEntityBase
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApiUser User { get; set; } 
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
