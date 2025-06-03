import { Avatar, Card, Tabs, Button, List, Tag, Divider } from 'antd';
import { UserOutlined, BookOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';

const Profile = () => {
  const userStats = [
    { title: 'Books Read', value: '124', icon: <BookOutlined /> },
    { title: 'Reviews', value: '85', icon: <EditOutlined /> },
    { title: 'Following', value: '48', icon: <UserOutlined /> }
  ];

  const activities = [
    { action: 'Added a review', book: 'The Great Gatsby', time: '2 hours ago' },
    { action: 'Read', book: '1984', time: '1 day ago' },
    { action: 'Added to library', book: 'Dune', time: '3 days ago' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <Card className="bg-white shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar 
            size={120} 
            icon={<UserOutlined />} 
            className="bg-blue-500 border-4 border-gray-50"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">
              John Doe
            </h1>
            <p className="text-gray-600 mt-1">Book Enthusiast</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <span className="text-sm text-gray-500">
                @johndoe
              </span>
              <span className="text-sm text-gray-500">
                Joined January 2024
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-sm transition-shadow">
            <div className="text-4xl text-blue-500 mb-2">{stat.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600">{stat.title}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Personal Info',
              children: (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About Me</h3>
                    <p className="text-gray-600">
                      Passionate reader with a love for classic literature and science fiction.
                      Always looking for new books to add to my collection.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Favorite Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Science Fiction', 'Classic Literature', 'Mystery', 'Biography'].map(genre => (
                        <Tag key={genre} color="blue">{genre}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: '2',
              label: 'Recent Activity',
              children: (
                <List
                  itemLayout="horizontal"
                  className="divide-y"
                  dataSource={activities}
                  renderItem={(item) => (
                    <List.Item className="py-4 hover:bg-slate-50 transition-colors">
                      <List.Item.Meta
                        title={
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{item.action}</span>
                            <span className="text-sm text-blue-600 font-medium">
                              {item.book}
                            </span>
                          </div>
                        }
                      />
                      <div className="text-sm text-gray-400 font-medium">{item.time}</div>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '3',
              label: 'Settings',
              children: (
                <div className="space-y-4">
                  <Button type="primary" icon={<EditOutlined />} className="bg-indigo-600">
                    Edit Profile
                  </Button>
                  <Divider />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Privacy Settings</h3>
                    <p className="text-gray-600">Manage your profile visibility and notification preferences</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Profile;
