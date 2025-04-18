import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EventList from "./pages/Events.jsx";
import AdminPanel from "./pages/AdminPanel";  

import Navbar from "./components/Navbar.jsx";
import RegisterEvent from "../src/pages/Register.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/registeruser.jsx";
import SubmitFeedback from "./pages/feedback.jsx";
import ManageVisitors from "./components/ManageVisitors";
import GenerateReports from "./components/GenerateReports";
import EditEvent from "./components/EditEvent";
import DeleteEvent from "./components/DeleteEvent";
import ManageOrganizers from "./components/ManageOrganizers";
import ManageVenues from "./components/ManageVenues";
import MonitorAnalytics from "./components/MonitorAnalytics.jsx";
import GalleryPage from "./components/Gallery/gallery.jsx";
import AboutUs from "./components/About/Aboutus.jsx";
import ContactUs from "../src/pages/Contactus.jsx"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/register-event" element={<><Navbar /><RegisterEvent /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /></>} />

        <Route path="/events" element={<><Navbar /><EventList /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/regUser" element={<><Navbar /><Register /></>} />
        <Route path="/feedback" element={<><Navbar /><SubmitFeedback /></>} />
<Route path="/gallery" element={<><Navbar/><GalleryPage/></>}/>
<Route path="/contact-us" element={<><Navbar/><ContactUs/></>}/>

        <Route path="admin/*" element={<AdminPanel />}> 
          <Route path="manage-visitors" element={<ManageVisitors />} />
          <Route path="generate-reports" element={<GenerateReports />} />
          <Route path="edit-event" element={<EditEvent />} />
          <Route path="delete-event" element={<DeleteEvent />} />
          <Route path="manage-organizers" element={<ManageOrganizers />} />
          <Route path="manage-venues" element={<ManageVenues />} />
          <Route path="analytics" element={<MonitorAnalytics />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;