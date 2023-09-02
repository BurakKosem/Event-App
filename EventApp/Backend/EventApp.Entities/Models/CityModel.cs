using EventApp.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Models
{
    public class CityModel : IEntityBase
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
    }
}
