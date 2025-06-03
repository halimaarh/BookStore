import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import CustomPopup from './CustomPopup';

function AddBooks() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [successPopup, setSuccessPopup] = useState({ visible: false, title: '' });

  const onFinish = async (values) => {
    try {
      await axios.post('https://bookservice-a2qm.onrender.com/api/v1/books', {
        name: values.name,
        weight: values.weight
      });
      setSuccessPopup({ visible: true, title: 'Book Added Successfully!' });
      // message.success('Book added successfully');
      setTimeout(() => {
        navigate('/dashboard/books');
      }, 2000);
    } catch (error) {
      message.error('Failed to add book');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-8">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Book</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="bg-white p-6 rounded-lg shadow-sm space-y-4"
      >
        <Form.Item
          name="name"
          label={<span className="text-gray-700 font-medium">Book Name</span>}
          rules={[{ required: true, message: 'Please enter book name' }]}
        >
          <Input 
            placeholder="Enter book name" 
            className="h-10 text-gray-800"
          />
        </Form.Item>

        <Form.Item
          name="weight"
          label={<span className="text-gray-700 font-medium">Weight</span>}
          rules={[{ required: true, message: 'Please enter book weight' }]}
        >
          <Input 
            placeholder="Enter weight (e.g., 0.45kg)" 
            className="h-10 text-gray-800"
          />
        </Form.Item>

        <Form.Item className="mb-0 pt-4">
          <div className="flex gap-4">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="bg-blue-500 hover:bg-blue-600 h-10 px-6 font-medium"
            >
              Add Book
            </Button>
            <Button 
              onClick={() => navigate('/dashboard/books')} // Fix navigation
              className="h-10 px-6"
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>

      <CustomPopup 
        visible={successPopup.visible}
        title={successPopup.title}
        onClose={() => setSuccessPopup({ visible: false, title: '' })}
      />
    </div>
  );
}

export default AddBooks;
