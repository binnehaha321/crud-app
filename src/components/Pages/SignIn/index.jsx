import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Typography, Form, Input, Button, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Heading from "~/components/Layout/Heading";
import * as authService from "~/services/authService";
import styles from "./index.module.scss";

function SignIn() {
  const { Text, Title } = Typography;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const fetchApi = async () => {
      setIsLoaded(false);
      const result = await authService.auth(values);
      if (result?.errCode !== 1 && result?.errCode !== 3) {
        const user = result?.user;
        const userData = {
          userId: user?.userId,
          email: user?.email,
          fullName: user?.fullName,
          gender: user?.gender,
          avatar: user?.avatar,
          phoneNumber: user?.phoneNumber,
          roleId: user?.roleId,
          username: user?.username,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        toast.error(result.message);
      }
    };
    fetchApi();
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
      <ToastContainer />
      {isLoaded ? (
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
      ) : (
        <Spin />
      )}
    </Row>
  );
}

export default SignIn;
