using EventApp.Entities.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Service.Validation
{
    public class CategoryValidator : AbstractValidator<CategoryModel>
    {
        public CategoryValidator()
        {
            RuleFor(newCategory => newCategory.CategoryName)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3)
                .WithMessage("Kategori adı en az 3 harf olmalıdır");
        }
    }
}
