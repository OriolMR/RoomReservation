using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LocationService.Models
{
    public class City
    {
        [Key]
        public int cityId { get; set; }

        public int countryId { get; set; }

        public string cityName { get; set; }

        public City()
        {
        }
    }
}

