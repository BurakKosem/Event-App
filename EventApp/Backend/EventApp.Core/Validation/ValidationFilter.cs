using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Core.Validation
{
    public class ValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if(!context.ModelState.IsValid)
            {
                var errors = context.ModelState
                    .Where(error => error.Value.Errors.Count  > 0)
                    .ToDictionary(e => e.Key, 
                                  e => e.Value.Errors.Select(e => 
                                  new{ e.ErrorMessage })).ToList();

                context.Result =new BadRequestObjectResult(errors);
                return;
            }
            await next();
        }
    }
}
