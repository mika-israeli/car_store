const orders = require("../models/order.model");
const users = require("../models/user.model");
const cars = require("../models/car.model");

const getMostSoldCars = async () => {
  //get the top 3 most sold cars by id
  const mostSoldCars = await orders
    .aggregate([
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "cars",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $group: {
          _id: "$items",
          sum: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          sum: -1,
        },
      },
      {
        $group: {
          _id: null,
          "top_selling_products ": {
            $push: "$_id",
          },
        },
      },
    ])
    .limit(3);
  return mostSoldCars[0];
};

const getAllOrdersInDateRange = async (startDate, endDate) => {
  const ordersInDateRange = await orders.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  return ordersInDateRange;
};

const getYearlySalesPerMonth = async () => {
  const monthlySales = await orders.aggregate([{ $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } }, { $sort: { _id: 1 } }]);
  return monthlySales;
};
const getSalesPerMonth = async (month) => {
  const monthlySales = await getYearlySalesPerMonth();
  const salesPerMonth = monthlySales.filter((monthlySales) => monthlySales._id == month);
  return salesPerMonth;
};
const todaySales = async () => {
  //get the total today's sales
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const todaySales = await orders.aggregate([{ $match: { createdAt: { $gte: todayStart, $lt: todayEnd } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
  return todaySales[0];
};
const weeklySales = async () => {
  //get the total weekly sales
  const today = new Date();
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
  const weeklySales = await orders.aggregate([{ $match: { createdAt: { $gte: weekStart, $lt: weekEnd } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
  return weeklySales[0];
};

module.exports = { getMostSoldCars, getAllOrdersInDateRange, getYearlySalesPerMonth, getSalesPerMonth, todaySales, weeklySales };
