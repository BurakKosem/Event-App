using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EventApp.DataAccess.Configs
{
    public class UserRoleMap : IEntityTypeConfiguration<IdentityUserRole<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
        {
            builder.HasKey(r => new { r.UserId, r.RoleId });

            builder.ToTable("AspNetUserRoles");

            builder.HasData(
            new IdentityUserRole<string> { UserId = "19a1c6b0-8ef4-4ae6-bab0-ee656235752t", RoleId = "b3b74204 - c542 - 40d6 - b224 - 57f056616c11" }
        );

        }
    }
}
