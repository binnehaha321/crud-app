import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Divider,
  Input,
  Space,
  Typography,
  Form,
  Select,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import request from "~/utils/request";
import "./index.scss";

function AddNewPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddPayment = useCallback(
    (values) => {
      dispatch({ type: "ADD_PAYMENT", payload: values });
      navigate("../payments");
    },
    [dispatch, navigate]
  );
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");

  // GET STUDENT ID LIST
  useEffect(() => {
    request
      .get("students?id=ALL")
      .then((res) => setStudents(res?.data?.students));
  }, []);

  // Handle select studentId
  const handleSelectStudentId = useCallback((studentId) => {
    setStudentId(studentId);
    request.get(`students?id=${studentId}`).then((res) => {
      setFullName(res?.data?.students?.fullName);
    });
  }, []);

  return (
    <Col className="py-30">
      <ToastContainer />
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD NEW PAYMENT</Typography.Title>
      </Space>
      <Divider />
      <Form
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        onFinish={handleAddPayment}
        className="add-new-payment"
      >
        <Space style={{ display: "flex" }}>
          <Form.Item label="Student ID" name="studentId">
            <Select showSearch onChange={handleSelectStudentId}>
              {students.map((student) => (
                <Select.Option key={student.id} value={student.id}>
                  {student.studentId}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Fullname" name="fullName">
            <Input disabled value={fullName} />
          </Form.Item>
        </Space>
        <Space style={{ display: "flex" }}>
          <Form.Item label="Payment ID" name="paymentId">
            <Input />
          </Form.Item>
          <Form.Item label="Payment Schedule" name="paymentSchedule">
            <Input />
          </Form.Item>
        </Space>
        <Space style={{ display: "flex" }}>
          <Form.Item label="Bill Number" name="billNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Amount Paid" name="amountPaid">
            <Input />
          </Form.Item>
        </Space>
        <Space style={{ display: "flex" }}>
          <Form.Item label="Balance Amount" name="balanceAmount">
            <Input />
          </Form.Item>
          <Form.Item label="Payment Date" name="paymentDate">
            <Input />
          </Form.Item>
        </Space>
        <Form.Item align="center">
          <Button type="primary" htmlType="submit">
            Add Payment
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}

export default AddNewPayment;
