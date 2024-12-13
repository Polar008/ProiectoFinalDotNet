using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<ShopOffer> ShopOffers { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<UserOffer> UserOffers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Offer>()
                .HasOne(o => o.Province)
                .WithMany(p => p.Offers)
                .HasForeignKey(o => o.ProvinceId);

            modelBuilder.Entity<UserOffer>()
                .HasKey(uo => new { uo.UserId, uo.OfferId });

            modelBuilder.Entity<UserOffer>()
                .HasOne(uo => uo.User)
                .WithMany(u => u.UserOffers)
                .HasForeignKey(uo => uo.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<UserOffer>()
            //     .HasOne(uo => uo.Offer)
            //     .WithMany(o => o.UserOffers)
            //     .HasForeignKey(uo => uo.OfferId)
            //     .OnDelete(DeleteBehavior.Restrict);

        }
    }
}