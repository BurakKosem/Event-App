using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.DTOs
{
    public class EventDetailDto
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public DateTime EventApplicationFinishDate { get; set; }
        public DateTime EventDate { get; set; }
        public string EventDescription { get; set; }
        public string EventAddress { get; set; }
        public int EventQuota { get; set; }
        public bool EventStatus { get; set; }
        public bool EventTicket { get; set; }
        public decimal? EventPrice { get; set; }
        public string CategoryName { get; set; }
        public string CityName { get; set; }
        public string? CreatorUserId { get; set; }
    }
}
