using EventApp.Entities.Common;
using EventApp.Entities.Identity;
using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities
{
    public class Event : IEntityBase
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public DateTime ApplicationFinishDate { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int Quota { get; set; }
        public bool Status { get; set; } 
        public bool Ticket { get; set; }
        public decimal? Price { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
        public ApiUser CreatorUser { get; set; }
        public string? CreatorUserId { get; set; }

        public IEnumerable<EventUser> EventUsers { get; set; }
        
    }
}
