const router = require('express').Router();
const carService = require('../services/carService');
const { carValidationSchema } = require('../validation/validationsSchema');
const validateSchema = require('../validation/validation');
const { verifyAuthAdmin } = require('../validation/tokenVerify');
router.get('/', async (req, res) => {
  const cars = await carService.getAll();
  res.json(cars);
});
router.get('/type/:type', async (req, res) => {
  const type = req.params.type;
  const cars =
    type === 'all'
      ? await carService.getAll()
      : await carService.getByType(type);
  res.json(cars);
}),
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await carService.getById(id);
    res.json(car);
  });

router.get('/:field/:value', async (req, res) => {
  const cars = await carService.getByField(req.params.field, req.params.value);
  res.json(cars);
});

//TODO: add authentication to this route
router.post('/add', carValidationSchema, validateSchema, async (req, res) => {
  const car = await carService.add(req.body);
  res.json(car);
});

router.post(
  '/addall',
  carValidationSchema,
  validateSchema,
  async (req, res) => {
    console.log('got request');
    const car = await carService.addAll(req.body);
    res.json(car);
  }
);

//TODO: add authentication to this route
router.patch('/:id', carValidationSchema, verifyAuthAdmin, async (req, res) => {
  const car = await carService.update(req.params.id, req.body);
  res.json(car);
});
//TODO: add authentication to this route
router.delete('/:id', async (req, res) => {
  const car = await carService.remove(req.params.id);
  res.json(car);
});

module.exports = router;
