import { Route, Routes } from 'react-router-dom';
import '../CSS/bootstrap.min.css';
import DashHeader from '../Frequents/DashHeader';
import NavMasseurDash from '../MasseurComponents/NavMasseurDash'
import AllMissionsDash from '../MasseurComponents/AllMissionsDash';
import MyMissionsDash from '../MasseurComponents/MyMissionsDash';

function MasseurDashboard() {

    return (
        <div>
            <DashHeader />
            <div className='container'>
                <NavMasseurDash />
                <Routes>
                    <Route path="toutes-les-missions" element={<AllMissionsDash />} />
                    <Route path="mes-missions" element={<MyMissionsDash />} />
                </Routes>
            </div>
        </div >
    );
}

export default MasseurDashboard;