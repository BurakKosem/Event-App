using EventApp.Entities.DTOs;
using EventApp.Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Entities.Identity
{
    public class ApiUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public IEnumerable<EventUser> EventUsers { get; set; }

    }
}
