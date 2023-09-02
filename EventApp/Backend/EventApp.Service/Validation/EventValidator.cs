using EventApp.Entities.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Validation
{
    public class EventValidator : AbstractValidator<EventModel>
    {
        public EventValidator()
        {
            RuleFor(newEvent => newEvent.Name)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3)
                .WithMessage("Etkinliğin ismi en az 3 karakter olmalıdır.");

            RuleFor(newEvent => newEvent.Address)
                .NotEmpty()
                .NotNull()
                .MinimumLength(5)
                .WithMessage("Etkinliğin adresi en az 5 karakter olmalıdır."); ;

            RuleFor(newEvent => newEvent.Description)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3)
                .WithMessage("Etkinliğin tanımı en az 3 karakter olmalıdır."); ;
        }
    }
}
