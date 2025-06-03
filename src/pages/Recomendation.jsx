import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Typography, message, Spin, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import CustomPopup from "../components/CustomPopup";

const { Title } = Typography;
const { Search } = Input;

const BASE_URL =
  "https://recommendationservice-rlr1.onrender.com/api/v1/recommendations/";

const Recomendation = ({ sidebarWidth }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState({
    visible: false,
    title: "",
  });
  const navigate = useNavigate();

  const fetchRecommendations = async (searchId = "") => {
    setLoading(true);
    try {
      const url = searchId ? `${BASE_URL}${searchId}` : BASE_URL;
      const res = await axios.get(url);
      setRecommendations(Array.isArray(res.data) ? res.data : [res.data]);
      message.success("Recommendations fetched successfully!");
    } catch (error) {
      setRecommendations([]);
      console.error("Error fetching recommendations:", error);
      message.error("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    fetchRecommendations(value);
  };

  const handleDelete = async (recommendationId) => {
    try {
      await axios.delete(`${BASE_URL}${recommendationId}`);
      message.success("Recommendation deleted");
      setSuccessPopup({
        visible: true,
        title: "Recommendation Deleted Successfully!",
      });
      fetchRecommendations();
    } catch (error) {
      message.error("Failed to delete recommendation");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const columns = [
    {
      title: "Recommendation ID",
      dataIndex: "recommendationId",
      key: "recommendationId",
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
      title: "Rating",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link
            to={`/dashboard/edit-recommendation/${record.recommendationId}`}
          >
            <Button type="primary" ghost style={{ marginRight: 8 }}>
              Edit
            </Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.recommendationId)}
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
          flexWrap: "wrap",
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
        <Search
          placeholder="Search by Book ID..."
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
          loading={loading}
        />
      </div>

      {loading ? (
        <Spin style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table
          bordered
          dataSource={recommendations}
          columns={columns}
          rowKey="recommendationId"
          pagination={{ pageSize: 5 }}
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

export default Recomendation;
