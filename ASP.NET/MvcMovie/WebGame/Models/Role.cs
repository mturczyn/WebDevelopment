using System;
using System.Collections.Generic;

namespace WebGame.Models
{
    public partial class Role
    {
        public Role()
        {
            UserToRole = new HashSet<UserToRole>();
        }

        public int Id { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<UserToRole> UserToRole { get; set; }
    }
}
