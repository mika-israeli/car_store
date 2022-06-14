const router = require("express").Router();
const carService = require("../services/carService");
const { carValidationSchema } = require("../validation/validationsSchema");
const validateSchema = require("../validation/validation");
const { verifyAuthAdmin } = require("../validation/tokenVerify");
router.get("/", async (req, res) => {
  const qType = req.query.type;
  if (qType) {
    const result = await carService.getByType(qType);
    res.status(200).json(result);
    return;
  }
  const cars = await carService.getAll();
  res.json(cars);
});

router.get("/:field/:value", async (req, res) => {
  const cars = await carService.getByField(req.params.field, req.params.value);
  res.json(cars);
});

//TODO: add authentication to this route
router.post("/add", carValidationSchema, validateSchema, verifyAuthAdmin, async (req, res) => {
  const car = await carService.add(req.body);
  res.json(car);
});
//TODO: add authentication to this route
router.patch("/update/:id", carValidationSchema, validateSchema, verifyAuthAdmin, async (req, res) => {
  const car = await carService.update(req.params.id, req.body);
  res.json(car);
});
//TODO: add authentication to this route
router.delete("/delete/:id", verifyAuthAdmin, async (req, res) => {
  const car = await carService.remove(req.params.id);
  res.json(car);
});

module.exports = router;
