import { Link } from "react-router-dom";
import Heading from "~/components/Layout/Heading";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import styles from "./index.module.scss";
import axios from "axios";
// import handleLogin from "~/services/userService";

function SignIn() {
  const { Text, Title } = Typography;

  const onFinish = (values) => {
    console.log("Success:", values);
    axios({
      method: "POST",
      url: "http://localhost:8080/api/login",
      data: values,
    }).then((result) => {
      console.log(result);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      className={styles.row}
    >
      <Col span={8} className={styles.col}>
        <Heading level={2} align="center" />
        <Row type="flex" justify="center" style={{ marginBottom: "50px" }}>
          <Col align="center">
            <Title level={4}>SIGN IN</Title>
            <Text>Enter your credentials to access your account</Text>
          </Col>
        </Row>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Input type="email" placeholder="Enter your email" />
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
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              SIGN IN
            </Button>
          </Form.Item>
          <Form.Item>
            <Text>
              Forgot your password?
              <Link className={styles["reset-pw"]} to="reset-password">
                {" "}
                Reset Password
              </Link>
            </Text>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default SignIn;
