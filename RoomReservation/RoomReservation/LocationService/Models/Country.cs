using System.ComponentModel.DataAnnotations;

namespace LocationService.Models
{
    public class Country
    {
        internal int cityId;

        [Key]
        public int countryId { get; set; }

        public string countryName { get; set; }

        // Constructor sin parámetros requerido para Entity Framework
        public Country()
        {
        }

        public Country(string countryName)
        {
            countryName = countryName;
        }
    }
}

