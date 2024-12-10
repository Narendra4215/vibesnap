import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Feeds from "./components/Feeds";
import './App.css';
import './Styles.scss';
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
