using EventApp.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.DataAccess.Mapping
{
    public class EventMap : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasData(new Event
            {
                EventId = 1,
                Name = "Manga Konseri",
                ApplicationFinishDate = DateTime.Now,
                Date = DateTime.Now,
                Description = "Konser",
                Address = "Yenisehir mahallesi",
                Quota = 15,
                Status = true,
                Ticket = true,
                Price = 45,
                CategoryId = 1,
                CityId = 1,
                CreatorUserId = "19a1c6b0-8ef4-4ae6-bab0-ee656235752t"
            });
        }
    }
}
