using AutoMapper;
using EventApp.Entities.Models;
using EventApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.AutoMapper
{
    public class EventUserProfile : Profile
    {
        public EventUserProfile()
        {
            CreateMap<EventUserModel, EventUser>().ReverseMap();
        }
    }
}
