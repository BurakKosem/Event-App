using EventApp.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Models
{
    public class CategoryModel : IEntityBase
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
