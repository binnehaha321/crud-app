import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Heading from "~/components/Heading";
import { post } from "~/utils/request";
import { SIGN_IN_SUCCESS_MSG } from "~/constants/msg";
import { signInSuccess, signInFail } from "~/store/actions/authenAction";
import Loading from "~/components/Loading/Loading";
import styles from "./index.module.scss";

function SignIn() {
  const { Text, Title } = Typography;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (values) => {
    setIsLoading(true);

    try {
      const res = await post("login", values);
      dispatch(
        signInSuccess({
          userInfo: res?.data,
          msg: SIGN_IN_SUCCESS_MSG,
        })
      );
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error?.response?.data?.message));
      setIsLoading(false);
    }
  };

  let { msg, flag } = useSelector((state) => state.authen);
  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
        dispatch(signInFail(""));
      }
    }
  }, [msg, flag, dispatch]);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      className={styles.row}
    >
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
            <Title level={4}>SIGN IN</Title>
            <Text>Enter your credentials to access your account</Text>
          </Col>
        </Row>
        <Form
          layout="vertical"
          name="signin"
          onFinish={handleSignIn}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your username"
              suffix={<MailOutlined key={"username"} />}
            />
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
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              SIGN IN
            </Button>
          </Form.Item>

          <Form.Item>
            <Text>
              Forgot your password?
              <Link className={styles["reset-pw"]} to="../reset-password">
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
