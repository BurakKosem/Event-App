import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/NavbarComp"
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUserAsync } from './redux/dataSlice';
import UserProfile from "./pages/UserProfile";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import EventAddModal from "./components/EventAddModal";
import EventUpdateModal from "./components/EventUpdateModal";
import AdminPanel from "./pages/AdminPanel";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Sayfa yüklendiğinde Local Storage'dan JWT tokeni al
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      dispatch(loginUserAsync(storedToken));
    }
  }, [dispatch]);

  const { loginModal } = useSelector(state => state.modal);
  const { registerModal } = useSelector(state => state.modal);
  const { addEventModal } = useSelector(state => state.modal);

  return (
    <div className="main-theme">
      <Router>
        <Navbar/>
        {loginModal && <LoginModal />}
        {registerModal && <RegisterModal />}
        {addEventModal && <EventAddModal />} 
        {/* {updateEventModal && <EventUpdateModal />}  */}
        <Routes>
          
          <Route path="/" element={<Events/>} />
          <Route path="/event/:eventId" element={<EventDetail/>} />
          <Route path="/userprofile/" element={<UserProfile/>} />
          <Route path="/adminpanel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
