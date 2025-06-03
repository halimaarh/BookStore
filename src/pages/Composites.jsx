import { useEffect, useState } from "react";
import { Table, Spin, message, Input } from "antd";
import axios from "axios";

function Composites() {
  const [composites, setComposites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComposites = async (searchId = "") => {
    setLoading(true);
    try {
      const url = searchId
        ? `https://bookcomposite.onrender.com/api/v1/bookcomposite/${searchId}`
        : "https://bookcomposite.onrender.com/api/v1/bookcomposite";

      const response = await axios.get(url);
      setComposites(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to fetch composites");
      setComposites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComposites();
  }, []);

  const handleSearch = (value) => {
    fetchComposites(value);
  };

  const columns = [
    {
      title: "Book ID",
      dataIndex: ["book", "bookId"],
      key: "bookId",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: ["book", "name"],
      key: "name",
    },
    {
      title: "Weight",
      dataIndex: ["book", "weight"],
      key: "weight",
      width: 100,
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
      width: 100,
      render: (reviews) => reviews?.length || 0,
    },
    {
      title: "Recommendations",
      dataIndex: "recommendations",
      key: "recommendations",
      width: 150,
      render: (recommendations) => recommendations?.length || 0,
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <div className="p-4">
        <h4 className="font-bold mb-2">Reviews</h4>
        <Table
          size="small"
          pagination={false}
          dataSource={record.reviews}
          columns={[
            { title: "Author", dataIndex: "author" },
            { title: "Subject", dataIndex: "subject" },
            { title: "Content", dataIndex: "content", ellipsis: true },
          ]}
          rowKey={(row) => row.id}
        />

        <h4 className="font-bold mb-2 mt-4">Recommendations</h4>
        <Table
          size="small"
          pagination={false}
          dataSource={record.recommendations}
          columns={[
            { title: "Author", dataIndex: "author" },
            { title: "Rating", dataIndex: "rate" },
            { title: "Content", dataIndex: "content", ellipsis: true },
          ]}
          rowKey={(row) => row.id}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Book Composites</h2>

      <Input.Search
        placeholder="Search by Book ID..."
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ maxWidth: 400, marginBottom: 16 }}
        loading={loading}
      />

      <Table
        loading={loading}
        dataSource={composites}
        columns={columns}
        rowKey={(record) => record.book.bookId}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
        }}
      />
    </div>
  );
}

export default Composites;
