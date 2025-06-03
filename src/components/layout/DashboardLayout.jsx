import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../../context/SidebarContext';

const { Content } = Layout;

const DashboardLayout = () => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout className={`transition-all duration-300 ${!isMobile && 'ml-[px]'}`}>
        <Header />
        <Layout className=" bg-gray-100 h-screen">
          <Content className="bg-gray-100 p-4 md:p-6 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </Layout>
  );
};

export default DashboardLayout;
