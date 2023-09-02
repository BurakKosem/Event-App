using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventApp.Entities.Identity;

namespace EventApp.DataAccess.Configs
{
    public class UserConfig : IEntityTypeConfiguration<ApiUser>
    {
        public void Configure(EntityTypeBuilder<ApiUser> builder)
        {

            var admin = new ApiUser
            {
                Id = "19a1c6b0-8ef4-4ae6-bab0-ee656235752t",
                UserName = "Admin",
                Email = "admin@gmail.com",
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN",
                FirstName = "Burak",
                LastName = "Kösem",

            };
            admin.PasswordHash = CreatePasswordHash(admin, "Admin123!");

            builder.HasData(admin);

            
        }
        private string CreatePasswordHash(ApiUser user, string password)
        {
            var passwordHasher = new PasswordHasher<ApiUser>();
            return passwordHasher.HashPassword(user, password);
        }
    }
}
