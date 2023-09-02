using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EventApp.Core.Logging
{
    public class LogDetails
    {
        public Object? Model { get; set; }
        public Object? Controller { get; set; }
        public Object? Action { get; set; }
        public Object? Id { get; set; }

        public override string ToString() =>
            JsonSerializer.Serialize(this);
    }
}
