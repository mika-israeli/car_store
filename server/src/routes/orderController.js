const router = require("express").Router();
const orderService = require("../services/orderService");
const { orderValidationSchema } = require("../validation/validationsSchema");
const validateSchema = require("../validation/validation");
router.get("/all", async (req, res) => {
  const orders = await orderService.getAll();
  res.json(orders);
});

router.get("/:field/:value", async (req, res) => {
  const orders = await orderService.getByField(req.params.field, req.params.value);
  res.json(orders);
});

//TODO: add authentication to this route
router.post("/add", orderValidationSchema, validateSchema, async (req, res) => {
  const order = await orderService.add(req.body);
  res.json(order);
});
//TODO: add authentication to this route
router.patch("/update/:id", orderValidationSchema, validateSchema, async (req, res) => {
  const order = await orderService.update(req.params.id, req.body);
  res.json(order);
});
//TODO: add authentication to this route
router.delete("/delete/:id", async (req, res) => {
  const order = await orderService.remove(req.params.id);
  res.json(order);
});

module.exports = router;
