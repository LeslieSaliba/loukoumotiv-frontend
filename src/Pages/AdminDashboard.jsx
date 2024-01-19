import { Route, Routes } from 'react-router-dom';
import '../CSS/bootstrap.min.css';
import AdminHeader from '../Frequents/DashHeader';
import NavAdminDash from '../AdminComponents/NavAdminDash'
import AllMissionsAdminDash from '../AdminComponents/AllMissionsAdminDash';
import MyMissionsAdminDash from '../AdminComponents/MyMissionsAdminDash';
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
                    <Route path="toutes-les-missions" element={<AllMissionsAdminDash />} />
                    <Route path="mes-missions" element={<MyMissionsAdminDash />} />
                    <Route path="toutes-les-missions" element={<AllMissionsAdminDash />} /><Route path="partenaires" element={<PartnersDash />} />
                    <Route path="équipe" element={<TeamDash />} />
                    <Route path="répertoire" element={<DirectoryDash />} />
                    <Route path="newsletter" element={<NewsletterDash />} />
                </Routes>
            </div>
        </div >
    );
}

export default AdminDashboard;