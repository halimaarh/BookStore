import { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Space } from "antd";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (searchId = "") => {
    setLoading(true);
    try {
      const url = searchId
        ? `https://bookservice-a2qm.onrender.com/api/v1/books/${searchId}`
        : "https://bookservice-a2qm.onrender.com/api/v1/books/";

      const res = await axios.get(url);
      setBooks(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      message.error("Failed to load books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(
        `https://bookservice-a2qm.onrender.com/api/v1/books/${bookId}`
      );
      message.success("Book deleted");
      fetchBooks(); // Refresh table
    } catch (error) {
      message.error("Failed to delete book");
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post("https://bookservice-a2qm.onrender.com/api/v1/books", {
        name: values.name,
        weight: values.weight,
      });
      message.success("Book created successfully");
      fetchBooks();
    } catch (error) {
      message.error("Failed to create book");
    }
  };

  const handleUpdate = async (bookId, values) => {
    try {
      await axios.put(
        `https://bookservice-a2qm.onrender.com/api/v1/books/${bookId}`,
        {
          name: values.name,
          weight: values.weight,
        }
      );
      message.success("Book updated successfully");
      fetchBooks();
    } catch (error) {
      message.error("Failed to update book");
    }
  };

  const handleSearch = (value) => {
    fetchBooks(value);
  };

  const columns = [
    { title: "Book ID", dataIndex: "bookId", key: "bookId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/dashboard/edit-book/${record.bookId}`}>
            <Button type="primary" ghost>
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this book?"
            onConfirm={() => handleDelete(record.bookId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Books</h2>
        <Link to="/dashboard/add-book">
          <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
            Add Book
          </Button>
        </Link>
      </div>

      <Input.Search
        placeholder="Search by Book ID..."
        allowClear
        onSearch={handleSearch}
        enterButton
        style={{ maxWidth: 400, marginBottom: 16 }}
        loading={loading}
      />

      <Table
        loading={loading}
        columns={columns}
        dataSource={books}
        rowKey="bookId"
        className="shadow-sm rounded-lg overflow-hidden"
        scroll={{ x: true }}
      />
    </div>
  );
}

export default Books;