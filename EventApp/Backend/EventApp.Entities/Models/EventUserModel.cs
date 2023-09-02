using EventApp.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Models
{
    public class EventUserModel
    {
        public int EventUserId { get; set; }
        public string UserId { get; set; }
        public int EventId { get; set; }
    }
}
