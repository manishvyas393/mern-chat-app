import { Divider, Flex, Text } from '@chakra-ui/react'
import LetteredAvatar from 'react-lettered-avatar';

import React from 'react'
import { getUser } from '../../utils/getname';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserListCard = ({ chat }) => {
      const user = getUser(chat?.users)
      const { selectedChat } = useSelector(state => state.messages)
      return (
            <>
                  <Flex direction="row"
                        cursor={"pointer"}
                        borderRightRadius="md"
                        borderRight={selectedChat === chat?._id ? "4px" : "0"}
                        borderRightColor={selectedChat === chat?._id ? "whatsapp.400" : ""}
                        alignItems={"center"} ml={6} py={4} key={chat?._id}>
                        <LetteredAvatar name={user[0]?.name} />
                        <Link to={`/chat/${chat?._id}`}>
                              <Flex ml={4} justifyContent={"space-around"} direction={"column"}>
                                    <Text fontSize={"xl"} textTransform="capitalize">{user[0]?.email}</Text>
                                    <Text fontSize={"xs"}>last message</Text>
                              </Flex>
                        </Link>
                  </Flex>
                  <Divider/>
            </>



      )
}

export default UserListCard