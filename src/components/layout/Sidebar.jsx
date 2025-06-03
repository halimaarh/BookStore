import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  CloseOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useSidebar } from '../../context/SidebarContext';

const { Sider } = Layout;

const Sidebar = () => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();
  const navigate = useNavigate();

  const menuItems = [
    { key: '/dashboard', icon: <HomeOutlined className="text-xl" />, label: <span className="text-base">Dashboard</span> },
    { key: '/dashboard/profile', icon: <UserOutlined className="text-xl" />, label: <span className="text-base">Profile</span> },
    { key: '/dashboard/books', icon: <BookOutlined className="text-xl" />, label: <span className="text-base">Books</span> },
    { key: '/dashboard/recomendations', icon: <BookOutlined className="text-xl" />, label: <span className="text-base">Recomendations</span> },
    { key: '/dashboard/reviews', icon: <StarOutlined className="text-xl" />, label: <span className="text-base">Reviews</span> },
    { key: '/dashboard/composites', icon: <BookOutlined className="text-xl" />, label: <span className="text-base">Composites</span> },
    { key: '/logout', icon: <LogoutOutlined className="text-xl" />, label: <span className="text-base">Logout</span> },


  ];

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      navigate('/');
    } else {
      navigate(key);
    }
  };

  return (
    <Sider 
      collapsed={collapsed}
      width={230}
      collapsedWidth={0}
      trigger={null}
      className={`
        fixed left-0 top-0 h-full
        ${isMobile ? 'z-40' : 'z-20'}
        transition-all duration-300
        ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}
        !bg-gray-100
      `}
    >
      <div className="p-4 flex font-plus items-center justify-between ">
        <h1 className="text-2xl  font-semibold text-black">BookStore</h1>
        {isMobile && (
          <CloseOutlined 
            className="text-xl cursor-pointer hover:text-gray-600"
            onClick={() => setCollapsed(true)}
          />
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-0 !bg-gray-100 [&_.ant-menu-item-selected]:!bg-white [&_.ant-menu-item:hover]:!bg-white [&_.ant-menu-item]:!py-8"
      />
    </Sider>
  );
};

export default Sidebar;
