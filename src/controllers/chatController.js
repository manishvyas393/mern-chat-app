import Chat from "../models/chat.js";
import User from "../models/user.js";
export const createOrCheckChat = async (req, res) => {
      const otherUser = req.params.id
      try {
            const isChat = await Chat.find({
                  $and: [
                        { users: { $elemMatch: { $eq: req.user._id } } },
                        { users: { $elemMatch: { $eq: otherUser } } }
                  ]
            }).populate("users", "_id name email")
            if (isChat[0]) {
                  return res.status(200).json({
                        msg: "chat already created"
                  })
            }
            let chatData = {
                  users: [req.user._id, otherUser]
            }
            const newChat = await new Chat(chatData).save()
            const chat = await Chat.findById(newChat.id).populate("users", "_id name email")
            res.json({chat:[chat]})
      } catch (error) {
            console.log(error)
            res.status(500).send(error)
      }
}
export const fetchChats = async (req, res) => {
      await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "_id name email")
            .sort({ updatedAt: -1 })
            .then(async results => {
                  res.status(200).json({
                        chats: results
                  });
            })
}
export const singleChat = async (req, res) => {
      try {
            const { id } = req.params
            const chat = await Chat.findById(id).populate("users", "_id name email")
            res.json({ chat })
      } catch (error) {
            res.status(500).send()
      }
}
export const allUsers = async (req, res) => {
      const keyword = req.query.search ? {
            $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
            ]
      } : {}
      let Users = await User.find(keyword)
      let users = Users.filter(user => user.id !== req.user._id.toString())
      res.status(200).json({
            users
      })

}