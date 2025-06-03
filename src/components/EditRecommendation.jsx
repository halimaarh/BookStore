import { Form, Input, Button, message, InputNumber, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CustomPopup from "./CustomPopup";

const BASE_URL =
  "https://recommendationservice-rlr1.onrender.com/api/v1/recommendations";

const EditRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [successPopup, setSuccessPopup] = useState({
    visible: false,
    title: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        if (!id || isNaN(id)) {
          message.error("Invalid Recommendation ID.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/recommendation/${id}`);
        const data = response.data;
        console.log("Fetched recommendation data:", data);

        if (data && data.bookId !== undefined) {
          form.setFieldsValue({
            bookId: data.bookId,
            author: data.author,
            rate: data.rate,
            content: data.content,
          });
        } else {
          message.error("Invalid data received from API.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        message.error("Failed to load recommendation.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [id, form]);

  const onFinish = async (values) => {
    const { bookId, author, rate, content } = values;
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/${id}`,
        {
          bookId,
          author,
          rate,
          content,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      message.success("Recommendation updated successfully!");
      setSuccessPopup({
        visible: true,
        title: "Recommendation Updated Successfully!",
      });
      setTimeout(() => {
        navigate("/dashboard/recomendations");
      }, 2000);
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
        <div className="flex justify-center p-8">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Recommendation
            </h2>
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

            <Form.Item name="rate" label="Rate" rules={[{ required: true }]}>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  Update Recommendation
                </Button>
                <Link to="/dashboard/recommendations">
                  <Button>Cancel</Button>
                </Link>
              </div>
            </Form.Item>
          </Form>
          <CustomPopup
            visible={successPopup.visible}
            title={successPopup.title}
            onClose={() => setSuccessPopup({ visible: false, title: "" })}
          />
        </>
      )}
    </div>
  );
};

export default EditRecommendation;
