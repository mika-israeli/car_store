const router = require("express").Router();
const orderService = require("../services/orderService");
const { orderValidationSchema } = require("../validation/validationsSchema");
const validateSchema = require("../validation/validation");
const { verifyAuth } = require("../validation/tokenVerify");
router.get("/find/:userId", verifyAuth, async (req, res) => {
  const orders = await orderService.getByUserId(req.params.userId);
  res.json(orders);
});

router.post("/add", orderValidationSchema, validateSchema, verifyAuth, async (req, res) => {
  const order = await orderService.add(req.body);
  res.json(order);
});

// router.put("/:id", orderValidationSchema, validateSchema, verifyAuth, async (req, res) => {
//   const order = await orderService.update(req.params.id, req.body);
//   res.json(order);
// });
module.exports = router;
