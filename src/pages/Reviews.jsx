import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Typography, message, Spin, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import CustomPopup from "../components/CustomPopup";

const { Title } = Typography;
const BASE_URL = "https://reviewservice-to9o.onrender.com/api/v1/reviews/";

const Reviews = ({ sidebarWidth }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState({
    visible: false,
    title: "",
  });

  const navigate = useNavigate();

  const fetchReviews = async (searchId = "") => {
    setLoading(true);
    try {
      const url = searchId ? `${BASE_URL}${searchId}` : BASE_URL;
      const response = await axios.get(url);
      setReviews(
        Array.isArray(response.data) ? response.data : [response.data]
      );
      message.success("Reviews fetched successfully!");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      message.error("Failed to fetch reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    fetchReviews(value);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${BASE_URL}${reviewId}`);
      message.success("Review deleted successfully");
      setSuccessPopup({ visible: true, title: "Review Deleted Successfully!" });
      fetchReviews(); // refresh list
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Failed to delete review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const columns = [
    {
      title: "Review ID",
      dataIndex: "reviewId",
      key: "reviewId",
    },
    {
      title: "Book ID",
      dataIndex: "bookId",
      key: "bookId",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/dashboard/edit-review/${record.reviewId}`}>
            <Button type="primary" ghost style={{ marginRight: 8 }}>
              Edit
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.reviewId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        marginLeft: sidebarWidth,
        transition: "margin-left 0.3s ease",
        padding: "40px 20px",
        fontFamily: "font-plus",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Reviews
        </Title>
        <Link to="/dashboard/add-review">
          <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
            Add Review
          </Button>
        </Link>
        <Input.Search
          placeholder="Search by Review ID..."
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ maxWidth: 400, marginBottom: 16 }}
          loading={loading}
        />
      </div>

      {loading ? (
        <Spin style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={reviews}
          rowKey="reviewId"
          bordered
        />
      )}

      <CustomPopup
        visible={successPopup.visible}
        title={successPopup.title}
        onClose={() => setSuccessPopup({ visible: false, title: "" })}
      />
    </div>
  );
};

export default Reviews;
