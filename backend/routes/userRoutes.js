const express = require("express");
const {
  getAllUser,
  getSingleUser,
  registerNewUser,
  deleteUser,
  loginUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/", registerNewUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);

module.exports = router;
