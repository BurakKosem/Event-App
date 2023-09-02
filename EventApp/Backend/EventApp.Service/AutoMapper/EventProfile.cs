using AutoMapper;
using EventApp.Entities;
using EventApp.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.AutoMapper
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<EventModel, Event>().ReverseMap();
        }
    }
}
