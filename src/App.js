import { Routes, Route } from 'react-router-dom';
import { getUserRole } from './userInfo/getTeamData';
import './CSS/General.css';
import Homepage from './Pages/Homepage';
import Concept from './Pages/Concept';
import Equipe from './Pages/Equipe';
import Mission from './Pages/Mission';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import MasseurDashboard from './Pages/MasseurDashboard';
import Oops from './Pages/Oops';

function App() {
  const role = getUserRole();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/concept" element={<Concept />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/se-connecter" element={<Login />} />
      <Route path="/admin/*" element={role === "admin" ? <AdminDashboard /> : <Homepage />} />
      <Route path="/masseur/*" element={role === "masseur" ? <MasseurDashboard /> : <Homepage />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/masseur/*" element={<MasseurDashboard />} />
      <Route path="/*" element={<Oops />} />
    </Routes>
  );
}

export default App;