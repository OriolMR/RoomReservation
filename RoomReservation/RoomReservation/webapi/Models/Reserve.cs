using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Models
{
    public class Reserve
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int reserveId { get; set; }

        public int meetingRoomId { get; set; }

        public string userId { get; set; }

        public DateTime reserveDate { get; set; }

        public TimeSpan startingHour { get; set; }

        public TimeSpan endingHour { get; set; }

        public Reserve()
        {
        }

        public Reserve(DateTime reserveDate, TimeSpan startingHour, TimeSpan endingHour)
        {
            this.reserveDate = reserveDate;
            this.startingHour = TimeSpan.FromTicks(startingHour.Ticks);
            this.endingHour = TimeSpan.FromTicks(endingHour.Ticks);
        }
    }
}
