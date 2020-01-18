using System;
using System.Collections.Generic;

namespace WebGame.Models
{
    public partial class UserToRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
