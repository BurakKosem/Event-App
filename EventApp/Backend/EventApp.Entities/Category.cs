using EventApp.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities
{
    public class Category : IEntityBase
    {
        public int CategoryId { get; set;}
        public string CategoryName { get; set;}
        public ICollection<Event> Events { get; set; }
    }
}
