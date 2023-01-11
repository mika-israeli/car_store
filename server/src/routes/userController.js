const router = require('express').Router();
const userService = require('../services/userService');
const { verifyAuth, verifyAuthAdmin } = require('../validation/tokenVerify');
const bcrypt = require('bcrypt');


router.patch('/:id', async (req, res) => {
  if (req.body.password) {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedpassword;
  }
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/find/:id', async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
//TODO : add admin auth to this route
router.get('/all', async (req, res) => {
  try {
    const result = await userService.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
