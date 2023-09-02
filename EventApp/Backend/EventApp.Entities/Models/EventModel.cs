using EventApp.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Models
{
    public class EventModel : IEntityBase
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
        public int CategoryId { get; set; }
        public int CityId { get; set; }
        public string? CreatorUserId { get; set; }
    }
}
