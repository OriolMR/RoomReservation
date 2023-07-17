namespace webapi.Models
{
    public class UpdateUserModel
    {
        public string newUserName { get; set; }
        public string newEmail { get; set; }
        public string newPasswordHash { get; set; }
    }
}
