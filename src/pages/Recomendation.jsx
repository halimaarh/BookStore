// import { useState, useEffect } from 'react';
// import { Table, Space, Button, message, Popconfirm, Input } from 'antd';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Recomendation() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchRecommendations = async (searchId = '') => {
//     setLoading(true);
//     try {
//       const url = searchId
//         ? `https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/find/${searchId}`
//         : 'https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/';
      
//       const res = await axios.get(url);
//       setRecommendations(Array.isArray(res.data) ? res.data : [res.data]);
//     } catch (error) {
//       message.error('Failed to load recommendations');
//       setRecommendations([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendations();
//   }, []);

//   const handleSearch = (value) => {
//     fetchRecommendations(value);
//   };

//   const handleDelete = async (recommendationId) => {
//     try {
//       await axios.delete(`https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/${recommendationId}`);
//       message.success('Recommendation deleted');
//       fetchRecommendations();
//     } catch (error) {
//       message.error('Failed to delete recommendation');
//     }
//   };

//   const columns = [
//     { title: 'Recommendation Id', dataIndex: 'recommendationId', key: 'recommendationId' },
//     { title: 'Book ID', dataIndex: 'bookId', key: 'bookId' },
//     { title: 'Author', dataIndex: 'author', key: 'author' },
//     { title: 'Rate', dataIndex: 'rate', key: 'rate' },
//     { title: 'Content', dataIndex: 'content', key: 'content', ellipsis: true },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Link to={`/dashboard/edit-recommendation/${record.bookId}`}>
//             <Button type="primary" ghost>Edit</Button>
//           </Link>
//           <Popconfirm
//             title="Are you sure to delete this recommendation?"
//             onConfirm={() => handleDelete(record.recommendationId)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-semibold text-gray-800">Recommendations</h2>
//         <Link to="/dashboard/add-recommendation">
//           <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
//             Add Recommendation
//           </Button>
//         </Link>
//       </div>

//       <Input.Search
//         placeholder="Search by Book ID..."
//         allowClear
//         enterButton
//         onSearch={handleSearch}
//         style={{ maxWidth: 400, marginBottom: 16 }}
//         loading={loading}
//       />
      
//       <Table 
//         columns={columns} 
//         dataSource={recommendations}
//         rowKey="recommendationId"
//         loading={loading}
//         className="shadow-sm rounded-lg overflow-hidden"
//         scroll={{ x: true }}
//       />
//     </div>
//   );
// }

// export default Recomendation;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Button, Typography, message, Spin,Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Title } = Typography;
const BASE_URL = "https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/";

const Recomendation = ({ sidebarWidth }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL); // Fetch recommendations from the API
      setRecommendations(response.data); // Update state with fetched recommendations
      message.success("Recommendations fetched successfully!");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      message.error("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const deleteRecommendation = async (recommendationId) => {
  //   console.log("Deleting Recommendation ID:", recommendationId); // Debug the ID
  //   try {
  //     await axios.delete(`${BASE_URL}/${recommendationId}`); // Delete recommendation by ID
  //     message.success(`Recommendation with ID ${recommendationId} deleted successfully!`);
  //     fetchRecommendations(); // Refresh the list
  //   } catch (error) {
  //     console.error("Error deleting recommendation:", error);
  //     message.error("Failed to delete recommendation. Please try again.");
  //   }
  // };

    const handleDelete = async (recommendationId) => {
    try {
      await axios.delete(`https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/${recommendationId}`);
      message.success('Recommendation deleted');
      fetchRecommendations();
    } catch (error) {
      message.error('Failed to delete recommendation');
    }
  };

  useEffect(() => {
    fetchRecommendations(); // Fetch recommendations on component mount
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
          Recommendations
        </Title>
        <Link to="/dashboard/add-recommendation">
           <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
             Add Recommendation
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
          dataSource={recommendations}
          renderItem={(item) => (
            <List.Item
              actions={[
                
               <Link to={`/dashboard/edit-recommendation/${item.recommendationId}`}>
                  <Button type="primary" ghost>Edit</Button>
               </Link>,

                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(item.recommendationId)} // Delete recommendation
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`ID: ${item.recommendationId}| BookID: ${item.bookId}  | Author: ${item.author} | Rating: ${item.rate}`}
                description={item.content}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Recomendation;