const statistisService = require("../services/statisticsService");

const router = require("express").Router();
// TODO: add admin auth to this controller
router.get("/salesPerMonth/:month", async (req, res) => {
  const month = req.params.month;
  const result = await statistisService.getSalesPerMonth(month);
  res.json(result);
});

router.get("/yearlySalesPerMonth", async (req, res) => {
  const result = await statistisService.getYearlySalesPerMonth();
  res.json(result);
});

router.get("/mostSoldCars", async (req, res) => {
  const result = await statistisService.getMostSoldCars();
  res.json(result);
});

router.get("/OrdersInRange", async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const result = await statistisService.getAllOrdersInDateRange(startDate, endDate);
  res.json(result);
});

router.get("/todaySales", async (req, res) => {
  const result = await statistisService.todaySales();
  res.json(result);
});

router.get("/weeklySales", async (req, res) => {
  const result = await statistisService.weeklySales();
  res.json(result);
});

router.get("/lastFiveOrders", async (req, res) => {
  const result = await statistisService.LastFiveOrders();
  res.json(result);
});
module.exports = router;
