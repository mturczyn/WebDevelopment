using Microsoft.EntityFrameworkCore.Migrations;

namespace ChattingApp.Migrations
{
    public partial class Dalszeudoskonalanierelacjidodanierelacji : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SentBy",
                table: "Message",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SentTo",
                table: "Message",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentBy",
                table: "Message",
                column: "SentBy");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentTo",
                table: "Message",
                column: "SentTo");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentBy",
                table: "Message",
                column: "SentBy",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentTo",
                table: "Message",
                column: "SentTo",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentBy",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentTo",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentBy",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentTo",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentBy",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentTo",
                table: "Message");
        }
    }
}
