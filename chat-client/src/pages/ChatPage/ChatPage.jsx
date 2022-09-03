import { Spinner } from '@chakra-ui/react'
import React,{Suspense } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
const ChatBox=React.lazy(()=>import("../../components/chatbox/ChatBox"))
const ChatPage = () => {
      const { id } = useParams()
      return (
            <Layout>
                  <Suspense fallback={<Spinner/>}>
                        <ChatBox id={id} />
                  </Suspense>
            </Layout>
           
      )
}

export default ChatPage