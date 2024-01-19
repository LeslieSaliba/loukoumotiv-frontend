import { Route, Routes } from 'react-router-dom';
import '../CSS/bootstrap.min.css';
import DashHeader from '../Frequents/DashHeader';
import NavMasseurDash from '../MasseurComponents/NavMasseurDash'
import AllMissionsMasseurDash from '../MasseurComponents/AllMissionsMasseurDash';
import MyMissionsMasseurDash from '../MasseurComponents/MyMissionsMasseurDash';

function MasseurDashboard() {

    return (
        <div>
            <DashHeader />
            <div className='container'>
                <NavMasseurDash />
                <Routes>
                    <Route path="toutes-les-missions" element={<AllMissionsMasseurDash />} />
                    <Route path="mes-missions" element={<MyMissionsMasseurDash />} />
                </Routes>
            </div>
        </div >
    );
}

export default MasseurDashboard;