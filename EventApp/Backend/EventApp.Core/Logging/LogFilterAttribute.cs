using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventApp.Core.Logging
{
    public class LogFilterAttribute : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Log.Information(Logs($"OnActionExecuting", context.RouteData));
        }

        private string Logs(string modelName, RouteData routeData)
        {
            var logDetails = new LogDetails()
            {
                Model = modelName,
                Controller = routeData.Values["controller"],
                Action = routeData.Values["action"]
            };

            if (routeData.Values.Count > 0)
                logDetails.Id = routeData.Values["id"];
            return logDetails.ToString();
        }
    }
}
