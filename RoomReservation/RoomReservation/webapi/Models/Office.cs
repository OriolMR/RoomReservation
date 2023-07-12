using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Models
{
    public class Office
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int officeId { get; set; }

        public int cityId { get; set; }

        public string officeName { get; set; }

        public Office()
        {
        }

        public Office(string officeName)
        {
            this.officeName = officeName;
        }
    }
}
