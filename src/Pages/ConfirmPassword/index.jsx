import { Button, Col, Input, Row, Typography, Form } from "antd";
import { ToastContainer } from "react-toastify";
import { Heading } from "~/components";
import styles from "./index.module.scss";

function ConfirmPassword() {
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
      <Col
        xl={{ span: 8 }}
        lg={{ span: 10 }}
        md={{ span: 12 }}
        sm={{ span: 16 }}
        xs={{ span: 22 }}
        className={styles.col}
      >
        <Heading level={2} align="center" />
        <Row type="flex" justify="center" style={{ marginBottom: "50px" }}>
          <Col align="center">
            <Typography.Title level={4}>CONFIRM PASSWORD</Typography.Title>
            <Typography.Text>Confirm to reset your password</Typography.Text>
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
            <Input.Password placeholder="Enter your password" />
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
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              CONFIRM PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ConfirmPassword;
