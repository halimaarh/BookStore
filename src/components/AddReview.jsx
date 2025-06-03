import { Form, Input, Button, message, InputNumber } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import CustomPopup from './CustomPopup';


export default function AddReview() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
    const [successPopup, setSuccessPopup] = useState({ visible: false, title: '' });


  const onFinish = async (values) => {
    try {
      await axios.post('https://reviewservice-to9o.onrender.com/api/v1/reviews', {
        reviewId:values.reviewId,
        bookId: values.bookId,
        author: values.author,
        subject: values.subject,
        content: values.content
      });
      message.success('Review added successfully');
      setSuccessPopup({ visible: true, title: 'Review Added Successfully!' });
      setTimeout(() => {
        navigate('/dashboard/reviews');
      }, 2000);
      // navigate('/dashboard/reviews');
    } catch (error) {
      message.error('Failed to add review');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Review</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="bg-white p-8 rounded-lg shadow-sm"
      >
        <Form.Item name="bookId" label="Book ID" rules={[{ required: true }]}>
          <InputNumber className="w-full" />
        </Form.Item>
        
        <Form.Item name="reviewId" label="Review ID" rules={[{ required: true }]}>
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit Review
            </Button>
            <Link to="/dashboard/reviews">
              <Button>Cancel</Button>
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
