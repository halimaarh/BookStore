import { Form, Input, Button, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomPopup from './CustomPopup'


function AddRecommendation() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
   const [successPopup, setSuccessPopup] = useState({ visible: false, title: '' });


  const onFinish = async (values) => {
    try {
      await axios.post('https://recommendationservice-rlr1.onrender.com/api/v1/recommendations', {
        bookId: values.bookId,
        author: values.author,
        rate: values.rate,
        content: values.content
      });
      setSuccessPopup({ visible: true, title: 'Recommendation Added Successfully!' });
      setTimeout(() => {
        navigate('/dashboard/recomendations');
      }, 2000);
    } catch (error) {
      message.error('Failed to add recommendation');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Recommendation</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="bg-white p-8 rounded-lg shadow-sm space-y-4"
      >
        <Form.Item
          name="bookId"
          label="Book ID"
          rules={[{ required: true }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="rate"
          label="Rating"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={5} step={0.1} />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Add Recommendation
            </Button>
            <Link to="/dashboard/recomendations">
              <Button >
                Cancel
              </Button>
            </Link>
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

export default AddRecommendation;
