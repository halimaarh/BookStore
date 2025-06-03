// import React, { useEffect, useState } from 'react';
// import { Table, Button, message, Popconfirm, Space, Spin, Input } from 'antd';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchReviews = async (searchId = '') => {
//     setLoading(true);
//     try {
//       const url = searchId
//         ? `https://reviewservice-to9o.onrender.com/api/v1/reviews/${searchId}`
//         : 'https://reviewservice-to9o.onrender.com/api/v1/reviews/';
      
//       const response = await axios.get(url);
//       setReviews(Array.isArray(response.data) ? response.data : [response.data]);
//     } catch (err) {
//       console.error('Error:', err);
//       message.error('Failed to fetch reviews');
//       setReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleSearch = (value) => {
//     fetchReviews(value);
//   };

//   const handleDelete = async (reviewId) => {
//     try {
//       await axios.delete(`https://reviewservice-to9o.onrender.com/api/v1/reviews/${reviewId}`);
//       message.success('Review deleted successfully');
//       const response = await axios.get('https://reviewservice-to9o.onrender.com/api/v1/reviews/');
//       setReviews(response.data || []);
//     } catch (error) {
//       console.error('Delete Error:', error); // Debug log
//       message.error('Failed to delete review');
//     }
//   };

//   const columns = [
//       { 
//       title: 'Reviews Id', 
//       dataIndex: 'reviewid', 
//       key: 'reviewId' 
//     },
//     { 
//       title: 'Book ID', 
//       dataIndex: 'bookId',
//       key: 'bookId',
//       responsive: ['md']
//     },
//     { 
//       title: 'Author', 
//       dataIndex: 'author', 
//       key: 'author' 
//     },
//     { 
//       title: 'Subject', 
//       dataIndex: 'subject', 
//       key: 'subject',
//       responsive: ['sm']
//     },
//     { 
//       title: 'Content', 
//       dataIndex: 'content', 
//       key: 'content', 
//       ellipsis: true,
//       responsive: ['sm']
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space wrap size="small">
//           <Link to={`/dashboard/edit-review/${record.reviewId}`}>
//             <Button size="small" type="primary" ghost>Edit</Button>
//           </Link>
//           <Popconfirm
//             title="Delete this review?"
//             onConfirm={() => handleDelete(record.reviewId)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button size="small" danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   if (loading) {
//     return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
//   }

//   return (
//     <div className="space-y-4 md:space-y-6 p-4 md:p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Reviews</h2>
//         <Link to="/dashboard/add-review">
//           <Button type="primary" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
//             Add Review
//           </Button>
//         </Link>
//       </div>

//       <Input.Search
//         placeholder="Search by Review ID..."
//         allowClear
//         enterButton
//         onSearch={handleSearch}
//         style={{ maxWidth: 400, marginBottom: 16 }}
//         loading={loading}
//       />
      
//       <Table 
//         columns={columns} 
//         dataSource={reviews}
//         rowKey="id"
//         loading={loading}
//         className="shadow-sm rounded-lg overflow-hidden"
//         scroll={{ x: true }}
//         size="middle"
//         pagination={{
//           defaultPageSize: 10,
//           responsive: true,
//           showSizeChanger: true,
//           showTotal: (total) => `Total ${total} items`
//         }}
//       />
//     </div>
//   );
// }

// export default Reviews;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Button, Typography, message, Spin,Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Title } = Typography;
const BASE_URL = "https://reviewservice-to9o.onrender.com/api/v1/reviews/";

const Reviews = ({ sidebarWidth }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL); // Fetch reviews from the API
      setReviews(response.data); // Update state with fetched reviews
      message.success("reviews fetched successfully!");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      message.error("Failed to fetch reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const deletereview = async (reviewId) => {
  //   console.log("Deleting review ID:", reviewId); // Debug the ID
  //   try {
  //     await axios.delete(`${BASE_URL}/${reviewId}`); // Delete review by ID
  //     message.success(`review with ID ${reviewId} deleted successfully!`);
  //     fetchreviews(); // Refresh the list
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //     message.error("Failed to delete review. Please try again.");
  //   }
  // };

    const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`https://reviewservice-to9o.onrender.com/api/v1/reviews/${reviewId}`);
      message.success('Review deleted successfully');
      const response = await axios.get('https://reviewservice-to9o.onrender.com/api/v1/reviews/');
      setReviews(response.data || []);
    } catch (error) {
      console.error('Delete Error:', error); // Debug log
      message.error('Failed to delete review');
    }
  };


  useEffect(() => {
    fetchReviews(); // Fetch reviews on component mount
  }, []);

  return (
    <div
      style={{
        marginLeft: sidebarWidth, // Adjust content based on sidebar width
        transition: "margin-left 0.3s ease", // Smooth transition when sidebar collapses
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", // Allow wrapping for smaller screens
          gap: "10px",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          reviews
        </Title>
        <Link to="/dashboard/add-review">
           <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
             Add review
           </Button>
         </Link>
         <Input.Search
        placeholder="Search by Book ID..."
        allowClear
        enterButton
        //  onSearch={handleSearch}
         style={{ maxWidth: 400, marginBottom: 16 }}
         loading={loading}
      />
      </div>
      {loading ? (
        <Spin style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <List
          bordered
          dataSource={reviews}
          renderItem={(item) => (
            <List.Item
              actions={[
                
               <Link to={`/dashboard/edit-review/${item.reviewId}`}>
                  <Button type="primary" ghost>Edit</Button>
               </Link>,

                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(item.reviewId)} // Delete review
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`ID: ${item.reviewId} |BookID: ${item.bookId} | Author: ${item.author} | Subject: ${item.subject}`}
                description={item.content}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Reviews;