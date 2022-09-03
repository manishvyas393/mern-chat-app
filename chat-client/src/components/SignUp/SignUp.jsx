import React, { useState } from 'react'
import InPut from '../InPut/InPut'
import { Box, Button, Flex, FormControl, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import {userSignUpAction } from '../../redux/actions/user.action'
const SignUp = () => {
      const [email, setEmail] = useState("")
      const [name, setName] = useState("")
      const [password, setPassword] = useState("")
      const toast = useToast()
      const dispatch=useDispatch()
      const handleSubmit = (e) => {
            e.preventDefault()
            if (!name || !email || !password) {
                  return toast({
                        title: "Please fill all feilds",
                        status: "warning",
                        duration: 5000,
                        position:"top",
                        isClosable: true
                  })
            }
            dispatch(userSignUpAction(email,name,password))   
      }
      return (
            <Box px={8}>
                  <FormControl >
                        <Box mb={2}>
                              <InPut type={"email"} name="email" placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box mb={2}>
                              <InPut type={"text"} value={name} name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Box mb={2}>
                              <InPut type={"password"} value={password} name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Flex justifyContent={"center"} alignItems={"center"} mt={8}>
                              <Button textAlign={"center"} backgroundColor="purple.500" color={"white"} onClick={(e)=>handleSubmit(e)}>Sign up</Button>
                        </Flex>
                  </FormControl>
            </Box>
      )
}

export default SignUp