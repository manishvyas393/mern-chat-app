import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, useToast } from '@chakra-ui/react'
import InPut from '../InPut/InPut'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../../redux/actions/user.action'
import { useNavigate } from 'react-router-dom'
const Login = () => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const toast = useToast()
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const {user}=useSelector(state=>state.user)
      const handleSubmit = async (e) => {
            e.preventDefault()
            if (!email || !password) {
                  return toast({
                        title: "all fields required",
                        position: "top",
                        status: "warning",
                        isClosable: true,
                        duration:5000,
                  })
            }
            dispatch(userLoginAction(email, password))
            navigate("/chat")
      }
      useEffect(() => {
            if (user) {
                  navigate("/chat")
            }
      },[navigate,user])
      return (
            <Box px={8}>
                  <form>
                        <Box mb={2}>
                              <InPut type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box mb={2}>
                              <InPut type={"password"} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Flex justifyContent={"center"} alignItems={"center"} mt={8}>
                              <Button textAlign={"center"} backgroundColor="purple.500" color={"white"} onClick={handleSubmit}>Log In</Button>
                        </Flex>
                  </form>
            </Box>
      )
}

export default Login