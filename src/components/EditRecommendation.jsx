import { Form, Input, Button, message, InputNumber, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomPopup from './CustomPopup';


// function EditRecommendation() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const { bookId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [recommendationId, setRecommendationId] = useState(null);

//   useEffect(() => {
//     const fetchRecommendation = async () => {
//       if (!bookId) return;
//       setLoading(true);
//       try {
//         const res = await axios.get(`https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/find/${bookId}`);
//          const { bookId, author, rate, content } = response.data;
//         if (res.data) {   
//           form.setFieldsValue({
//           // recommendationId: id,
//           bookId: bookId || "",
//           author: author || "",
//           rate: rate || 0,
//           content: content || "",
//         }); // Pre-fill form
//           setRecommendationId(res.data.recommendationId);
//         }
//       } catch (error) {
//         console.error('Error fetching recommendation:', error);
//         message.error('Failed to fetch recommendation');
//         navigate('/dashboard/recommendations');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendation();
//   }, [bookId, form, navigate]);

//   const onFinish = async (values) => {
//       const { recommendationId, bookId, author, rate, content } = values;
//     if (!recommendationId) {
//       message.error('Recommendation ID is missing');
//       return;
//     }
//     try {
//       await axios.put(`https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/${recommendationId}`, {
//         bookId: values.bookId,
//         author: values.author,
//         rate: values.rate,
//         content: values.content,
//       });
//       message.success('Recommendation updated successfully');
//       navigate('/dashboard/recommendations');
//     } catch (error) {
//       console.error('Error updating recommendation:', error);
//       message.error('Failed to update recommendation');
//     }
//   };

const BASE_URL = "https://recommendationservice-rlr1.onrender.com/api/v1/recommendations";

const EditRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance
  const { id } = useParams(); // Get recommendationId from URL params
  const [successPopup, setSuccessPopup] = useState({ visible: false, title: '' });
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        console.log("Recommendation ID:", id); // Debug the ID
        if (!id || isNaN(id)) {
          message.error("Invalid Recommendation ID.");
          setLoading(false);
          return;
        }
  
        const response = await axios.get(`${BASE_URL}/${id}`); // Fetch recommendation details
        console.log("API Response:", response.data); // Debug API response
        const {bookId, author, rate, content } = response.data;
        form.setFieldsValue({
          // recommendationId: recommendationId,
          bookId: bookId || "",
          author: author || "",
          rate: rate || 0,
          content: content || "",
        }); // Pre-fill form
        message.success("Recommendation details loaded successfully!");
      } catch (error) {
        console.error("Error fetching recommendation details:", error);
        if (error.response) {
          console.error("Server Response:", error.response.data);
          message.error(`Failed to load recommendation details: ${error.response.data.message || "Unknown error"}`);
        } else {
          message.error("Failed to load recommendation details.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendation();
  }, [id, form]);
  const onFinish = async (values) => {
    const {  bookId, author, rate, content } = values;
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        bookId,
        author,
        rate,
        content,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      message.success("Recommendation updated successfully!");
      console.log("Updated Recommendation:", response.data);
      setSuccessPopup({ visible: true, title: 'Recommendation Updated Successfully!' });
      setTimeout(() => {
        navigate('/dashboard/recomendations');
      }, 2000);
      // navigate('/dashboard/recomendations');
    } catch (error) {
      console.error("Error updating recommendation:", error);
      message.error("Failed to update recommendation.");
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
            <h2 className="text-2xl font-semibold text-gray-800">Edit Recommendation</h2>
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
              label="Rate"
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
                  Update Recommendation
                </Button>
                <Link to="/dashboard/recomendations">
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
}

export default EditRecommendation;
