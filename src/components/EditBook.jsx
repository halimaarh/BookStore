import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EditBook() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      console.log("Fetching book with ID:", id);
      try {
        
        const res = await axios.get(`https://bookservice-a2qm.onrender.com/api/v1/books/${id}`);
        form.setFieldsValue(res.data);
      } catch (error) {
        message.error('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await axios.put(`https://bookservice-a2qm.onrender.com/api/v1/books/${id}`, values);
      message.success('Book updated successfully');
      navigate('/dashboard/books');
    } catch (error) {
      message.error('Failed to update book');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Book</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="bg-white p-8 rounded-lg shadow-sm space-y-4"
      >
        <Form.Item
          name="name"
          label={<span className="text-gray-700 font-medium">Book Name</span>}
          rules={[{ required: true, message: 'Please enter book name' }]}
        >
          <Input className="h-10 text-gray-800" />
        </Form.Item>

        <Form.Item
          name="weight"
          label={<span className="text-gray-700 font-medium">Weight</span>}
          rules={[{ required: true, message: 'Please enter book weight' }]}
        >
          <Input className="h-10 text-gray-800" />
        </Form.Item>

        <Form.Item className="mb-0 pt-4">
          <div className="flex gap-4">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="bg-blue-500 hover:bg-blue-600 h-10 px-6 font-medium"
            >
              Update Book
            </Button>
            <Link to="/dashboard/books">
                <Button
                
                  className="h-10 px-6"
                >
           
              Cancel
            </Button>
             </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditBook;
