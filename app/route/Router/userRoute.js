const express = require('express');
const router = express();
const userController = require('../../controller/userController');

router.get("/", userController.home);
router.post("/payment", userController.payment);


module.exports = router;
