using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGame.Migrations
{
    public partial class Dodanietabeliwiadomościpoprawkarelacjipodejścienumer3zmiananazwkolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentById",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_SentToId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentById",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SentToId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentById",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentToId",
                table: "Message");

            migrationBuilder.AddColumn<int>(
                name: "SentBy",
                table: "Message",
                nullable: true);

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

            migrationBuilder.AddColumn<int>(
                name: "SentById",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SentToId",
                table: "Message",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentById",
                table: "Message",
                column: "SentById");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SentToId",
                table: "Message",
                column: "SentToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentById",
                table: "Message",
                column: "SentById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_SentToId",
                table: "Message",
                column: "SentToId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
