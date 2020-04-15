using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChattingApp.Migrations
{
    public partial class Dodanietabeliwiadomościpoprawkarelacjipodejścienumer2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Message_MessageId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Message_MessageId1",
                table: "User");

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

            migrationBuilder.AddColumn<int>(
                name: "SentById",
                table: "Message",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SentToId",
                table: "Message",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "MessageId",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MessageId1",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_MessageId",
                table: "User",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_User_MessageId1",
                table: "User",
                column: "MessageId1");

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
    }
}
