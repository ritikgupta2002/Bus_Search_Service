"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("busTrips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Buses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      departureStationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BusStations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      arrivalStationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BusStations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      departureCityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      arrivalCityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      departureDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrivalDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrivalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ticketPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: false,
        defaultValue: "Active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("busTrips");
  },
};