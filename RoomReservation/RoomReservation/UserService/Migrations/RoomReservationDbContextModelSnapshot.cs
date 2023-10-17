﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.DataAccess;

#nullable disable

namespace webapi.Migrations
{
    [DbContext(typeof(IdentityAppDbContext))]
    partial class RoomReservationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AuthApplication.Models.City", b =>
                {
                    b.Property<int>("cityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("cityId"));

                    b.Property<string>("cityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("countryId")
                        .HasColumnType("int");

                    b.HasKey("cityId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("AuthApplication.Models.Country", b =>
                {
                    b.Property<int>("countryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("countryId"));

                    b.Property<string>("countryName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("countryId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("AuthApplication.Models.Office", b =>
                {
                    b.Property<int>("officeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("officeId"));

                    b.Property<int>("cityId")
                        .HasColumnType("int");

                    b.Property<string>("officeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("officeId");

                    b.ToTable("Offices");
                });

            modelBuilder.Entity("AuthApplication.Models.Reserve", b =>
                {
                    b.Property<int>("reserveId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("reserveId"));

                    b.Property<DateTime>("endingHour")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("reserveDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("roomId")
                        .HasColumnType("int");

                    b.Property<DateTime>("startingHour")
                        .HasColumnType("datetime2");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("reserveId");

                    b.ToTable("Reserves");
                });

            modelBuilder.Entity("AuthApplication.Models.Room", b =>
                {
                    b.Property<int>("roomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("roomId"));

                    b.Property<int>("officeId")
                        .HasColumnType("int");

                    b.Property<string>("roomName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("roomId");

                    b.ToTable("Rooms");
                });
#pragma warning restore 612, 618
        }
    }
}
