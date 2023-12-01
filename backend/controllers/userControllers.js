const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();

    if (allUser.length > 0) {
      res.json(allUser);
    } else {
      res.json({ status: "no users found in db" });
    }
  } catch (error) {
    res.json({ status: "internal server error" });
    console.log("error occured:", error.message);
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.json({ status: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "bad request" });
    console.log("error occured:");
  }
};

const registerNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ status: "email already in use" });
    }

    const newUser = await User.create({ username, email, password });

    res.json(newUser);
    console.log(newUser);
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ status: "user not saved to db", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      await User.deleteOne({ _id: user.id });
      res.json({ status: "user succesfult deleted" });
    } else {
      res.json({ status: "user not found and not deleted" });
    }
  } catch (error) {
    res.json({ status: "internal server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      const secret = "soleil00ChatApp";
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      isPasswordValid
        ? res.json({ user, token })
        : res.json({ status: "invaliad password" });
    } else {
      res.json({ status: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ status: "internal server error" });
  }
};

module.exports = {
  deleteUser,
  getAllUser,
  registerNewUser,
  getSingleUser,
  loginUser,
};
