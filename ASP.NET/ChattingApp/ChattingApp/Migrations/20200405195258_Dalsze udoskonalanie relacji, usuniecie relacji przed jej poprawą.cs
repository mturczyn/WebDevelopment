using Microsoft.EntityFrameworkCore.Migrations;

namespace ChattingApp.Migrations
{
    public partial class Dalszeudoskonalanierelacjiusuniecierelacjiprzedjejpoprawą : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "SentTo",
                table: "Message",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SentBy",
                table: "Message",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SentByUserId",
                table: "Message",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SentToUserId",
                table: "Message",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "SentByUserId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SentToUserId",
                table: "Message");

            migrationBuilder.AlterColumn<int>(
                name: "SentTo",
                table: "Message",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "SentBy",
                table: "Message",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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
    }
}
