import { Layout, Input, Badge } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useSidebar } from "../../context/SidebarContext";

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();

  return (
    <AntHeader className="!bg-gray-100 !px-4 !md:px-8 flex items-center justify-between h-16 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h2 className="text-lg !my-4 md:text-xl font-extrabold text-black">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Search
          placeholder="Search..."
          className="w-32 md:w-64"
          allowClear
        />
        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-gray-600">
            <UserOutlined className="text-xl" />
            <span className="text-sm font-medium">Sign out</span>
          </div>
        <div className="flex items-center gap-8">
          <SettingOutlined className="text-xl cursor-pointer hover:text-gray-600" />
          <Badge count={5} size="small" color="red">
            <BellOutlined className="text-xl cursor-pointer hover:text-gray-600" />
          </Badge>
             {isMobile && (
          <MenuOutlined
            className="text-xl cursor-pointer hover:text-gray-600"
            onClick={() => setCollapsed(false)}
          />
        )}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
