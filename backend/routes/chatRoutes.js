const express = require("express");
const { getAllChat } = require("../controllers/chatControllers");
const router = express.Router();

router.get("/", getAllChat);
// router.post("/", createNewChat);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroupChat);
// router.put("/groupremove", removeUserFromGroup);
// router.put("/groupadd", addUserToGroup);

module.exports = router;
