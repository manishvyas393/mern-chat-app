import React, { useEffect } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Flex} from '@chakra-ui/react'
import { useDispatch} from 'react-redux'
import { allChatsAction } from '../../redux/actions/chat.action'
const Layout = ({ children }) => {
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(allChatsAction())
      }, [dispatch])
      return (
            <Flex justifyContent={"space-between"} width={{ base: "full", lg: "100%" }} direction={{ sm: "column", lg: "row", md: "column" }}>
                  <SideBar />
                  {children}
            </Flex>
      )
}

export default Layout