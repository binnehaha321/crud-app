import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row, Spin, Typography, Form } from "antd";
import { ToastContainer } from "react-toastify";
import { Heading } from "~/components/Layout";
import styles from "./index.module.scss";

function ConfirmPassword() {
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (values) => {};
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      className={styles.row}
    >
      <ToastContainer />
      {isLoaded ? (
        <Col span={8} className={styles.col}>
          <Heading level={2} align="center" />
          <Row type="flex" justify="center" style={{ marginBottom: "50px" }}>
            <Col align="center">
              <Typography.Title level={4}>CONFIRM PASSWORD</Typography.Title>
              <Typography.Text>
                Confirm to reset your password
              </Typography.Text>
            </Col>
          </Row>
          <Form
            layout="vertical"
            name="signin"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                CONFIRM PASSWORD
              </Button>
            </Form.Item>
          </Form>
        </Col>
      ) : (
        <Spin />
      )}
    </Row>
  );
}

export default ConfirmPassword;
