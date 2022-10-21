import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Heading from "~/components/Layout/Heading";
import styles from "./index.module.scss";
import request from "~/utils/request";
import { toast } from "react-toastify";

import {
  signIn,
  signInSuccess,
  signInFail,
} from "~/store/actions/authenAction";

function SignIn() {
  const { Text, Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = useCallback(
    (values) => {
      request
        .post("login", values)
        .then((res) => {
          if (!res) {
            dispatch(signIn());
          } else {
            dispatch(
              signInSuccess({
                userInfo: res?.data?.user,
                msg: res?.data?.message,
              })
            );
          }
          navigate("/");
        })
        .catch((err) => {
          dispatch(signInFail(err?.response?.data?.message));
        });
    },
    [dispatch, navigate]
  );

  let { msg, flag } = useSelector((state) => state.authen);
  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, [msg]);

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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              suffix={<MailOutlined />}
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
            <Button type="primary" htmlType="submit" block>
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
