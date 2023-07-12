using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Models
{
    public class Country
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Atributo para indicar que es autoincremental
        public int countryId { get; set; }
        public string countryName { get; set; }

        // Constructor sin parámetros requerido para Entity Framework
        public Country()
        {
        }

        public Country(string countryName)
        {
            this.countryName = countryName;
        }
    }
}

