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

      // Log the response for debugging
      console.log("API Response:", response.data);

      // Check if response.data is an array or a single object
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setComposites(data);
    } catch (error) {
      console.error("Error fetching composites:", error);
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
      dataIndex: "review",
      key: "review",
      width: 250,
      render: (review) => {
        if (!review || review.length === 0) return "No reviews";
        const firstReview = review[0];
        return `${firstReview.author}: ${firstReview.content.slice(0, 30)}...`;
      },
    },

    {
      title: "Recommendations",
      dataIndex: "recommendation",
      key: "recommendation",
      width: 150,
      render: (recommendation) => {
        if (!recommendation || recommendation.length === 0)
          return "No recommendations";
        const firstRec = recommendation[0];
        return `${firstRec.author}: ${firstRec.content.slice(0, 30)}...`;
      },
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <div className="p-4">
        <h4 className="font-bold mb-2">Reviews</h4>
        <Table
          size="small"
          pagination={false}
          dataSource={record.review || []}
          columns={[
            { title: "Author", dataIndex: "author", key: "author" },
            { title: "Subject", dataIndex: "subject", key: "subject" },
            {
              title: "Content",
              dataIndex: "content",
              key: "content",
              ellipsis: true,
            },
          ]}
          rowKey={(row) => row.id}
          bordered
        />

        <h4 className="font-bold mb-2 mt-4">Recommendations</h4>
        <Table
          size="small"
          pagination={false}
          dataSource={record.recommendation || []}
          columns={[
            { title: "Author", dataIndex: "author", key: "author" },
            { title: "Rating", dataIndex: "rate", key: "rate" },
            {
              title: "Content",
              dataIndex: "content",
              key: "content",
              ellipsis: true,
            },
          ]}
          rowKey={(row) => row.id}
          bordered
        />
      </div>
    );
  };

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
        bordered
      />

      {loading && (
        <div className="flex justify-center p-8">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default Composites;
