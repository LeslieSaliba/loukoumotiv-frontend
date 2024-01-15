import { Route, Routes } from 'react-router-dom';
import '../CSS/bootstrap.min.css';
import AdminHeader from '../Frequents/DashHeader';
import NavAdminDash from '../AdminComponents/NavAdminDash'
import MissionsDash from '../AdminComponents/MissionsDash';
import PartnersDash from '../AdminComponents/PartnersDash';
import TeamDash from '../AdminComponents/TeamDash';
import DirectoryDash from '../AdminComponents/DirectoryDash';
import NewsletterDash from '../AdminComponents/NewsletterDash';

function AdminDashboard() {

    return (
        <div>
            <AdminHeader />
            <div className='container'>
                <NavAdminDash />
                <Routes>
                    <Route path="missions" element={<MissionsDash />} />
                    <Route path="partenaires" element={<PartnersDash />} />
                    <Route path="équipe" element={<TeamDash />} />
                    <Route path="répertoire" element={<DirectoryDash />} />
                    <Route path="newsletter" element={<NewsletterDash />} />
                </Routes>
            </div>
        </div >
    );
}

export default AdminDashboard;