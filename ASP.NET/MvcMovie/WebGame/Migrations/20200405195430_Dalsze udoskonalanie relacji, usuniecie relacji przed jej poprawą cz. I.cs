using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGame.Migrations
{
    public partial class DalszeudoskonalanierelacjiusuniecierelacjiprzedjejpoprawączI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentByUserId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentToUserId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentByUserId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentToUserId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentBy",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentByUserId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentTo",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentToUserId",
                table: "Message");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SentBy",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SentByUserId",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SentTo",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SentToUserId",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentByUserId",
                table: "Message",
                column: "SentByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentToUserId",
                table: "Message",
                column: "SentToUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentByUserId",
                table: "Message",
                column: "SentByUserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentToUserId",
                table: "Message",
                column: "SentToUserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
