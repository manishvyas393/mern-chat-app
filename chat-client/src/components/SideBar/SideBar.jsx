import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUserAction } from '../../redux/actions/chat.action'
import { SEARCH_USERS_RESET } from '../../redux/constants/chat.constants'
import SearchedUsers from '../SearchedUsers/SearchedUsers'
import UserListCard from '../userListCard/UserListCard'
import {
      Box,
      CloseButton,
      Flex,
      useColorModeValue,
      Drawer,
      DrawerContent,
      useDisclosure,
      Input,
      Text,
      Button
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { LOGOUT_RESET } from '../../redux/constants/user.constants'
import { userLogOutAction } from '../../redux/actions/user.action'


export default function Sidebar({ children }) {
      const { logoutMsg } = useSelector(state => state.user)
      const { isOpen, onOpen, onClose } = useDisclosure();
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const logout = (e) => {
            e.preventDefault()
            dispatch(userLogOutAction())
      }
      useEffect(() => {
            if (logoutMsg) {
                  navigate("/")
                  dispatch({ type: LOGOUT_RESET })

            }
      }, [logoutMsg, dispatch, navigate])
      return (
            <Box minH={{ sm: "2", md: "1", lg: "full" }} bg={useColorModeValue('gray.100', 'gray.900')}>
                  <SidebarContent
                        onClose={() => onClose}
                        display={{ sm: 'none', md: "none", lg: "block" }}
                        onclick={logout}
                  />
                  <Drawer
                        autoFocus={false}
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        returnFocusOnClose={false}
                        onOverlayClick={onClose}
                        size="full">
                        <DrawerContent>
                              <SidebarContent onClose={onClose} />
                        </DrawerContent>
                  </Drawer>
                  {/* mobilenav */}
                  <MobileNav display={{ md: "flex", lg: "none", sm: "flex" }} onclick={logout} onOpen={onOpen} />
                  <Box ml={{ base: 0, md: 60 }} p="4">
                        {children}
                  </Box>
            </Box>
      );
}

const SidebarContent = ({ onClose,onclick, ...rest }) => {
      const [search, setSearch] = useState("")
      const { chats } = useSelector(state => state.chats)
      let { users } = useSelector(state => state.users)
      const dispatch = useDispatch()
      const handleChange = (e) => {
            const string = e.target.value
            e.preventDefault()
            setSearch(e.target.value)
            console.log(string === "")
            if (string !== "") {
                  dispatch(searchUserAction(string))
            }
            else {
                  dispatch({ type: SEARCH_USERS_RESET })
            }
      }

      return (
            <Box
                  bg={useColorModeValue('white', 'gray.900')}
                  borderRight="1px"
                  width={{ base: "100%", lg: "20%" }}
                  borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                  pos="fixed"
                  h="full"
                  {...rest}>
                  <Flex justifyContent={"center"} alignItems="center" mt={2}>
                        <Button display={{ base: "none", lg: "block" }} onClick={onclick}>Logout</Button>
                  </Flex>
                  <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" >
                        <Input type={"search"} px={8} py={6} value={search} onChange={handleChange} rounded="2xl" shadow={"base"} backgroundColor={"white"} placeholder="search" border={"none"}></Input>
                        <CloseButton display={{ md: 'flex', sm: "flex", lg: "none" }} onClick={onClose} />
                  </Flex>
                  <Box m={6}>
                        <Box shadow={"base"} mt={8} rounded={"2xl"}>
                              {
                                    users?.length !== 0 && users?.map(user => (
                                          <SearchedUsers user={user} />
                                    ))
                              }

                        </Box>
                        <Box shadow={"base"} mt={8} rounded={"2xl"} backgroundColor={"white"} height="80vh">
                              {
                                    chats.map(chat => (
                                          <UserListCard chat={chat} />
                                    ))
                              }
                        </Box>

                  </Box>
            </Box>
      );
};
const MobileNav = ({ onOpen,onclick,...rest }) => {
      return (
            <Flex
                  pt={2}
                  alignItems="center"
                  justifyContent="center"
                  {...rest}>
                  <Text
                        color={"white"}
                        rounded="2xl"
                        p={2}
                        backgroundColor="gray.500"
                        fontSize="xl"
                        fontWeight={"bold"}
                        variant="outline"
                        cursor={"pointer"}
                        onClick={onOpen}
                  >Chats</Text>
                  <Box mx={4}></Box>
                  <Text
                        color={"white"}
                        rounded="2xl"
                        onClick={onclick}
                        p={2}
                        backgroundColor="gray.500"
                        fontSize="xl"
                        fontWeight={"bold"}
                        variant="outline"
                        cursor={"pointer"}
                  >logout</Text>
            </Flex>
      );
};
// import { Box, Input} from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUserAction } from '../../redux/actions/chat.action'
// import { SEARCH_USERS_RESET } from '../../redux/constants/chat.constants'
// import SearchedUsers from '../SearchedUsers/SearchedUsers'
// import UserListCard from '../userListCard/UserListCard'
// const SideBar = () => {
//       const [search, setSearch] = useState("")
//       const { chats } = useSelector(state => state.chats)
//       let { users } = useSelector(state => state.users)
//       const dispatch = useDispatch()
//       const handleChange = (e) => {
//             const string = e.target.value
//             e.preventDefault()
//             setSearch(e.target.value)
//             console.log(string==="")
//             if (string!== "") {
//                   dispatch(searchUserAction(string))
//             }
//             else {
//                   dispatch({type:SEARCH_USERS_RESET})
//             }
//       }
//       return (
//             <Box m={6} width="20%">
//                   <Input type={"search"} px={8} py={6} value={search} onChange={handleChange} rounded="2xl" shadow={"base"} backgroundColor={"white"} placeholder="search" border={"none"}></Input>
//                   <Box shadow={"base"} mt={8} rounded={"2xl"}>
//                         {
//                               users?.length !== 0 && users?.map(user => (
//                                     <SearchedUsers user={user} />
//                               ))
//                         }

//                   </Box>
//                   <Box shadow={"base"} mt={8} rounded={"2xl"} backgroundColor={"white"} height="80vh">
//                         {
//                               chats.map(chat => (
//                                     <UserListCard chat={chat} />
//                               ))
//                         }
//                   </Box>

//             </Box>
//       )
// }

// export default SideBar