// import { Form, Input, Button, message, InputNumber } from 'antd';
// import { useNavigate, useParams } from 'react-router-dom';
// import React, { useEffect,useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function EditReview() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const { reviewId} = useParams();

//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const res = await axios.get(`https://reviewservice-to9o.onrender.com/api/v1/reviews/${bookId}`, values);
//         form.setFieldsValue(res.data);
//       } catch (error) {
//         message.error('Failed to fetch review');
//       }
//     };
//     fetchReview();
//   }, [reviewId, form]);

//   const onFinish = async (values) => {
//     try {
//       await axios.put(`https://reviewservice-to9o.onrender.com/api/v1/reviews/${reviewId}`, {
//         // id: values.id,
//         // reviews:values.id,
//         bookId: values.bookId,
//         author: values.author,
//         subject: values.subject,
//         content: values.content
//       });
//       message.success('Review updated successfully');
//       navigate('/dashboard/reviews');
//     } catch (error) {
//       message.error('Failed to update review');
//     }
// //   };
// const BASE_URL = "https://reviewservice-to9o.onrender.com/api/v1/reviews";

// const EditReview = () => {
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm(); // Ant Design form instance
//   const { id } = useParams(); // Get recommendationId from URL params
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       try {
//         console.log("Recommendation ID:", id); // Debug the ID
//         if (!id || isNaN(id)) {
//           message.error("Invalid Recommendation ID.");
//           setLoading(false);
//           return;
//         }
  
//         const response = await axios.get(`${BASE_URL}/${id}`); // Fetch recommendation details
//         console.log("API Response:", response.data); // Debug API response
//         const {bookId, author, subject, content } = response.data;
//         form.setFieldsValue({
//           // recommendationId: recommendationId,
//           bookId: bookId || "",
//           author: author || "",
//           subject: subject || "",
//           content: content || "",
//         }); // Pre-fill form
//         message.success("Review details loaded successfully!");
//       } catch (error) {
//         console.error("Error fetching recommendation details:", error);
//         if (error.response) {
//           console.error("Server Response:", error.response.data);
//           message.error(`Failed to load recommendation details: ${error.response.data.message || "Unknown error"}`);
//         } else {
//           message.error("Failed to load recommendation details.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchReviews();
//   }, [id, form]);
//   const onFinish = async (values) => {
//     const {  bookId, author, subject, content } = values;
//     setLoading(true);
//     try {
//       const response = await axios.put(`${BASE_URL}/${id}`, {
//         bookId,
//         author,
//         subject,
//         content,
//       }, {
//         headers: { "Content-Type": "application/json" },
//       });
//       message.success("Reviews updated successfully!");
//       console.log("Updated Reviews:", response.data);
//       navigate('/dashboard/reviews');
//     } catch (error) {
//       console.error("Error updating reviews:", error);
//       message.error("Failed to update reviews.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-3xl mx-auto space-y-6 p-6">
//          {loading ? (
//               <div className="flex justify-center p-8"><Spin size="large" /></div>
//             ) : (
//               <>
      
//       <div className="flex items-center justify-between pb-4 border-b">
//         <h2 className="text-2xl font-semibold text-gray-800">Edit Review</h2>
//       </div>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         className="bg-white p-8 rounded-lg shadow-sm space-y-4"
//       >
//         <Form.Item
//           name="bookId"
//           label="Book ID"
//           rules={[{ required: true }]}
//         >
//           <InputNumber className="w-full" />
//         </Form.Item>

//         <Form.Item
//           name="author"
//           label="Author"
//           rules={[{ required: true }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="subject"
//           label="Subject"
//           rules={[{ required: true }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="content"
//           label="Content"
//           rules={[{ required: true }]}
//         >
//           <Input.TextArea rows={4} />
//         </Form.Item>

//         <Form.Item className="mb-0">
//           <div className="flex gap-4">
//             <Button type="primary" htmlType="submit" className="bg-blue-500">
//               Update Review
//             </Button>
//             <Link to="/dashboard/reviews">
//               <Button>Cancel</Button>
//             </Link>
//           </div>
//         </Form.Item>
//       </Form>
//           </>
//       )}
//     </div>
//   );
// }

// export default EditReview;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, InputNumber, Spin } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "https://reviewservice-to9o.onrender.com/api/v1/reviews";

const EditReview = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();  // Make sure the route param is `id`!
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
      await axios.put(`${BASE_URL}/${id}`, {
        bookId: values.bookId,
        author: values.author,
        subject: values.subject,
        content: values.content,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      message.success("Review updated successfully!");
      console.log("Updated Reviews:", response.data);
      navigate('/dashboard/reviews');
    } catch (error) {
      console.error("Error updating review:", error);
      if (error.response) {
        message.error(`Failed to update review: ${error.response.data.message || "Unknown error"}`);
      } else {
        message.error("Failed to update review.");
      }
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
        </>
      )}
    </div>
  );
};

export default EditReview;
