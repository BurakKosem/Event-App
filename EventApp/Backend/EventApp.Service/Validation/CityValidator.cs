using EventApp.Entities.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Validation
{
    public class CityValidator : AbstractValidator<CityModel>
    {
        public CityValidator()
        {
            RuleFor(newCity => newCity.CityName)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3)
                .WithMessage("Şehir adı en az 3 harf olmalıdır");
        }
    }
}
