import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardWrapper';
import { Sidebar } from '../components';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';

const DashboardLayout = () => {
  return (
      <Wrapper>
        <div className="dashboard">
          <Sidebar />
            <Suspense fallback={<Loading minsize="35px"/> }>
              <div className="dashboard-page">
                  <ToastContainer />
                  <Outlet />
              </div>
            </Suspense>
        </div>
      </Wrapper>
  );
};
export default DashboardLayout;
