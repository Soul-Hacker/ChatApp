const { AccessChat, AddGroup, AllChat, CreateGroupChat, RemoveFromGroup, RenameGroup } =require("../Controller/ChatController");
const { protect } =require("../MiddleWare/AuthMiddle");

const express=require("express")
const ChatRouter = express.Router(); 
ChatRouter.route("/").post(protect,AccessChat)
ChatRouter.route("/").get(protect,AllChat)
ChatRouter.route("/Group").post(protect,CreateGroupChat);
ChatRouter.route("/Rename").put(protect,RenameGroup);
ChatRouter.route("/RemoveGroup").put(protect,RemoveFromGroup)
ChatRouter.route("/AddGroup").put(protect,AddGroup)





module.exports = ChatRouter;