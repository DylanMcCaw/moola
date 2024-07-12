using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddExpenseIconColour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Expenses",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<string>(
                name: "IconColour",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IconColour",
                table: "Expenses");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "Expenses",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
