using EventApp.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities
{
    public class City : IEntityBase
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}
