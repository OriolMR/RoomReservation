using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Models
{
    //[Table("MeetingRooms")]
    public class MeetingRoom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Atributo para indicar que es autoincremental
        //[Column("MeetingRoomId")]
        public int meetingRoomId { get; set; }
        public int officeId { get; set; }
        //[Column("MeetingRoomName")]
        public string meetingRoomName { get; set; }

        public MeetingRoom()
        {
        }

        public MeetingRoom(string roomName)
        {
            this.meetingRoomName = roomName;
        }
    }
}
