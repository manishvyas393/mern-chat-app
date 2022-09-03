import Message from "../models/message.js";
import Chat from "../models/chat.js";
export const sendMessage = async (req, res) => {
      try {
            const { msg } = req.body
            console.log(msg)
            const chat = await Chat.findById(req.params.id)
            if (chat) {
                  const newMessage = new Message({
                        sender: req.user._id,
                        content: msg,
                        chat: chat.id
                  })
                  const saveMsg = await newMessage.save()
                  const getMsg = await Message.findById(saveMsg.id).populate("sender", "name id email")
                        .populate("chat")
                  return res.send({ newMessage:getMsg })
            }
            res.status(404).json({ msg: "no chat" })
      } catch (error) {
            res.status(500).send(error)
      }
}
export const fetchAllMessages = async (req, res) => {
      try {
            const { chatId } = req.params
            const chat = await Chat.findOne({
                  _id: chatId,
                  $and: [
                        { users: { $elemMatch: { $eq: req.user._id } } },
                  ]
            })
            const messages = await Message.find({ chat: chat.id }).populate("sender", "name id email")
                  .populate("chat")
            res.json(messages)
      } catch (error) {
            res.status(500).json(error)
      }
}