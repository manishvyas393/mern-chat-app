import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex } from '@chakra-ui/react'
import SignUp from '../../components/SignUp/SignUp'
import Login from '../../components/Login/Login'
const Auth = () => {
      return (
            <Box h='100vh' bgGradient='linear(to-l, #7928CA, #FF0080)'>
                  <Flex margin={"auto"}  width="max-content" >
                        <Flex justifyContent="center" backgroundColor="white" mt={48} rounded={"2xl"} alignItems={"center"} shadow={"dark-lg"}>
                              <Tabs isFitted variant='enclosed'>
                                    <TabList mb='1em'>
                                          <Tab color={"purple.500"} fontSize="2xl">Sign up</Tab>
                                          <Tab color={"purple.500"} fontSize="2xl">Login</Tab>
                                    </TabList>
                                    <TabPanels>
                                          <TabPanel>
                                                <SignUp />
                                          </TabPanel>
                                          <TabPanel>
                                                <Login />
                                          </TabPanel>
                                    </TabPanels>
                              </Tabs>
                        </Flex>

                  </Flex>

            </Box>

      )
}

export default Auth