import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Planner from "./pages/Planner/Planner";
import Dashboard from "./pages/Dashboard/Dashboard";
import Itinerary from "./pages/Itinerary/Itinerary";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/itinerary" element={<Itinerary />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;