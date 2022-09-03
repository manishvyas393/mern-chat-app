import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom"
import Auth from "./pages/Auth/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userProfileAction } from "./redux/actions/user.action";
import ProctectedRoute from "./components/ProtectedRoutes";
import ChatPage from "./pages/ChatPage/ChatPage";
function App() {
  const dispatch = useDispatch()
  const userId = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  useEffect(() => {
    if (userId) {
      dispatch(userProfileAction())
    }

  }, [dispatch, userId, navigate])
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/chat" element={
        <ProctectedRoute>
          <Home />
        </ProctectedRoute>
      } />
      <Route path="/chat/:id" element={
        <ProctectedRoute>
          <ChatPage/>
        </ProctectedRoute>
      } />
    </Routes>
  );
}

export default App;
