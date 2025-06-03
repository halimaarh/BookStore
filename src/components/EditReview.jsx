import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, InputNumber, Spin } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import CustomPopup from './CustomPopup';

import axios from 'axios';

const BASE_URL = "https://reviewservice-to9o.onrender.com/api/v1/reviews";

const EditReview = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();  // Make sure the route param is `id`!
  const [successPopup, setSuccessPopup] = useState({ visible: false, title: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        if (!id || isNaN(id)) {
          message.error("Invalid Review ID.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/${id}`);
        const { bookId, author, subject, content } = response.data;

        form.setFieldsValue({
          bookId: bookId || "",
          author: author || "",
          subject: subject || "",
          content: content || "",
        });

        message.success("Review details loaded successfully!");
        console.log("API Response:", response.data); // Debug API response
      } catch (error) {
        console.error("Error fetching review details:", error);
        if (error.response) {
          message.error(`Failed to load review: ${error.response.data.message || "Unknown error"}`);
        } else {
          message.error("Failed to load review.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        bookId: values.bookId,
        author: values.author,
        subject: values.subject,
        content: values.content,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      
      // Remove duplicate success message
      setSuccessPopup({ visible: true, title: 'Review Updated Successfully!' });
      setTimeout(() => {
        navigate('/dashboard/reviews');
      }, 3000); // Match CustomPopup timeout
    } catch (error) {
      console.error("Error updating review:", error);
      message.error("Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      {loading ? (
        <div className="flex justify-center p-8"><Spin size="large" /></div>
      ) : (
        <>
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Review</h2>
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
              rules={[{ required: true, message: "Book ID is required." }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: "Author is required." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Subject is required." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: "Content is required." }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <div className="flex gap-4">
                <Button type="primary" htmlType="submit" className="bg-blue-500">
                  Update Review
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
        </>
      )}
    </div>
  );
};

export default EditReview;
