import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import LetteredAvatar from 'react-lettered-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css'
import ScrollToBottom from 'react-scroll-to-bottom';
import { fetchAllmessagesAction, sendMessageAction } from '../../redux/actions/messages.action';
import moment from 'moment';
import io from "socket.io-client"
import { UPDATE_MESSAGES } from '../../redux/constants/messages.constants';
import { LOGOUT_RESET } from '../../redux/constants/user.constants';
import { useNavigate } from 'react-router-dom';
const endPoint = process.env.REACT_APP_BASE_URL;
let socket
const ChatBox = ({ id }) => {
      const [msg, setMsg] = useState(null)
      const { messages, selectedChat } = useSelector(state => state.messages)
      const { user, msg: logoutMsg } = useSelector(state => state.user)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const onSend = async (e) => {
            e.preventDefault()
            const data = await dispatch(sendMessageAction(selectedChat, msg))
            socket.emit("sendMessage", data, selectedChat)
      }

      const Styles = css({
            height: "100%",
            boxSizing: "border-box",
      })
      useEffect(() => {
            if (id) dispatch(fetchAllmessagesAction(id))
            socket = io(endPoint)
            socket.emit("join", user, selectedChat, err => {
                  if (err) {
                        console.log(err)
                  }
            })
            socket.on("message", (data) => {
                  if (data) {
                        dispatch({ type: UPDATE_MESSAGES, payload: data })
                  }
            })
      }, [selectedChat, user, dispatch, id])
      useEffect(() => {
            if (logoutMsg) {
                  navigate("/")
                  dispatch({ type: LOGOUT_RESET })

            }
      }, [logoutMsg, dispatch, navigate])
      return (
            <Flex direction={"column"} px={{ base: "0", sm: "4" }} width="100%" height={{ sm: "80vh", md: "85vh", lg: "100vh" }} ml={{ base: 0, lg: 32 }}>
                  <Box backgroundColor={"white"}
                        shadow={"base"} rounded="2xl"
                        mt={4} height="90vh" overflowY="auto"
                        css={{
                              '&::-webkit-scrollbar': {
                                    width: '0px',
                              },
                              '&::-webkit-scrollbar-track': {
                                    width: '0px',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                    background: "transparent",
                                    borderRadius: '24px',
                              },
                        }}
                  >
                        <ScrollToBottom className={Styles}>
                              {
                                    messages.map(message => (

                                          <Flex

                                                alignItems="center"
                                                justifyContent={message?.sender?._id !== user?._id ? "flex-start" : "flex-end"}
                                                m={4}
                                                key={message?._id}
                                                px={4}
                                          >
                                                {
                                                      message?.sender?._id !== user?._id ?
                                                            (
                                                                  <>
                                                                        <Box textAlign={"center"}>
                                                                              <LetteredAvatar name={message?.sender?.name} />
                                                                              <Text fontSize={"xs"}>{moment(message?.createdAt).fromNow()}</Text>
                                                                        </Box>
                                                                        <Text ml={4} backgroundColor="#f5f7fb" p={4} rounded={"2xl"} borderTopLeftRadius={message?.sender?._id !== user?._id ? 0 : "2xl"} borderTopRightRadius={message?.sender?._id === user?._id ? 0 : "2xl"}>{message?.content}</Text>
                                                                  </>
                                                            ) :
                                                            (
                                                                  <>
                                                                        <Box textAlign={"center"}>
                                                                              <Text ml={4} backgroundColor="purple.600" p={4} color="white" rounded={"2xl"} borderTopLeftRadius={message?.sender?._id !== user?._id ? 0 : "2xl"} borderTopRightRadius={message?.sender?._id === user?._id ? 0 : "2xl"}>{message?.content}</Text>
                                                                              <Text fontSize={"xs"}>{moment(message?.createdAt).fromNow()}</Text>
                                                                        </Box>
                                                                  </>
                                                            )
                                                }
                                          </Flex>
                                    )
                                    )}
                        </ScrollToBottom>
                  </Box>
                  <Flex mt={2} justifyContent="space-between">
                        <Input backgroundColor={"white"} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={"type nessage"} width="90%" py={4} shadow="2xl" rounded="2xl"></Input>
                        <Button backgroundColor={"purple.700"} width="8%" shadow={"base"} rounded="2xl" color="white" onClick={onSend}>Send</Button>
                  </Flex>

            </Flex>

      )
}

export default ChatBox