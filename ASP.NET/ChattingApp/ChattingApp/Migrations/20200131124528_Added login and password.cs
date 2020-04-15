using Microsoft.EntityFrameworkCore.Migrations;

namespace ChattingApp.Migrations
{
    public partial class Addedloginandpassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__UserToRol__RoleI__3B75D760",
                table: "UserToRole");

            migrationBuilder.DropForeignKey(
                name: "FK__UserToRol__UserI__3A81B327",
                table: "UserToRole");

            migrationBuilder.DropPrimaryKey(
                name: "PK__UserToRo__AF2760ADCB5E81EA",
                table: "UserToRole");

            migrationBuilder.DropColumn(
                name: "Login",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "User");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Role",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserToRole_UserId",
                table: "UserToRole",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Role_UserId",
                table: "Role",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Role_User_UserId",
                table: "Role",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Role_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserToRole_Role_RoleId",
                table: "UserToRole",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserToRole_User_UserId",
                table: "UserToRole",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
