import React, { useEffect } from 'react'
import { Divider, Flex, Text, useToast } from '@chakra-ui/react'
import LetteredAvatar from 'react-lettered-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { allChatsAction, createChatAction } from "../../redux/actions/chat.action"
import { CREATE_CHAT_RESET } from '../../redux/constants/chat.constants';
const SearchedUsers = ({ user }) => {
  const dispatch = useDispatch()
  const { msg, done } = useSelector(state => state.newChat)
  const toast = useToast()
  const handleSubmit = () => {
    dispatch(createChatAction(user?._id))
  }
  useEffect(() => {
    if (msg) {
      toast({
        title: "Already created",
        description: msg,
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "info"
      })
    }
    if (done) {
      dispatch(allChatsAction())
      toast({
        title: "created",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success"
      })
    }
    dispatch({ type: CREATE_CHAT_RESET })
  }, [msg, toast, dispatch, done])
  return (
    <>
      <Flex direction="row" alignItems={"center"} cursor="pointer" ml={6} pt={4} key={user?._id} onClick={handleSubmit}>
        <LetteredAvatar name={user?.name} />
        <Flex ml={4} justifyContent={"space-around"} direction={"column"}>
          <Text fontSize={"xl"} textTransform="capitalize">{user?.email}</Text>
        </Flex>
      </Flex>
      <Divider mt={4} />
    </>
  )
}

export default SearchedUsers