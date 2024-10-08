const { response } = require("express");
const { BusTripService } = require("../services/index.js");
const statusCodes = require("./statusCodes.js");

const busTripService = new BusTripService();

const create = async (req, res) => {
  try {
    // console.log(req.body);
    const busTrip = await busTripService.createBusTrip(req.body);
    const responseData = {
      id: busTrip.id,
      busId: busTrip.busId,
      departureStationId: busTrip.departureStationId,
      arrivalStationId: busTrip.arrivalStationId,
      departureCityId: busTrip.departureCityId,
      arrivalCityId: busTrip.arrivalCityId,
      departureDateTime: busTrip.departureDateTime,
      arrivalDateTime: busTrip.arrivalDateTime,
      availableSeats: busTrip.availableSeats,
      viaRoutes: busTrip.viaRoutes,
      viaStops: busTrip.viaStops,
      ticketPrice: busTrip.ticketPrice,
      status: busTrip.status,
      updatedAt: busTrip.updatedAt,
      createdAt: busTrip.createdAt,
    };
    return res.status(statusCodes.CREATED).json({
      data: responseData,
      success: true,
      message: "Successfully created bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create bus trip",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await busTripService.deleteBusTrip(req.params.id);
    if (response === false) {
      return res.status(statusCodes.NOT_FOUND).json({
        data: {},
        success: false,
        message: "Bus trip not found for deletion",
        err: {},
      });
    }
    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete bus trip",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await busTripService.updateBusTrip(
      req.params.id,
      req.body
    );
    return res.status(statusCodes.OK).json({
      
      data: response,
      success: true,
      message: "Successfully updated bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update bus trip",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const status = req.query.status;
    const busTrips = await busTripService.getAllBusTrips(status);
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message: "Successfully fetched all bus trips with the given status",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch all bus trips with the given status",
      err: error,
    });
  }
};

const getBusTripsById = async (req, res) => {
  try {
    const busTrip = await busTripService.getBusTripsById(req.params.id);
    const responseData = {
      id: busTrip.id,
      busId: busTrip.busId,
      departureStationId: busTrip.departureStationId,
      arrivalStationId: busTrip.arrivalStationId,
      departureCityId: busTrip.departureCityId,
      arrivalCityId: busTrip.arrivalCityId,
      departureDateTime: busTrip.departureDateTime,
      arrivalDateTime: busTrip.arrivalDateTime,
      availableSeats: busTrip.availableSeats,
      viaRoutes: busTrip.viaRoutes,
      viaStops: busTrip.viaStops,
      ticketPrice: busTrip.ticketPrice,
      status: busTrip.status,
      updatedAt: busTrip.updatedAt,
      createdAt: busTrip.createdAt,
    };
    return res.status(statusCodes.OK).json({
      data: responseData,
      success: true,
      message: "Successfully fetched bus trips with the provided busTrip id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch bus trips with the provided busTrip id",
      err: error,
    });
  }
};

const getBusTripsByBusId = async (req, res) => {
  try {
    const busTrips = await busTripService.getBusTripsByBusId(req.params.busId);
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message: "Successfully fetched bus trips with the given bus id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch bus trips with the gis ven buid",
      err: error,
    });
  }
};

const getActiveBusTripsByDepartureCityIdAndArrivalCityId = async (req, res) => {
  try {
    console.log(req.params.departureCityId);
    console.log(req.params.arrivalCityId);
    const busTrips =
      await busTripService.getActiveBusTripsByDepartureCityIdAndArrivalCityId(
        req.params.departureCityId,
        req.params.arrivalCityId
      );
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message:
        "Successfully fetched active bus trips with the given departure city id and arrival city id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message:
        "Not able to fetch active bus trips with the given departure city id and arrival city id",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  update,
  getAll,
  getBusTripsById,
  getBusTripsByBusId,
  getActiveBusTripsByDepartureCityIdAndArrivalCityId,
};
