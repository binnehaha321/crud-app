import { Row, Col, Typography, Form, Input, Button } from "antd";
// import styles from "./index.scss";

function SignIn() {
  const { Text, Title } = Typography;
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      // className={styles.row}
    >
      <Col span={8}>
        <Title level={2} align="center">
          CRUD OPERATIONS
        </Title>
        <Row type="flex" justify="center">
          <Col align="center">
            <Title level={4}>Sign In</Title>
            <Text>Enter your credentials to access your account</Text>
          </Col>
        </Row>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

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
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default SignIn;
