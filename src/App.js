import { Routes, Route } from 'react-router-dom';
import './CSS/General.css';
import Homepage from './Pages/Homepage';
import Concept from './Pages/Concept';
import Equipe from './Pages/Equipe';
import Mission from './Pages/Mission';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Test from './Dashboards/Test'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/concept" element={<Concept />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/se-connecter" element={<Login />} />
    </Routes>
  );
}

export default App;