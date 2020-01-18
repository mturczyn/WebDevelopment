using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebGame.Models
{
    public partial class WebAppDbContext : DbContext
    {
        public WebAppDbContext()
        {
        }

        public WebAppDbContext(DbContextOptions<WebAppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserToRole> UserToRole { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=WebAppDb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>(entity =>
            {
              entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

      modelBuilder.Entity<UserToRole>(entity =>
      {
        entity.HasKey(e => new { e.UserId, e.RoleId })
                  .HasName("PK__UserToRo__AF2760ADCB5E81EA");

        entity.HasOne(d => d.Role)
                  .WithMany(p => p.UserToRole)
                  .HasForeignKey(d => d.RoleId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK__UserToRol__RoleI__3B75D760");

        entity.HasOne(d => d.User)
                  .WithMany(p => p.UserToRole)
                  .HasForeignKey(d => d.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK__UserToRol__UserI__3A81B327");
      });

      OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
