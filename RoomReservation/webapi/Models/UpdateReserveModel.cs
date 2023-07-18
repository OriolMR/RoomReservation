using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class UpdateReserveModel
    {
        public int ReserveId { get; set; }

        public DateTime ReserveDate { get; set; }


        public TimeSpan StartingHour { get; set; }

        public TimeSpan EndingHour { get; set; }
    }
}
