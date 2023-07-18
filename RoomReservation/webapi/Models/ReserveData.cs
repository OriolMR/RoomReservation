namespace webapi.Models
{
    public class ReserveData
    {
   
            public DateTime ReserveDate { get; set; }
            public TimeSpan StartingHour { get; set; }
            public TimeSpan EndingHour { get; set; }
            public int MeetingRoomId { get; set; }
            public string UserId { get; set; }
        

    }
}
