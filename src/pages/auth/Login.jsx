// App.jsx
import { Button, Form, Input, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function Login() {
  const onFinish = (values) => {
    console.log('Login Info:', values);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card bordered={false} className="w-full max-w-md shadow-lg rounded-lg">
        <Title level={3} className="text-center text-blue-700 mb-6">Login</Title>
        <Form layout="vertical" onFinish={onFinish} className="w-full">
          <Form.Item
            label={<span className="text-gray-700">Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              placeholder="Enter username"
              className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Enter password"
              className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/dashboard">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="h-10 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Log In
                </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
