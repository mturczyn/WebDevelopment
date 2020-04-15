using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChattingApp.Migrations
{
    public partial class Dodanietabeliwiadomości : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MessageId",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MessageId1",
                table: "User",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TimeSent = table.Column<DateTime>(nullable: false),
                    IsRead = table.Column<bool>(nullable: false),
                    MessageText = table.Column<string>(maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_MessageId",
                table: "User",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_User_MessageId1",
                table: "User",
                column: "MessageId1");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Id",
                table: "Message",
                column: "Id")
                .Annotation("SqlServer:Clustered", false);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Message_MessageId",
                table: "User",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Message_MessageId1",
                table: "User",
                column: "MessageId1",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Message_MessageId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Message_MessageId1",
                table: "User");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropIndex(
                name: "IX_User_MessageId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_MessageId1",
                table: "User");

            migrationBuilder.DropColumn(
                name: "MessageId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "MessageId1",
                table: "User");
        }
    }
}
