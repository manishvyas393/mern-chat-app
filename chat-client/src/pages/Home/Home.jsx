import React, { useEffect } from 'react'
import { Flex,Text } from '@chakra-ui/react'
import { useDispatch} from 'react-redux'
import { allChatsAction } from '../../redux/actions/chat.action'
import Layout from '../../components/layout/Layout'
const Dummy = () => {
      return (
            <Flex justifyContent={"space-between"} width={{ base: "full", lg: "50%" }} mt="32" direction={{ sm: "column", lg: "row", md: "column" }}>
                  <Flex justifyContent={"center"} alignItems="center" flexDirection={"column"}>
                        <Flex justifyContent={"center"} alignItems="center" flexDirection={"column"} >
                              <Text fontSize={"large"} fontWeight="bold">No Chat Selected</Text>
                              <Text display={{ base: "block", lg: "none" }} fontStyle="xl" fontWeight={"extrabold"}>Click on Recent Chat Button</Text>
                        </Flex>
                  </Flex>

            </Flex>
      )
}
const Home = () => {
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(allChatsAction())
      }, [dispatch])
      return (
            <Layout>
                  <Dummy/>
            </Layout>
      )
}

export default Home