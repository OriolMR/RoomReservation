using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Models
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int cityId { get; set; }

        public int countryId { get; set; }

        public string cityName { get; set; }

        public City()
        {
        }
    }
}
